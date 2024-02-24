# word-trainer

Assistant in learning new words in a foreign language.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Development

1. Run the server locally

```bash
cd ../server && yarn start
```

2. Install the client dependencies

```bash
yarn install
```

3. Generate graphql types for the client

```bash
yarn codegen
```

4. Run the client locally

```bash
yarn start
```

## Atomic Methodology

- Atoms - are **_HTML tags_** such as a form, an input field, or a button.
- Molecules - are **_collections of atoms_**. They are intended to be reused, but not applicable by themselves (form with label, input, button).
- Organisms - are **_combinations of molecules_** that form separate sections of the interface (header, footer, left/right menu).
- Templates - are **_combinations of organisms_** that form the unchanging basis of the page (layout with header, footer, left/right menu, reserved space for page content).
- Pages - are **_template instances_**, the root module that the user will see.
