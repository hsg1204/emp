# Code Style

> Project-wide source formatting and readability rules.

---

## Required Patterns

- Save all text files as UTF-8 without BOM.
- Use LF (`\n`) line endings.
- Use 2-space indentation for frontend code and for YAML and JSON files.
- Use 4-space indentation for Java and Python code.
- Keep maximum line width at 120 characters.
- Keep naming and formatting consistent within each file and language ecosystem.
- Use PascalCase for React and TypeScript component names.
- Use camelCase for hooks and general frontend or backend function names.
- Use PascalCase for Java class names.
- Use camelCase for Java method and variable names.
- Use UPPER_SNAKE_CASE for Java constants.
- In Java, import concrete types explicitly.

---

## Forbidden Patterns

- Do not commit files encoded with BOM or non-UTF-8 encodings unless a tool requires it.
- Do not use CRLF line endings.
- Do not mix indentation widths within the same file.
- Do not exceed 120 characters per line unless a generated artifact or unavoidable literal requires it.
- Do not use wildcard imports in Java.

---

## Language-Specific Rules

### Frontend, YAML, and JSON

- Indent with 2 spaces.
- Use PascalCase for React and TypeScript component names.
- Use camelCase for hooks and general function names.
- Prefer formatting that keeps nested structures readable without unnecessary wrapping.

### Java and Python

- Indent with 4 spaces.
- Use PascalCase for Java class names.
- Use camelCase for Java method and variable names.
- Use UPPER_SNAKE_CASE for Java constants.
- Break long statements before they exceed the line-width limit.
- In Java, replace `*` imports with explicit imports.

---

## Review Checklist

- Is the file encoded as UTF-8 without BOM?
- Does the file use LF line endings?
- Does indentation match the required width for the file type?
- Are lines kept within 120 characters?
- If the file is Java, are all imports explicit and non-wildcard?
