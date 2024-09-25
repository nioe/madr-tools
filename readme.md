# madr-tools

Node.js CLI tools to help you create and manage [Markdown Architectural Decision Records (MADR)](https://github.com/adr/madr).  
The famous [ADR Tools](https://github.com/npryce/adr-tools) have been taken as a role model for this Node.js port.

## Installation

Within specific project (recommended):

```bash
npm i -D madr-tools
```

Globally:

```bash
npm i -g madr-tools
```

## Usage

Run `npx madr --help` to get an overview and description for all available commands. Each command provides another, more detailed
help. E.g. `npx madr init --help`.

### Initialization

Run the following command within the root directory of your repository to initialize the MADR directory and config file.

```bash
npx madr init [optional path] [-i readme.md]
```

By default, the MADR directory will be created under `docs/decisions`. You can specify a custom directory by providing the
relative path as the first positional argument.  
Furthermore, the overview over all MADRs is written to a file called `index.md` by default as
the [official MADR Documentation](https://github.com/adr/madr#create-a-new-adr) suggests. However, when watching the directory
within a web-based Git repo (e.g. GitHub or GitLab), it will automatically render the `readme.md` file within the directory.
Therefore, it's possible to use `readme.md` instead of `index.md` as the file name by setting the `-i readme.md` option.

### Creating a new MADR

Run the following command to create a new MADR-File.

```bash
npx madr new <title>
```

e.g.

```bash
npx madr new "A very important decision"
```

It will create a new MADR file within the configured directory based on the `template.md` file. Furthermore, it updates the MADR
log.

### Updating the MADR Log

When you change the filename or title of a MADR, it is possible to trigger an update of the log manually by running

```bash
npx madr index
```

## Contribution

Every contribution to this project is more than welcome. Just follow these rules:

- The repo uses [_Conventional Commits_](https://www.conventionalcommits.org/) to create semantic versions
- The codebase should automatically be reformatted using [_Prettier_](https://prettier.io/) in a pre-commit hook. Therefore, it
  should be pretty hard to commit something which is not well formatted... 😅
- Create a PR once you have finished your feature

### Local development

- Clone the repo
- Install the dependencies `npm i`
- Run the build `npm run build`
- Locally link the bin script `npm link`
- Afterwards, you should be able to run `madr --help` in your favorite console
