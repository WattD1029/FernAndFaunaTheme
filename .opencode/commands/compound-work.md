---
description: Execute a task using the Compound Engineering workflow
---

Use the `compound-engineering` skill.

Execute this task end-to-end:

$ARGUMENTS

Expected flow:

## 1. Input triage
- Determine whether the input is:
  - a plan/spec/todo document, or
  - a bare prompt describing work
- If it is a bare prompt:
  - inspect the likely affected files first
  - identify related tests/specs
  - note local code patterns and conventions
  
### Documentation Awareness (NEW)

Before implementation:

- Check for relevant prior solutions in:

```text
docs/solutions/

## 2. Inspect before changing
- Read the relevant implementation files completely before editing
- Look for similar existing patterns in the codebase
- Reuse existing conventions, naming, structure, and components where possible
- For UI work, inspect the repo’s required responsive workflow before implementation

## 3. Plan briefly when needed
- For small tasks, proceed directly after inspection
- For medium tasks, create a short internal task list
- Keep the plan minimal and execution-focused
- Do not over-plan when the change is already clear

## 4. Implement the minimal correct change
- Make the smallest change that fully solves the task
- Avoid unnecessary refactors unless they directly reduce duplication or unblock the implementation
- Follow existing project patterns instead of inventing a new structure
- For UI work, match the existing design system, spacing, responsiveness, and component conventions

## 5. Test discovery and updates
- Before changing behavior-bearing code, find the related tests/spec files
- Add new tests for new behavior
- Update tests for changed behavior
- Remove or adjust tests for deleted behavior
- Do not leave behavior changes unverified without a deliberate reason

## 6. Regression and system check
Before marking the task complete, check:
- what else fires when this code runs
- callbacks, middleware, observers, hooks, event handlers, side effects
- whether this change affects another interface or entry point
- whether failure paths can leave inconsistent state
- whether at least one realistic integration path is still covered when needed

Skip deep regression analysis only for clearly isolated trivial changes such as copy updates, styling-only tweaks, or pure config renames.

## 7. Verify properly
- Run the most relevant checks for the change
- Prefer targeted tests first, broader checks if needed
- For UI work, use the repo’s required inspection and responsive validation workflow
- Review the result for regressions, gaps, and unintended side effects
- Fix failures before considering the task complete

## 8. Track progress while working
- Keep a lightweight task list if the task has multiple steps
- Mark progress as you complete meaningful units
- Note blockers or important discoveries
- Keep the user informed of major milestones when useful

## 9. Execution Log (Auto-generated)
- Maintain a running log of actual implementation work completed
- Append entries as meaningful work is finished
- Log:
  - files created, updated, or removed
  - components or sections added
  - bugs fixed
  - tests run
  - verification results
  - implementation revisions made during execution
- Keep entries short, concrete, and outcome-focused
- Never delete old entries
- If a previous implementation decision is replaced, strike through the old entry and append a new one

Example format:
- [YYYY-MM-DD][IMPLEMENT] Created sections/feature-banner.liquid
- [YYYY-MM-DD][UPDATE] Added schema settings for heading, text, and CTA
- [YYYY-MM-DD][FIX] Resolved mobile overflow in assets/theme.css
- [YYYY-MM-DD][VERIFY] Checked desktop and mobile layout in preview
- [YYYY-MM-DD][REVISION] ~~Used static collection cards~~ → Switched to dynamic product blocks for reusability

## 10. Review the final result
- Confirm the implementation matches the request
- Confirm no obvious regressions were introduced
- Confirm the change is scoped appropriately and not overbuilt
- Simplify only where it clearly improves maintainability without expanding scope

## 11. Include a short compound summary
At the end, include:
- what was changed
- what was verified
- any reusable lessons, patterns, or caveats that may help with similar work later

Execution principles:
- inspect first
- follow existing patterns
- implement the minimal correct change
- test as you go
- verify before declaring done
- keep quality built into execution, not deferred to the end

For UI work:
- inspect existing components and layout patterns first
- validate desktop and mobile behavior
- check spacing, hierarchy, overflow, responsiveness, and interaction states
- use the repo’s required inspection and responsive validation workflow