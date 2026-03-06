# AGENTS.md

## Purpose

- Use AI agents for coding tasks, refactors, tests, data seeding, and documentation updates.

## Golden Rules

- No breaking changes without explicit request.
- Don’t change formatting/lint rules silently.

## Data Rules

- Seed `imageUrl` values must always show a car (no landscapes, logos, or unrelated scenes).
- Seed `imageUrl` values must be unique.

## Workflow

- Understand the task and constraints.
- Inspect relevant files before editing.
- Plan briefly when scope is non-trivial.
- Implement changes.
- Run the most relevant checks or explain why not.
- Summarize what changed and any follow-ups.

## Coding Conventions

- Internal components in `src/components/**` use named exports and named imports.
- Next.js route files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) use default exports.
- Prefer `function` declarations for React components; use arrow functions for callbacks/helpers.
