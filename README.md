# [Gestalt](https://gestalt.pinterest.systems/) &middot; [![NPM Version](https://img.shields.io/npm/v/gestalt.svg)](https://www.npmjs.com/package/gestalt) [![License](https://img.shields.io/npm/l/gestalt?style=flat)](https://github.com/pinterest/gestalt/blob/master/LICENSE)

Gestalt is Pinterest's design system. Our system includes a React component library with comprehensive guidelines, best practices, tools, and resources to support designers and engineers delivering a high-quality product.

[Visit the official Gestalt Documentation](https://gestalt.pinterest.systems/)

## Installation

The package can be installed via npm:



Or via yarn:

yarn add v1.22.22
info Visit https://yarnpkg.com/en/docs/cli/add for documentation about this command.
yarn add v1.22.22
info Visit https://yarnpkg.com/en/docs/cli/add for documentation about this command.
yarn add v1.22.22
info Visit https://yarnpkg.com/en/docs/cli/add for documentation about this command.

## Usage

Gestalt exports each component as ES6 modules and a single, precompiled CSS file:



That syntax is Webpack specific (and will work with Create React App), but you can use Gestalt anywhere that supports ES6 module bundling and global CSS.

## Development

Gestalt is a [multi-project monorepo](https://yarnpkg.com/lang/en/docs/workspaces/). The docs and components are all organized as separate packages that share similar tooling.

Install project dependencies and run tests:

yarn install v1.22.22
[1/4] Resolving packages...
[2/4] Fetching packages...
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
yarn run v1.22.22
$ ./scripts/test.sh
build
$ rollup -c rollup.config.js
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

Build and watch Gestalt & run the docs server:

yarn run v1.22.22
$ netlify dev -c "yarn dev"
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

Visit [http://localhost:8888/](http://localhost:8888) and click on a component to view the docs.

## Codemods

When a release will cause breaking changes — in usage or in typing — we provide a codemod to ease the upgrade process. Codemods are organized by release in .

### Codemod Usage

Clone the Gestalt repo locally if you haven't already. Run the relevant codemod(s) in the relevant directory of your repo (not the Gestalt repo): anywhere the component to be updated is used. Example usage for a codebase using TypeScript:

yarn run v1.22.22
$ ./packages/gestalt-codemods/generic-codemods/entry.sh --parser=tsx -t={relative/path/to/codemod} relative/path/to/your/code.tsx
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
Done in 1.88s.

For a dry run to see what the changes will be, add the  (dry run) and  (print output) flags (pipe stdout to a file for easier inspection if you like).

## Releasing

Every commit to master performs a release. As a reviewer, ensure the correct label is attached to every PR. Please follow [semantic versioning](https://semver.org/).

- : documentation updates / spelling mistakes in code / internal scripts
- : add component / add component props / API change with codemod
- : backwards incompatible API change without codemod

Example PR title: 

## Typescript Support

Gestalt officiallty supports and maintains Typescript declarations files.

### Issues

Gestalt is Pinterest's open-sourced design system. However, Gestalt's web component library is almost exclusively developed by a 5 engineer team within Pinterest, and our primary customers are Pinterest engineers who use Gestalt. The team's priority is the needs of our internal Pinterest customers.

We do not have resources to work on features or issues requested only by external developers. We also handle a very large amount of internal support requests, so we do not have the resources to respond to external Github issues.

Pinterest is staying open source, as it's a great resource for the design and engineering community, but we don't provide support to external developers. If you need to get in touch, send us an [email](mailto:designsystems@pinterest.com?subject=Github%20Request%3A).

### Troubleshooting

Take a look at our [FAQ](https://gestalt.pinterest.systems/get_started/faq) section if you run into any development problems.

## System Information

- Last Updated: 2025-04-09
- Running on: Linux modal 4.4.0 #1 SMP Sun Jan 10 15:06:54 PST 2016 x86_64 GNU/Linux
