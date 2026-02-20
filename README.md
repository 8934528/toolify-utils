# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Project Structure

toolify-utils/
  ├── public/
  │   ├── icons/
  │   │   ├── icon-192x192.png
  │   │   └── icon-512x512.png
  │   ├── images/
  │   │   └── background.jpeg
  │   └── manifest.json
  ├── src/
  │   ├── components/
  │   │   ├── common/
  │   │   |   ├── ConfirmationModal.css
  │   │   |   └── ConfirmationModal.tsx
  │   │   └── Layout/
  │   │       ├── Navbar.css
  │   │       ├── Navbar.tsx
  │   │       ├── Toast.css
  │   │       └── Toast.tsx
  │   ├── hooks/
  │   │   ├── useSession.tsx
  │   │   └── useToast.tsx
  │   ├── pages/
  │   │   ├── Calculator/
  │   │   │   ├── Calculator.css
  │   │   │   └── Calculator.tsx
  │   │   ├── Home/
  │   │   │   ├── Home.css
  │   │   │   └── Home.tsx
  │   │   ├── TemperatureConverter/
  │   │   │   ├── TemperatureConverter.css
  │   │   │   └── TemperatureConverter.tsx
  │   │   ├── Todo/
  │   │   │   ├── Todo.css
  │   │   │   └── Todo.tsx
  │   │   └── Unavailable/
  │   │       ├── Unavailable.css
  │   │       └── Unavailable.tsx
  │   ├── types/
  │   │   └── index.ts
  │   ├── utils/
  │   │   └── session.ts
  │   ├── App.css
  │   ├── App.tsx
  │   ├── index.css
  │   ├── main.tsx
  │   └── vite-env.d.ts
  ├── .env
  ├── .gitignore
  ├── index.html
  ├── netlify.toml
  ├── package.json
  ├── tsconfig.app.json
  ├── tsconfig.json
  ├── tsconfig.node.json
  └── vite.config.ts
