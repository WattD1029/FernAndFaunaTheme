---
description: Orchestrate brainstorm, plan, work, review, and compound for a task
---

Use the `compound-engineering` skill.

Task: $ARGUMENTS

---

# Phase Selection

Determine which phases are needed:

- If the request is vague → brainstorm, then plan
- If the request is clear and non-trivial → plan, then work
- If work has already been done → review
- If a meaningful solution or lesson is produced → compound

---

# Execution Rules

- Inspect the codebase before deciding implementation details
- Prefer minimal correct changes
- Preserve existing project patterns
- Verify the result before finishing
- For UI work, follow Playwright MCP and responsive testing workflow

---

# Compound Phase
Use this phase to capture reusable knowledge in:

docs/solutions/

---

## Purpose

Turn solved problems into structured documentation so future work is faster and avoids repeated mistakes.

---

## Preconditions

Only run compound when:
- the problem is solved or clearly understood
- the solution is verified or well-reasoned
- the lesson is non-trivial and reusable

Skip compound for:
- trivial fixes
- simple typos
- temporary experiments
- work with no reusable insight

---

## Choose Mode

Ask:

1. Full — complete workflow with overlap detection (recommended)
2. Lightweight — fast single-pass documentation

Do not assume a mode.

---

# FULL MODE

## Phase 1 — Research

### 1. Context Analysis

Identify:
- problem type (bug or knowledge)
- affected component or area
- files, routes, templates, sections, or systems involved
- observable symptoms
- root cause

---

### 2. Solution Extraction

Extract:

- Problem
- Symptoms
- What Didn’t Work
- Solution
- Why This Works
- Prevention
- Reusable Insight

---

### 3. Related Documentation Check

Search in:

docs/solutions/

Look for:
- similar problem
- same root cause
- similar solution
- same Shopify route/template/section
- same prevention pattern

Classify overlap:

- High → same problem and solution → update existing doc
- Moderate → same area but different solution → create new doc and reference existing
- Low → new problem → create new doc

---

## Phase 2 — Classification

### Category

Choose one:

Bug track:
- ui-bugs/
- shopify-issues/
- build-errors/
- runtime-errors/
- integration-issues/
- performance-issues/
- logic-errors/
- test-failures/

Knowledge track:
- design-patterns/
- workflow-issues/
- developer-experience/
- best-practices/

---

### Filename

Generate:

```text
YYYY-MM-DD-[short-problem-slug].md
```

---

## Phase 3 — Assemble Documentation

### New Document

```md
---
title: [short title]
category: [category]
date: YYYY-MM-DD
type: [bug|knowledge]
tags:
  - [relevant-tag]
---

# [Title]

## Problem

...

## Symptoms

...

## What Didn’t Work

...

## Solution

...

## Why This Works

...

## Prevention

...

## Related Docs

- [link if applicable]

## Reusable Insight

...

## Compound Summary

...
```
---

## Phase 4 — Write Solution File

Save the generated documentation to:

```text
docs/solutions/[category]/[filename].md
```

Rules:
- Create the folder if missing
- Write one Markdown file
- Update existing matching docs instead of duplicating
- Confirm the saved path
---

## Phase 5 — Output

Return the final result in this format:

```text
Documentation action: create | update | none
Reason: [short explanation]

Saved to:
docs/solutions/[category]/[filename].md
```