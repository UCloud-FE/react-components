# How to contribute

We love pull requests. Please following this guidelines to make your pull request easier to merge.

## Prerequisites

*   If this is your first Pull Request [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)
*   Install [EditorConfig](http://editorconfig.org/) plugin for your code editor to make sure it uses correct settings.
*   Fork the repository and clone your fork.
*   Install dependencies: yarn.
*   Read the [developer guide](https://ucloud-fe.github.io/react-components/#/%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97).

## Development workflow

Run styleguide to start the project:

```sh
npm run styleguide
```

Open [http://localhost:6080](http://localhost:6080) in a browser.

Run linters and tests:

```sh
# run eslint
npm run lint:es
# run stylelint
npm run lint:style
# run test
npm run test
# or
npx jest
```

Run tests in watch mode

```sh
npx jest --watch
```

To update Jest snapshots

```sh
npx jest -u
```

** Don’t forget to add tests and update documentation and update snapshots for your changes. **

** Please update yarn.lock if you add or update dependencies, package-lock.json is being ignored **
