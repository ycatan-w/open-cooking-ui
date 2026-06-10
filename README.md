# Open Cooking UI

A Vue 3 application for exploring and viewing recipes defined using the **[Open Cooking Specification (OCS)](https://github.com/ycatan-w/open-cooking-specification)**.

## Features

- Browse recipes from loaded specifications
- View recipe details:
  - Ingredients
  - Equipment
  - Techniques
  - Steps and instructions

- Explore root objects exposed by the specification
- Load specifications from bundled examples located in `./specs/`
- Persist the last opened specification and recipe between sessions
- Display validation diagnostics generated during document loading

---

## Routes

| Route         | Description                         |
| ------------- | ----------------------------------- |
| `/`           | Redirects to the last opened recipe |
| `/recipe/:id` | View a recipe                       |
| `/explore`    | Explore specification objects       |

Examples:

```text
/recipe/spaghetti-carbonara
/explore
```

---

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run type checking:

```bash
npm run type-check
```

Lint the project:

```bash
npm run lint
```

---

## Persistence

The application automatically saves:

- The currently loaded specification
- The currently viewed recipe

These values are restored automatically when reopening the application.

---

## License

See [LICENSE](./LICENSE)
