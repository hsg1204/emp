# Deployment

> Shared deployment baseline for frontend and backend delivery.

---

## Required Patterns

- Use Docker + nginx as the default deployment baseline.
- Keep deployment structure portable across isolated environments.
- Build frontend applications into static assets and serve them with nginx.
- Package backend services as containerized runtimes.
- Expose health checks for runtime verification and operational readiness.
- Use nginx as the reverse proxy entry point for frontend and backend traffic.
- Keep environment isolation explicit across dev, test, and prod.
- Keep runtime configuration boundaries aligned with `config-env.md`.

---

## Forbidden Patterns

- Do not couple deployment rules to a single local-only environment.
- Do not serve frontend production assets from ad hoc application servers when nginx is the baseline.
- Do not use hypothetical future platform changes as a reason to skip the Docker + nginx baseline.
- Do not mix dev, test, and prod configuration or secrets in the same runtime context.
- Do not omit health-check endpoints for services that are expected to run continuously.

---

## Delivery Baseline

### Frontend

- Build frontend applications into static production assets.
- Serve those assets through nginx.
- Keep frontend environment injection constrained to approved public variables and delivery rules.

### Backend

- Package backend services into deployable containers.
- Run backend workloads as independently replaceable service containers where practical.
- Expose health-check endpoints suitable for container orchestration and reverse-proxy integration.

### Reverse Proxy and Routing

- Use nginx to serve static frontend assets.
- Use nginx to reverse-proxy backend APIs and service routes.
- Keep routing, upstream targets, and environment-specific endpoints explicit in deployment configuration.

### Environment Isolation

- Keep dev, test, and prod deployments isolated by configuration, endpoints, and secrets.
- Prefer environment-specific runtime injection over hardcoded values in images.
- Keep the packaging model portable and container-friendly across environments.

---

## Review Checklist

- Does the deployment plan use Docker + nginx as the baseline?
- Are frontend static assets served by nginx?
- Are backend services packaged as containers?
- Are health checks available for runtime verification?
- Does nginx handle reverse-proxy responsibilities explicitly?
- Are dev, test, and prod environments kept isolated?
- Does the design remain portable across isolated environments?
