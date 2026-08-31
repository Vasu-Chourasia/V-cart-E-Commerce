---
name: E-Commerce Trust & Elegance
colors:
  surface: '#f8f9fd'
  surface-dim: '#d8dade'
  surface-bright: '#f8f9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3f8'
  surface-container: '#eceef2'
  surface-container-high: '#e7e8ec'
  surface-container-highest: '#e1e2e6'
  on-surface: '#191c1f'
  on-surface-variant: '#44474f'
  inverse-surface: '#2e3134'
  inverse-on-surface: '#eff1f5'
  outline: '#747780'
  outline-variant: '#c4c6d0'
  surface-tint: '#465e8e'
  primary: '#00173b'
  on-primary: '#ffffff'
  primary-container: '#0f2c59'
  on-primary-container: '#7c94c8'
  inverse-primary: '#aec7fd'
  secondary: '#006a68'
  on-secondary: '#ffffff'
  secondary-container: '#94efec'
  on-secondary-container: '#006e6d'
  tertiary: '#2c1100'
  on-tertiary: '#ffffff'
  tertiary-container: '#4b2200'
  on-tertiary-container: '#c5875a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#aec7fd'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#2d4674'
  secondary-fixed: '#97f2ef'
  secondary-fixed-dim: '#7ad6d3'
  on-secondary-fixed: '#00201f'
  on-secondary-fixed-variant: '#00504e'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#fdb787'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#6a3b15'
  background: '#f8f9fd'
  on-background: '#191c1f'
  surface-variant: '#e1e2e6'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
This design system focuses on the intersection of high-end fashion retail and bank-grade security. The aesthetic is rooted in **Modern Minimalism** with a focus on editorial clarity and structural integrity. 

The target audience consists of discerning consumers who value both style and data security. The UI should evoke a sense of calm, precision, and reliability. Key characteristics include:
- **Spatial Discipline:** Large amounts of white space to allow product imagery to breathe.
- **Micro-interactions:** Subtle, high-precision animations that reinforce a premium feel.
- **Institutional Clarity:** Information density is handled through clear hierarchy, ensuring the shopping experience feels secure and organized.

## Colors
The palette follows a strict 60/30/10 distribution to ensure visual balance and trust.

- **Dominant (60%):** Pure White (#FFFFFF) is the foundation of the canvas. Use this for the main viewport and content containers to maintain a clean, airy feel.
- **Structural (30%):** Interface Gray (#F8F9FA) is used for subtle background shifts behind product grids and to separate sections. Premium Charcoal (#1A1D20) is the exclusive color for text and icons, providing maximum contrast and legibility.
- **Accents (10%):** Deep Navy (#0F2C59) is the "anchor" color for high-level branding, primary CTAs, and global navigation headers. Secure Teal (#007A78) acts as the interaction signal, used for states that require confirmation, success, or active focus.

## Typography
The system utilizes **Inter** for its systematic, utilitarian nature, which aligns with the "trust" narrative. 

- **Headlines:** Use tight letter-spacing and semi-bold weights in Premium Charcoal to command attention without being aggressive.
- **Body Text:** Maintains a generous line height (1.5x minimum) for optimal readability during long browsing sessions.
- **Labels:** Use the `label-caps` style for category headers, badges, and metadata to differentiate from actionable text.
- **Hierarchy:** Ensure a clear distinction between product names (Headline MD) and descriptions (Body MD).

## Layout & Spacing
The layout follows a **Fluid Grid** model with fixed maximum widths for desktop screens to preserve the editorial feel.

- **Desktop (1280px+):** 12-column grid with 24px gutters and 64px outer margins.
- **Tablet (768px - 1024px):** 8-column grid with 24px gutters and 32px outer margins.
- **Mobile (< 768px):** 4-column grid with 16px gutters and 16px outer margins.

The spacing rhythm is based on a 4px baseline. Use 48px (XL) for section vertical padding to reinforce the "premium" sense of scale. Components should use 16px (MD) for internal padding to ensure touch targets are accessible and content feels uncrowded.

## Elevation & Depth
This system uses **Low-Contrast Outlines** combined with **Ambient Shadows** to create a sophisticated layered effect without visual clutter.

- **Product Cards:** Use a 1px border of `Interface Gray` and a very soft, diffused shadow (0px 4px 20px, 4% opacity of Deep Navy) to lift the card off the pure white background.
- **Overlays & Modals:** Use a higher elevation with a 12% opacity shadow and a backdrop blur (12px) to maintain context while focusing user attention.
- **Floating AI Assistant:** This element sits at the highest elevation. It should have a crisp Deep Navy fill and a distinct shadow to denote its persistent, helpful nature.

## Shapes
The system utilizes **Soft** corner treatment (0.25rem / 4px). This subtle rounding offers a more contemporary and friendly feel than sharp corners while maintaining the professional rigor of a luxury/secure platform. 

- **Buttons & Inputs:** Use the standard 4px radius.
- **Product Imagery:** Should always be rectangular or follow the 4px radius; avoid circular masks for fashion products.
- **Badges:** Use a fully rounded "pill" shape only for status indicators (e.g., "In Stock", "New") to distinguish them from interactive buttons.

## Components

- **Buttons:**
    - *Primary:* Deep Navy fill, White text. 4px radius. 
    - *Secondary:* Secure Teal outline (1px) or ghost style with Secure Teal text for less critical actions.
    - *State:* On hover, Primary buttons shift 10% lighter; Secondary buttons gain a subtle Secure Teal tint background.
- **Input Fields:**
    - Use a 1px border in a darkened version of Interface Gray. On focus, the border transitions to Secure Teal with a soft 2px glow.
- **Product Cards:**
    - Image-first design. Title and Price in Premium Charcoal. 
    - Subtle "Quick Add" button appears on hover to minimize initial visual noise.
- **Navigation:**
    - *Top Bar:* Deep Navy background with white utility links (Sign In, Cart).
    - *Main Nav:* Pure White background, Premium Charcoal text with a 2px Secure Teal bottom-border for active states.
- **AI Assistant:**
    - A floating action button (FAB) in the bottom-right. Icon should be a clean, minimalist spark or robot head in white on a Deep Navy circle.
- **Badges:**
    - Use Secure Teal for "Trust" badges (Verified, Secure Checkout) and Premium Charcoal for "Editorial" badges (Limited Edition, Sale).