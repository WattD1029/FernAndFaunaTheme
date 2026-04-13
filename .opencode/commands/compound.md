---
description: Orchestrate brainstorm, plan, work, review, and compound for a task
---

Use the `compound-engineering` skill.

Task: $ARGUMENTS

Determine which phases are needed for this task: brainstorm, plan, work, review, compound.

Use this default behavior:

- if the request is vague, brainstorm first and then plan
- if the request is clear and non-trivial, plan and then work
- if work has already been done, review before finishing
- end with a short compound summary that captures reusable lessons from the task when appropriate

Execution rules:

- inspect the codebase before deciding implementation details
- prefer minimal correct changes
- preserve existing project patterns
- verify the result before finishing
- for UI work, follow the repo's Playwright MCP and responsive testing workflow

Return a concise explanation of which phases were used and why.
