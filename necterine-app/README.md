# Necterine App

This is the official Necterine Mobile App repository, a React Native application using [Expo](https://expo.io/).

## What's inside

- `./`: The main React Native application.
- `graphql-types`: Provides GraphQL types for the applications.
- `app/`: Core functionality of the application.
- `config/`: Configuration files.
- `providers/`: Context providers for state management.
- `utils/`: Utility functions and helpers.
- `components/`: Reusable components.
- `hooks/`: Custom React hooks.
- `tailwind.config.ts`: Tailwind CSS configuration.
- `metro.config.js, babel.config.js, tsconfig.json`: Configuration files for Metro, Babel, and TypeScript.

### Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Features
- *Intuitive UI*: Utilizing Tailwind CSS for responsive and aesthetic design.
- *GraphQL Integration*: Efficient data management.
- *Custom Hooks*: Enhance functionality and reusability.

### Release Build

In order to create a .ipa file, we are using xCode (some build-phases have customizations in order to work properly)

On each of the following steps: "Bundle React Native code and images" and "Upload Debug Symbols to Sentry" add the following lines (at the beginning) in order to properly build and archive.

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion (node is on the path now)
ln -s $(nvm which default) /usr/local/bin/node
nvm use
```

Right now we don't have any `.env` management mechanism (for staging and prod), so every time you need to create an .ipa, archive it and release it to Test Flight or App Store, remember to comment/uncomment the varialbes in the `.env` file. 

### Develop

You'll need `.env`. Ask someone on the team.

To develop all apps and packages, first install the dependencies by running:

```
yarn install
```

Generate a ios build and install in the simulator/device:

```
npx expo start:ios
```

Then run the following command:

```
yarn dev
```

To work on the app, you'll need to get invited to expo. Talk to someone on the team to get that sorted.

### Tailwind Theme (Expo Cache)

If you make changes to the tailwind theme at `tailwind.config.ts`, you'll need to restart the expo project with a clean cache. You can do this by running `expo start -c`

### Usefull Expo Commands

To locally compile and run the iOS app in release mode

```
npx expo run:ios --configuration Release
```