// noinspection JSUnusedGlobalSymbols

import {copyFileSync, existsSync, mkdirSync, readdirSync} from 'fs';
import {join, resolve} from 'path';
import type {Arguments, CommandBuilder} from 'yargs';
import {templateFileName} from '../constants/constants';
import {defaultConfig, saveConfig} from '../util/config';
import {logger} from '../util/logger';

type Options = {
  path: string;
};

export const command = 'init [path]';
export const desc = 'Initialize the MADR directory under docs/decisions or the given [path]';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs.positional('path', {
    type: 'string',
    describe: 'The path relative to the current working directory where to initialize the MADR directory',
    default: defaultConfig.madrDirectory,
  });

export const handler = ({path: relativeMadrPath}: Arguments<Options>): void => {
  try {
    const absoluteMadrPath = resolve(process.cwd(), relativeMadrPath);
    const assetsPath = resolve(__dirname, '../../assets');

    if (existsSync(absoluteMadrPath)) {
      if (existsSync(absoluteMadrPath) && readdirSync(absoluteMadrPath).length) {
        logger.error(`The specified MADR directory '${absoluteMadrPath}' already exists and is not empty!`);
        process.exit(1);
      }
    } else {
      mkdirSync(absoluteMadrPath, {recursive: true});
    }

    copyFileSync(join(assetsPath, templateFileName), join(absoluteMadrPath, templateFileName));
    saveConfig({madrDirectory: relativeMadrPath}, {noErrorOnMissingConfig: true});

    logger.ok(`MADR directory '${absoluteMadrPath}' successfully initialized.`);
    process.exit(0);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
