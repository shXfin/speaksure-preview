import Topbar from "@/components/Topbar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-full">
      <Topbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
