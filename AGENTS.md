# Development Guidelines

## Release

- Use tag-push as the only release trigger.
- Run `git tag vX.Y.Z` and `git push origin vX.Y.Z`.
- Let GitHub Actions `Release` workflow handle npm/JSR publish and draft release creation.
- Do not use `gh release create` for normal releases.

## Validation

- Run `deno lint` and `deno test` after code changes.

## Scope

- Do not make unrelated refactors or file changes outside the request.

## Safety

- Do not run destructive commands such as `git reset --hard` unless explicitly requested.
