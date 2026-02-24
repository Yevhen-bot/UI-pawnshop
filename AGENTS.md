# AGENTS.MD - Pawnshop UI Project

## STEP 1: FETCH WORKSPACE CONTEXT (CRITICAL)

Before writing any code or proposing a folder structure, you MUST use your available MCP tool (specifically context7) to check if a project structure or specific architectural guidelines already exist in the workspace.

If context7 returns a relevant project structure: You MUST adopt and strictly follow that existing structure for all generated files.

If context7 returns no relevant structure: You must create your own scalable structure. Use a simplified "7-1" SCSS architecture adapted for a static project (folders for abstracts, base, components, layout, pages) and place the compiled main.css in a separate css/ folder.

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

Zero JavaScript is allowed. For interactivity like modals, dialogs, or dropdowns, you MUST use CSS-only techniques (e.g., the `:target` pseudo-class or the hidden checkbox hack).

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

---

## CSS/SCSS REQUIREMENTS

- Output SCSS code. Organize it conceptually into variables, mixins, typography, components, and layout blocks
- Strictly NO inline styles and NO global selectors (`*`)
- Create a specific SCSS block representing a separate file for ALL color variables. Use variables for all colors
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
