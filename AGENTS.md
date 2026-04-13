# Project Instructions

## Compound Engineering

Compound Engineering is the default recommended workflow in this repository for non-trivial work.

Use the repo-local OpenCode commands when a task benefits from multiple phases:

1. `/compound` for the generic orchestrator
2. `/compound-plan` for planning only
3. `/compound-work` for implementation
4. `/compound-review` for findings-first review

The workflow phases are:

1. brainstorm
2. plan
3. work
4. review
5. compound

Use only the phases that are needed, but do not skip inspection, verification, or meaningful review for substantial work.

## UI Enhancements

For every UI enhancement in this repository, the workflow is mandatory:

1. Use the `playwright` MCP server to inspect the affected page or user flow before editing.
2. Validate the enhancement at all required breakpoints:
   - mobile: `375x812`
   - tablet: `768x1024`
   - desktop: `1440x900`
3. Add a new Playwright spec or update an existing one under `tests/` to cover the enhancement.
4. Run the relevant Playwright spec across the `mobile`, `tablet`, and `desktop` projects before considering the task complete.

Use Playwright MCP for inspection, selector discovery, and interactive verification. Use the Playwright test suite as the regression gate.

Prefer stable DOM and `data-testid` assertions over screenshot-only checks when adding or updating tests.
