import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/config"

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Never let a slow/unresponsive Supabase Auth call hang the whole site —
  // fall back to "not authenticated" rather than risk a middleware timeout
  // that blocks every route behind this middleware.
  let user = null
  try {
    const result = await Promise.race([
      supabase.auth.getUser(),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("auth timeout")), 5000)),
    ])
    user = result.data.user
  } catch {
    user = null
  }

  const { pathname } = request.nextUrl

  // Legacy redirect — /dashboard → /classes
  if (pathname === "/dashboard") {
    const url = request.nextUrl.clone()
    url.pathname = "/classes"
    return NextResponse.redirect(url)
  }

  // Protected routes — redirect to login if not signed in
  const protectedRoutes = ["/classes", "/classroom"]
  const isProtected = protectedRoutes.some(r => pathname.startsWith(r))

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // If already logged in, redirect away from login/register
  if ((pathname === "/login" || pathname === "/register") && user) {
    const url = request.nextUrl.clone()
    url.pathname = "/classes"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|adnan.jpg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
