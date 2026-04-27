---
description: Plan a task using the Compound Engineering workflow
---

Use the `compound-engineering` skill.

Plan this task without implementing it unless the user explicitly asks for code changes:

$ARGUMENTS

# Shopify Compound Planning Skill

---

## Change Log (Auto-generated)

- [YYYY-MM-DD][PLAN] <Short summary of the planned task, what it aims to achieve, and why it is needed>

<!-- Update rules:
- Add a new line for every planning update
- Cross out outdated decisions instead of deleting them
-->

---

## Goal
Define a structured plan for Shopify development tasks using Compound Engineering.

---

## 1. Problem Definition
- What feature are we building?
- Where does it live? (homepage, product page, etc.)

---

## 1.5 Existing Documentation Check

Before finalizing the plan, check existing reusable documentation in:

```text
docs/solutions/
```

---

## 2. Shopify Context Detection
- Theme / App / Headless?
- Affected areas:
  - sections/
  - templates/
  - snippets/
  - assets/

---

## 3. Feature Breakdown
- UI components
- Data requirements
- User interactions

---

## 4. Files Affected
- sections/<feature>.liquid
- snippets/<component>.liquid
- assets/*.css / *.js
- templates/*.json

---

## 5. Smallest Viable Implementation
- Render static layout first
- Add schema
- Connect dynamic data
- Add styling last

---

## 6. Data Planning
- Shopify objects
- metafields
- section settings

---

## 7. Verification
- Desktop + Mobile + Tablet
- Shopify preview
- Playwright tests

---

## 8. Risks / Unknowns
- Performance issues
- Liquid limitations
- Responsive bugs

Inspect the codebase before finalizing the plan. Keep the plan practical and scoped.
