// noinspection JSUnusedGlobalSymbols

import type {Arguments, CommandBuilder} from 'yargs';
import {copyFileSync, existsSync, mkdirSync, readdirSync} from 'fs';
import {join, resolve} from 'path';
import {logger} from '../util/logger';
import {defaultConfig, saveConfig} from '../util/config';

type Options = {
  path: string;
};

export const command: string = 'init [path]';
export const desc: string = 'Initialize the MADR directory under docs/decisions or the given [path]';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs.positional('path', {
    type: 'string',
    describe: 'The path relative to the current working directory where to initialize the MADR directory',
    default: defaultConfig.madrDirectory,
  });

export const handler = (argv: Arguments<Options>): void => {
  const {path: relativeMadrPath} = argv;
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

  copyFileSync(join(assetsPath, 'template.md'), join(absoluteMadrPath, 'template.md'));
  saveConfig({madrDirectory: relativeMadrPath});

  logger.ok(`MADR directory '${absoluteMadrPath}' successfully initialized.`);
  process.exit(0);
};
