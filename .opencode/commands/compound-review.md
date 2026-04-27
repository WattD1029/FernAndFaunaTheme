---
description: Review an implementation using the Compound Engineering workflow, and capture reusable lessons
---

Use the `compound-engineering` skill.

Review this implementation or change:

$ARGUMENTS

Use a findings-first review style.

Focus on:
- bugs
- regressions
- risky assumptions
- missing tests
- behavior mismatches

---

## Review Behavior

- Read the implementation as a reviewer first
- Prioritize correctness over style
- Surface concrete issues before general commentary
- Prefer file references when possible
- Be explicit about user-visible impact
- Call out missing validation or missing coverage
- If the change appears correct, say so explicitly

---

## Output Format

### 1. Findings First

If you find issues, list the important findings first.

For each finding, include:
- Severity: high / medium / low
- What is wrong
- Why it matters
- Where it appears
- What should be changed

Focus especially on:
- broken behavior
- silent failures
- risky edge cases
- incorrect assumptions
- missing tests for important paths
- mismatch between requested behavior and actual implementation

---

### 2. If No Major Issues Are Found

Say so explicitly.

Then mention:
- residual risks
- testing gaps
- anything not verified
- assumptions that still deserve follow-up

---

## Compound-Style Knowledge Capture

After the review, add a short section that captures reusable knowledge.

### If Issues Were Found

Add:

#### Reusable Lessons
- What pattern caused the problem
- What future implementations should check earlier
- What tests would prevent this next time

### If No Issues Were Found

Add:

#### Reusable Lessons
- What was implemented well
- What pattern should be reused
- What guardrails or tests make this safe
- What future work should preserve

Keep this section short, practical, and reusable.

---

## Documentation Integration

If the review reveals:
- a new bug pattern
- a correction to an existing solution
- a missed edge case or incorrect assumption
- improved prevention or testing strategy

Then mark it as a documentation update candidate.

Do not directly create or edit documentation here.

Instead, signal that the compound phase should:
- update existing documentation if it exists
- or create a new solution entry if it does not

---

## Documentation Signal Output

Include this in the review output:

```text
docs/solutions/
```
Documentation action: update | create | none
Reason: [short explanation]