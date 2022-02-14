// noinspection JSUnusedGlobalSymbols

import {existsSync, readdirSync, readFileSync, writeFileSync} from 'fs';
import {join, resolve} from 'path';
import type {Arguments, CommandBuilder} from 'yargs';
import {templateFileName} from '../constants/constants';
import {defaultConfig, getAbsoluteMadrDirectoryFromConfig} from '../util/config';
import {logger} from '../util/logger';
import {handler as index} from './index';

type Options = {
  title: string;
};

export const command = 'new <title>';
export const desc = 'Create a new MADR with the given title based on the template.md in your MADR directory';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs.positional('title', {
    type: 'string',
    describe: 'The title of the new MADR',
    default: defaultConfig.madrDirectory,
  });

export const handler = ({title}: Arguments<Options>): void => {
  try {
    const madrDirectory = getAbsoluteMadrDirectoryFromConfig();
    const templateFilePath = resolve(madrDirectory, templateFileName);

    if (!existsSync(templateFilePath)) {
      logger.error(`MADR template file '${templateFilePath}' not present!`);
      process.exit(1);
    }

    const newMadrFileName = `${getNextId(madrDirectory)}-${title
      .toLowerCase()
      .replace(/[^0-9a-z\s\-_]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-{2,}/g, '-')}.md`;

    writeFileSync(
      join(madrDirectory, newMadrFileName),
      readFileSync(templateFilePath, {encoding: 'utf-8'}).replace(/^# .*$/m, `# ${title}`),
      {encoding: 'utf-8'},
    );

    // Run index command;
    index();

    logger.ok(`Successfully created MADR file ${newMadrFileName}. You can start editing it now.`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

const getNextId: (madrDirectory: string) => string = (madrDirectory) =>
  `${
    readdirSync(madrDirectory)
      .filter((filename) => filename.match(/^\d{4}/))
      .map((filename) => parseInt(filename.substring(0, 4)))
      .reduce((previousValue, currentValue) => Math.max(previousValue, currentValue), -1) + 1
  }`.padStart(4, '0');
