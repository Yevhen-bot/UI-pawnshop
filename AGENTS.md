# AGENTS.MD - Pawnshop UI Project

## CURRENT PROJECT STATUS

### Completed Pages

- `index.html` - Login page
- `users.html` - Users listing with CSS-only modals (Create/Delete user)
- `user-profile.html` - User information with Edit modal
- `catalog.html` - Items grid with filters
- `estimates.html` - Item evaluation form and pending estimates table
- `operations.html` - Operations history with stats dashboard

### Completed SCSS Architecture

- `scss/abstracts/_variables.scss` - Color variables
- `scss/abstracts/_mixins.scss` - Reusable mixins
- `scss/base/_reset.scss` - CSS reset
- `scss/base/_typography.scss` - Typography styles
- `scss/components/` - Buttons, forms, modals, notifications, tables, badges
- `scss/layout/` - Header, sidebar, footer, main layout
- `scss/pages/` - Page-specific styles

---

## PROJECT OVERVIEW

The system manages a pawnshop network. The required static HTML pages are:

- **index.html**: Login page
- **users.html**: Users listing displaying two types of users (Admin and Regular). Must include CSS-only modals for "Create user dialog" (fields: Username, Password, Confirm password, Role, Ok/Cancel buttons) and "Delete user"
- **user-profile.html**: Information about selected user and an "Edit user" screen
- **catalog.html**: Custom page showing pawnshop items in stock
- **estimates.html**: Custom page for workers evaluating item prices
- **operations.html**: Custom page showing operation history (loans, redemptions)

Include static UI elements for Error notifications and Validation errors on relevant forms. Include Logout functionality (as a visual link/button in the layout).

### CRITICAL RULE: > DO NOT write any JavaScript

Zero JavaScript is allowed. For interactivity like modals, dialogs, or dropdowns, you MUST use CSS-only techniques (e.g., the `:target` pseudo-class).

---

## HTML REQUIREMENTS

- Use standard HTML5 structure with `<!DOCTYPE html>`, html, head, and body
- Define meta tags and link to the compiled main.css within `<head>`
- Use semantic tags correctly: `<header>`, `<nav>`, `<aside>`, `<main>`, `<article>`, `<section>`, `<footer>`
- Inline elements must be strictly within block elements
- Use double quotation marks for all attributes
- Provide alt text for all images
- Add HTML comments to describe blocks of code
- Use strictly lowercase for element names, attributes, values, and class names
- Class names must be context-based and ALWAYS use hyphens (e.g., user-card). Do not use underscores or camelCase
- **STRICTLY NO INLINE STYLES** - All styles must be in SCSS files

---

## CSS/SCSS REQUIREMENTS

- Output SCSS code. Organize it conceptually into variables, mixins, typography, components, layout, and pages
- **Strictly NO inline styles** - Never use `style="..."` in HTML
- **Strictly NO global selectors (`*`)** - Avoid unless absolutely necessary
- All colors must use SCSS variables from `scss/abstracts/_variables.scss`
- Define generic font families (e.g., sans-serif)
- If a value is 0, omit the unit (e.g., `margin: 0;` not `margin: 0px;`)
- Implement responsive/adaptive design
- Include hover, active, and focus states using pseudo-classes, and use pseudo-elements (`::before`, `::after`, `:first-child`) where appropriate
- Add basic CSS transitions/animations for hover effects and modal opening
- Write at least one SCSS `@mixin`

---

## SCSS STRICT LINTING RULES

- Do not duplicate styles
- Limit nesting to a maximum of 1 or 2 levels deep to prevent over-specificity
- Avoid nesting blocks that spread over more than 20 lines. Break them up into separate rules
- If using `@extend`, it must be placed on the very first line of a declaration block
- If using `@include`, group them at the top of the declaration block, immediately after any `@extend` statements

---

## EXECUTION FLOW

1. Execute context7 to determine the structure
2. Output the chosen folder structure
3. Generate the index.html (Login) and the foundational SCSS (Variables, Mixins, and Typography)
4. Wait for approval before proceeding to the other pages
5. After any HTML changes, verify no inline styles are present
6. After any design changes, add corresponding SCSS to appropriate files in `scss/pages/` or `scss/components/`

---

## FOLDER STRUCTURE

```
UI-pawnshop/
├── index.html
├── users.html
├── user-profile.html
├── catalog.html
├── estimates.html
├── operations.html
├── AGENTS.md
├── scss/
│   ├── abstracts/
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   ├── base/
│   │   ├── _reset.scss
│   │   └── _typography.scss
│   ├── components/
│   │   ├── _buttons.scss
│   │   ├── _forms.scss
│   │   ├── _modals.scss
│   │   ├── _notifications.scss
│   │   ├── _tables.scss
│   │   └── _badges.scss
│   ├── layout/
│   │   ├── _header.scss
│   │   ├── _sidebar.scss
│   │   ├── _footer.scss
│   │   └── _layout.scss
│   ├── pages/
│   │   ├── _login.scss
│   │   ├── _users.scss
│   │   ├── _user-profile.scss
│   │   ├── _catalog.scss
│   │   ├── _estimates.scss
│   │   └── _operations.scss
│   └── main.scss
└── css/
    └── main.css (compiled)
```
