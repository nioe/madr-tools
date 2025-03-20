// noinspection JSUnusedGlobalSymbols

import {copyFileSync, existsSync, mkdirSync, readdirSync} from 'fs';
import {dirname, join, resolve} from 'path';
import {fileURLToPath} from 'url';
import type {Arguments, CommandBuilder} from 'yargs';
import {templateFileName} from '../constants/constants';
import {defaultConfig, saveConfig} from '../util/config';
import {logger} from '../util/logger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type Options = {
  path: string;
  index: string;
};

export const command = 'init [path]';
export const desc = 'Initialize the MADR directory under docs/decisions or the given [path]';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('path', {
      type: 'string',
      describe: 'The path relative to the current working directory where to initialize the MADR directory',
      default: defaultConfig.madrDirectory,
    })
    .option('index', {
      alias: 'i',
      describe: `By default the decision log is written to a file called '${defaultConfig.indexFileName}'. It is possible to change this filename by setting this option`,
      choices: [defaultConfig.indexFileName, 'readme.md'],
      default: defaultConfig.indexFileName,
    });

export const handler = ({path: madrDirectory, index: indexFileName}: Arguments<Options>): void => {
  try {
    const absoluteMadrPath = resolve(process.cwd(), madrDirectory);
    const assetsPath = resolve(__dirname, '../assets');

    if (existsSync(absoluteMadrPath)) {
      if (existsSync(absoluteMadrPath) && readdirSync(absoluteMadrPath).length) {
        logger.error(`The specified MADR directory '${absoluteMadrPath}' already exists and is not empty!`);
        process.exit(1);
      }
    } else {
      mkdirSync(absoluteMadrPath, {recursive: true});
    }

    copyFileSync(join(assetsPath, templateFileName), join(absoluteMadrPath, templateFileName));
    saveConfig({madrDirectory, indexFileName}, {noErrorOnMissingConfig: true});

    logger.ok(`MADR directory '${absoluteMadrPath}' successfully initialized.`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
