# Contributing to Toolify Utils

First off, thank you for considering contributing to Toolify Utils! It's people like you that make such tools better for everyone.

## Adding a New Tool

To add a new tool to the application, follow these steps:

1. **Create the Tool Component:**
   - Create a new directory in `src/pages/` with the name of your tool (e.g., `src/pages/MyTool/`).
   - Inside the directory, create `MyTool.tsx` and `MyTool.css`.
   - Your tool component should return standard React elements using the predefined CSS variables from `src/index.css`.

2. **Add to Router:**
   - Open `src/AnimatedRoutes.tsx` or `src/App.tsx` (depending on where the router is defined).
   - Import your new component.
   - Add a new `<Route path="/my-tool" element={<MyTool />} />` inside the main Routes structure.

3. **Update the Dashboard:**
   - Open `src/pages/Home/Home.tsx`.
   - Add your tool to the `tools` array to ensure it appears on the dashboard with an appropriate icon (using [Flaticon UI icons](https://www.flaticon.com/uicons)) and description.

4. **Update the Navbar (Optional):**
   - If you want the tool to appear in the main navigation, update `src/components/Layout/Navbar.tsx` accordingly.

## Styling Guidelines

Toolify Utils uses Vanilla CSS with a strong emphasis on **Glassmorphism**. When building your components:

- Use the CSS variables defined in `src/index.css` (e.g., `var(--primary)`, `var(--text)`, `var(--background)`).
- Apply the `.glass-panel` class or utilize `--card`, `--glass-bg`, and `backdrop-filter` for card elements.
- Ensure your UI is fully responsive by testing on different screen sizes and utilizing media queries.

## Code Style

- Use **TypeScript** strictly. Avoid using `any`; define precise interfaces or types for your props and state.
- Prefer functional components and React Hooks.
- Ensure no inline CSS styles are used unless absolutely necessary for dynamic animations (e.g., Framer Motion dynamic properties). Move all static styles to external `.css` files.

## Pull Request Process

1. Fork the repository and create your branch from `main`.
2. Ensure your code passes all linting rules (`npm run lint`).
3. Describe your changes clearly in the Pull Request description.
4. Wait for a review and address any feedback!
