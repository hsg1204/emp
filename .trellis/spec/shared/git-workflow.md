# Git Workflow

> Shared source-control workflow rules for branches, commits, review, and integration.

---

## Required Patterns

- Use descriptive branch names that communicate the work type and intent.
- Keep one logical change stream per branch when practical.
- Write clear commit messages that explain the change succinctly.
- Keep commits scoped to a single logical change where possible.
- Open pull requests that state purpose, scope, and test evidence.
- Treat the main integration branch as protected.
- Require review before integrating changes into the protected branch.
- Prefer merges through reviewed pull requests instead of direct pushes.

---

## Forbidden Patterns

- Do not use vague branch names such as `test`, `temp`, or `update`.
- Do not mix unrelated changes into the same branch or commit series.
- Do not use unclear commit messages that hide intent.
- Do not open pull requests without enough context for reviewers to evaluate purpose, scope, and verification.
- Do not push directly to the protected main integration branch without review.

---

## Branching

- Use descriptive names such as `feature/auth-login`, `fix/api-timeout`, `refactor/user-service`, or `docs/shared-specs`.
- Keep branch names readable, lowercase, and aligned with the type of work.
- Start new branches from the current protected integration baseline.

## Commits

- Default to the `type(scope): summary` format.
- Supported types must include `feat`, `fix`, `docs`, `refactor`, `test`, and `chore`.
- Keep each commit message focused on one logical change.
- Keep formatting-only cleanup separate from behavioral changes when practical.

## Pull Requests

- State why the change is needed.
- Summarize the scope of the change so reviewers can see boundaries quickly.
- Include test evidence, validation notes, or an explicit statement when tests are not applicable.
- Make review expectations clear enough that reviewers can verify the relevant specs and acceptance criteria.

## Protected Integration

- Treat `main` as the protected integration branch unless the repository defines a different protected baseline explicitly.
- Integrate through reviewed pull requests.
- Avoid direct pushes without review except for explicitly approved emergency procedures.

---

## Review Checklist

- Is the branch name descriptive and scoped to the work?
- Do commit messages use `type(scope): summary` by default?
- Do commit messages use an approved type such as `feat`, `fix`, `docs`, `refactor`, `test`, or `chore`?
- Is each commit message focused on one logical change?
- Does the pull request explain purpose, scope, and test evidence?
- Is the protected main integration branch used correctly?
- Has direct push without review been avoided?
