---
name: compound-engineering
description: Default workflow for non-trivial work using brainstorm, plan, work, review, and compound phases.
---

## What this skill is for

Use this skill for non-trivial tasks that benefit from a structured workflow instead of jumping straight into implementation.

This workflow has five phases:

1. brainstorm
2. plan
3. work
4. review
5. compound

Skip phases that are unnecessary, but do not skip inspection, verification, or quality review when they materially affect the outcome.

## When to use it

Use this skill when:

- the task spans multiple files or systems
- the request is ambiguous or under-specified
- the work affects UI, behavior, tests, or architecture
- you need to preserve project patterns while making a meaningful change

Do not force the full loop for tiny one-step requests.

## Phase 1: Brainstorm

Use brainstorm only when the request is still fuzzy.

Goal:

- clarify the outcome
- identify constraints
- identify risks
- identify success criteria

Outputs:

- a clear problem statement
- any assumptions that need validation
- a decision on whether to proceed to planning

If the request is already clear, skip straight to plan.

## Phase 2: Plan

Inspect the codebase before proposing changes.

Goal:

- find the smallest correct change
- identify affected files
- identify existing patterns to preserve
- identify the verification path

Outputs:

- scoped implementation steps
- affected files or sections
- risks or open questions
- tests or validation steps

Planning should be concrete enough that the work phase can execute without re-deciding the approach.

## Phase 3: Work

Execute the plan with minimal correct edits.

Principles:

- prefer the smallest correct change
- follow existing project patterns
- avoid unnecessary abstraction and renaming
- do not add compatibility layers without a concrete need
- carry the change through implementation, not just analysis

Outputs:

- working code or configuration changes
- any required tests or docs updates

## Phase 4: Review

Review the result before finishing.

Focus on:

- bugs
- regressions
- missing tests
- risky assumptions
- behavior mismatches

When presenting review findings:

- findings first
- ordered by severity
- include file references when possible
- keep summary secondary

If no findings are discovered, say that explicitly and mention residual risks or testing gaps.

## Phase 5: Compound

Capture reusable lessons while the context is fresh.

Good compounded learnings are concrete, such as:

- a selector pattern that proved stable
- a section or component pattern the repo already prefers
- a recurring failure mode
- a better verification command or test target
- a design implementation rule worth reusing

Do not produce vague retrospective filler. Prefer short practical lessons that improve future execution.

## UI work

For UI work in this repo:

- inspect existing implementation before editing
- preserve the current design system and visual language unless the task explicitly changes it
- use Playwright MCP for inspection and interactive verification
- validate mobile, tablet, and desktop behavior
- add or update a Playwright spec when the UI change warrants regression coverage

If Figma MCP is available for the task, inspect the Figma frame before implementing.

## Completion criteria

A non-trivial task is complete when:

- the right phases were executed
- the implementation is finished, not partial
- verification was performed
- review findings were handled or clearly reported
- the final response explains outcome, validation, and any remaining gaps
