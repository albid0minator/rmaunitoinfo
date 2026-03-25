# Design System Specification

## 1. Overview & Creative North Star: "The Illuminated Archive"
This design system moves away from the rigid, boxy layouts of traditional academia and toward a "high-end editorial" experience. The Creative North Star is **The Illuminated Archive**: a digital space that feels like a prestigious, quiet library at midnight—sophisticated, deep, and focused. 

By eliminating images and standard borders, we rely on **intentional asymmetry**, **extreme typographic scale**, and **tonal layering** to guide the eye. The goal is to make the user feel they are interacting with "light on glass" rather than "ink on paper." This is a human-centric, mobile-first approach where the hierarchy is communicated through the tension between massive headlines and generous white space.

---

## 2. Colors & Surface Philosophy
The palette is built on a foundation of deep obsidians and electric cyans. The objective is depth, not flatness.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders for sectioning or containment. Traditional lines create visual "noise" that cheapens the premium feel. Boundaries must be defined solely through:
1.  **Background Color Shifts:** Placing a `surface_container_low` section against a `surface` background.
2.  **Tonal Transitions:** Using subtle shifts in the Material surface tiers.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of frosted glass. 
- **Base Layer:** `surface` (#0b1326) / `surface_dim`.
- **Primary Content Blocks:** `surface_container` (#171f33).
- **Interactive Elevated Elements:** `surface_container_high` (#222a3d) or `highest` (#2d3449).
- **Glass & Gradient Rule:** For main CTAs or featured statistics, use a linear gradient from `primary` (#4cd7f6) to `primary_container` (#06b6d4) at a 135-degree angle. This provides a "glow" that flat colors cannot replicate.

---

## 3. Typography: Editorial Authority
Typography is the primary visual driver of this system. We use **Inter** for its neutral, authoritative clarity and **Plus Jakarta Sans** for utility labels to provide a slight geometric contrast.

*   **Display Scales (`display-lg` 3.5rem):** Reserved for hero moments. Use tight letter-spacing (-0.02em) and `on_surface` (#dae2fd) to create a "wall of text" that feels like a physical architectural element.
*   **The Contrast Play:** Pair a `display-sm` headline with `body-sm` text. The drastic jump in scale creates an editorial, high-fashion aesthetic that feels intentional and custom.
*   **Labeling:** Use `label-md` (Plus Jakarta Sans) in `primary` (#4cd7f6) with all-caps and 0.1em letter spacing for category tags or small metadata.

---

## 4. Elevation & Depth
In a dark-themed university landing page, depth must feel "ambient."

*   **Tonal Layering:** Avoid shadows for static cards. Instead, place a `surface_container_lowest` (#060e20) card inside a `surface_container` section to create a "sunken" effect, or a `surface_container_highest` card on a `surface` background to create a "lifted" effect.
*   **Ambient Shadows:** If an element must float (like a mobile navigation menu), use an extra-diffused shadow: `offset-y: 24px, blur: 48px, color: rgba(0, 0, 0, 0.4)`. 
*   **The "Ghost Border" Fallback:** For accessibility in form fields, use the `outline_variant` token at **15% opacity**. This creates a suggestion of a container without breaking the "No-Line" rule.
*   **Glassmorphism:** For expandable toggles or floating headers, apply `backdrop-blur: 12px` to a semi-transparent `surface_container` (opacity 80%).

---

## 5. Components

### Buttons
*   **Primary:** Background: `primary_container` (#06b6d4); Text: `on_primary` (#003640). Roundedness: `md` (0.75rem). No shadow.
*   **Secondary (Glass):** Background: `rgba(76, 215, 246, 0.1)`; Text: `primary` (#4cd7f6). Use a "Ghost Border" at 20% opacity.
*   **Tertiary:** Text: `on_surface`; Weight: 600. No background. Use for "Learn More" with a small cyan chevron.

### Expandable Toggles (Human-Centric Accordions)
Instead of heavy motion, use a "State-Shift" approach.
*   **Closed State:** `surface_container_low`. A simple `title-md` headline with a `+` icon.
*   **Open State:** Background shifts to `surface_container_high`. Content reveals via a simple opacity fade (no sliding bounce). This feels sophisticated and snappy.

### Cards & Lists
*   **Forbidden:** Divider lines between list items.
*   **Standard:** Use `spacing-6` (2rem) of vertical white space to separate items.
*   **Interactive List:** On hover, the entire row shifts background color to `surface_container_highest`. 

### Input Fields
*   **Style:** Minimalist. No bottom line. Use `surface_container_low` as the field background. 
*   **States:** On focus, the background transitions to `surface_container_high` and a 2px `primary` (#4cd7f6) indicator appears only on the left edge—never a full border.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace Asymmetry:** Align a headline to the left and the supporting body text to the far right of the grid to create "tension."
*   **Use the Spacing Scale:** Stick strictly to the values (e.g., use `spacing-16` for section gaps) to ensure mathematical harmony.
*   **Focus on Legibility:** Ensure `on_surface` text always sits on a background that meets WCAG AAA standards.

### Don't:
*   **Don't use 100% white (#FFFFFF):** It is too harsh on dark backgrounds. Use `on_surface` (#dae2fd) or the user's "crisp white" (#f8fafc) for better ocular comfort.
*   **Don't use images:** If the layout feels empty, increase your typography scale or add a subtle `primary` gradient "glow" in the corner of the background.
*   **Don't use standard "Rounded" defaults:** Use the `xl` (1.5rem) roundedness for large containers to soften the "Brutalist" typography.