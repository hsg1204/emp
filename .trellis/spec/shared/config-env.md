# Configuration and Environment

> Project-wide rules for application configuration, runtime environment variables, and secrets handling.

---

## Required Patterns

- Follow 12-Factor principles for configuration.
- Keep deploy-specific values in configuration, not in application code.
- Use kebab-case for configuration keys.
- Use UPPER_SNAKE_CASE for environment variable names.
- Use the `VITE_` prefix for frontend environment variables exposed to browser builds.
- Use Nacos as the default production configuration center.
- Keep secrets outside version control and inject them through secure runtime mechanisms.

---

## Forbidden Patterns

- Do not hardcode deploy-specific configuration in source files.
- Do not use inconsistent key naming styles for the same configuration domain.
- Do not expose non-public values to frontend builds.
- Do not store secrets, credentials, tokens, or private keys in the repository.
- Do not treat local convenience files as a source of truth for production configuration.

---

## Naming Rules

### Configuration Keys

- Use kebab-case keys such as `server-port` and `request-timeout`.
- Keep related keys grouped under stable namespaces when the platform supports nesting.

### Environment Variables

- Use UPPER_SNAKE_CASE names such as `SERVER_PORT` and `REQUEST_TIMEOUT`.
- Use `VITE_` only for variables that are intentionally exposed to frontend code.

---

## Environment Strategy

- Prefer environment variables or external config providers over checked-in environment-specific files.
- Use Nacos as the default production config center for centralized runtime configuration.
- Separate public configuration from secret configuration.
- Document required variables and defaults clearly in the relevant application docs or templates.

---

## Review Checklist

- Does the change follow 12-Factor configuration principles?
- Are configuration keys written in kebab-case?
- Are environment variables written in UPPER_SNAKE_CASE?
- Are browser-exposed frontend variables prefixed with `VITE_`?
- Is Nacos treated as the default production config center?
- Are all secrets kept out of version control?
