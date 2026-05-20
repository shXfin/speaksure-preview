---
name: Academic Precision
colors:
  surface: '#fef7ff'
  surface-dim: '#ded8df'
  surface-bright: '#fef7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f2f9'
  surface-container: '#f2ecf3'
  surface-container-high: '#ece6ed'
  surface-container-highest: '#e6e1e8'
  on-surface: '#1d1b20'
  on-surface-variant: '#494551'
  inverse-surface: '#322f35'
  inverse-on-surface: '#f5eff6'
  outline: '#7a7582'
  outline-variant: '#cbc4d2'
  surface-tint: '#6750a4'
  primary: '#4f378a'
  on-primary: '#ffffff'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#cfbcff'
  secondary: '#625b71'
  on-secondary: '#ffffff'
  secondary-container: '#e8def9'
  on-secondary-container: '#686177'
  tertiary: '#633b48'
  on-tertiary: '#ffffff'
  tertiary-container: '#7d5260'
  on-tertiary-container: '#ffcbda'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e8def9'
  secondary-fixed-dim: '#ccc2dc'
  on-secondary-fixed: '#1e192b'
  on-secondary-fixed-variant: '#4a4358'
  tertiary-fixed: '#ffd9e3'
  tertiary-fixed-dim: '#eeb8c8'
  on-tertiary-fixed: '#31111d'
  on-tertiary-fixed-variant: '#633b48'
  background: '#fef7ff'
  on-background: '#1d1b20'
  surface-variant: '#e6e1e8'
typography:
  display-lg:
    fontFamily: Roboto
    fontSize: 57px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.25px
  headline-lg:
    fontFamily: Roboto
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Roboto
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
  title-lg:
    fontFamily: Roboto
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Roboto
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.5px
  body-md:
    fontFamily: Roboto
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.25px
  label-lg:
    fontFamily: Roboto
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1px
  label-md:
    fontFamily: Roboto
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 24px
---

## Brand & Style

This design system is built upon the rigorous principles of **Google Material Design 3 (M3)**, tailored specifically for a high-stakes educational environment. The brand personality is professional, authoritative, and dependable, designed to instill confidence in Chinese students pursuing English proficiency. 

The aesthetic adheres to a **Corporate / Modern** style, emphasizing functional clarity over decorative flair. The visual language is strictly non-illustrative, utilizing geometric styled placeholders and structured layouts to maintain a mature, academic tone. Bilingual support is core to the experience, ensuring seamless legibility and visual balance between English and Simplified Chinese scripts through a disciplined typographic grid.

## Colors

The palette is derived from the M3 baseline, ensuring optimal accessibility and tonal consistency. 

- **Primary (#6750A4):** Used for the most prominent UI elements, such as active states and primary action buttons.
- **Primary Container (#EADDFF):** Utilized for tonal layering and grouping related content without the visual weight of the primary color.
- **Background (#FFFBFE):** A clean, high-clarity surface that minimizes eye strain during long study sessions.
- **Text / Neutral (#1D1B20):** The primary color for high-contrast legibility.
- **Muted (#625B71):** Employed for secondary icons, helper text, and decorative outlines.

For bilingual content, ensure the contrast ratio for both English and Chinese characters meets WCAG AA standards against the specified background.

## Typography

This design system uses **Roboto** as its sole typeface to maintain a clean, systematic appearance. Weights are restricted to 400 (Regular), 500 (Medium), 700 (Bold), and 900 (Black) for extreme emphasis.

When rendering Simplified Chinese, the system defaults to system-standard sans-serif fonts that match Roboto's optical weight and x-height to maintain bilingual harmony. 

- **Display & Headlines:** Used for hero sections and major module headers. Use 400 weight for a modern, open feel.
- **Titles:** Reserved for card headers and navigation. Use 500 weight for immediate recognition.
- **Body:** 16px is the standard for educational content to ensure comfortable reading of complex sentence structures.
- **Labels:** Used for buttons, chips, and small captions. Always 500 weight.

## Layout & Spacing

The design system employs a strict **8pt grid system**. All spatial dimensions, including component heights, padding, and margins, must be multiples of 8 (or 4 for fine-tuning).

**Grid Model:**
- **Mobile (0-599px):** 4-column fluid grid, 16px margins, 16px gutters.
- **Tablet (600-1023px):** 8-column fluid grid, 24px margins, 16px gutters.
- **Desktop (1024px+):** 12-column fixed grid (max-width 1240px), 24px margins, 24px gutters.

Horizontal alignment is paramount. Elements should snap to the 8pt grid to maintain the "professional and trustworthy" feel required for an academic product.

## Elevation & Depth

In accordance with M3, depth is communicated through **Tonal Layers** and subtle shadows rather than heavy skeuomorphism.

- **Level 0 (Flat):** The background surface (#FFFBFE).
- **Level 1 (Surface):** Cards and text fields. Use a subtle shadow (blur: 3px, Y: 1px, opacity: 0.08) and a faint 1px outline in the Muted color (#625B71) at low opacity.
- **Level 2 (Navigation/FAB):** For elements requiring user focus, such as Floating Action Buttons or dropdown menus. Increase shadow spread and tint the shadow slightly with the Primary color for a modern lift.

Surfaces are "lifted" visually by applying color overlays from the Primary palette at various opacity levels (e.g., 5%, 8%, 11%) to indicate elevation changes.

## Shapes

The shape language is a mix of geometric precision and modern approachability.

- **Buttons & Chips:** Use a full pill-shape (20px radius) to differentiate interactive triggers from static content.
- **Cards & Containers:** Use a 12px radius. This is a deliberate "Medium" rounding that feels professional without being overly playful.
- **Input Fields:** Use a 4px radius for the container to maintain a structured, "form-like" appearance that encourages focused data entry.
- **Placeholders:** Visual placeholders for missing imagery should use 12px rounded rectangles with geometric patterns (lines, dots) in the Primary Container color.

## Components

### Buttons
Primary buttons are pill-shaped (20px radius) and filled with the Primary color. Label text is Roboto Medium, 14px, all-caps or title case (consistent across the app). Secondary buttons use the Outlined M3 style with a 1px border.

### Cards
Cards use a 12px corner radius. They feature a Level 1 elevation (subtle shadow) and a 1px stroke in the Muted color (#625B71) at 12% opacity. Content within cards follows the 16px (md) internal padding rule.

### Input Fields
Follow the M3 "Filled" text field style. Background color is a 4% tint of the Primary color. Include a high-contrast bottom indicator line (2px) that turns Primary when active. Ensure the bilingual label text (English + Chinese) is clearly legible.

### Lists
Lists use 8px vertical spacing between items. Each item has a 56px minimum height to remain touch-friendly and accommodate dual-language text strings without crowding.

### Styled Placeholders
In place of photos, use "M3-styled abstractions." These are 12px rounded containers filled with the Primary Container color, featuring 45-degree diagonal stripes or centered geometric icons in the Primary color.