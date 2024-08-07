// noinspection JSUnusedGlobalSymbols

import {existsSync, readdirSync, readFileSync, writeFileSync} from 'fs';
import {resolve} from 'path';
import type {CommandBuilder} from 'yargs';
import {getAbsoluteMadrDirectoryFromConfig, getConfig} from '../util/config';
import {logger} from '../util/logger';

const generatedContentMarker = '<!-- Autogenerated content below -->';
const defaultHeader = `# Architectural Decision Log\n\nThis log lists all architectural decisions of this project.\n\n`;
const footer =
  'To create new MADRs, use the `madr`-Tool. Checkout the possible options by running `npx madr --help` in your console.';

export const command = 'index';
export const desc = 'Create or update index file based on MADR files';

export const builder: CommandBuilder = (yargs) => yargs;

export const handler = (): void => {
  try {
    const madrDirectory = getAbsoluteMadrDirectoryFromConfig();
    const {indexFileName} = getConfig();
    const indexFilePath = resolve(madrDirectory, indexFileName);

    let header = defaultHeader;

    if (existsSync(indexFilePath)) {
      const originalFileContent = readFileSync(indexFilePath, {encoding: 'utf-8'});
      const indexOfGeneratedContentMarker = originalFileContent.indexOf(generatedContentMarker);

      header =
        indexOfGeneratedContentMarker >= 0
          ? originalFileContent.substring(0, indexOfGeneratedContentMarker)
          : `${originalFileContent}\n`;
    }

    writeFileSync(indexFilePath, `${header}${generateIndex(madrDirectory)}`, {encoding: 'utf-8'});

    logger.ok(`Successfully generated ADR Log in ${indexFileName}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

const generateIndex: (madrDirectory: string) => string = (madrDirectory) =>
  `${generatedContentMarker}\n${getLinks(madrDirectory)
    .map((link) => `* ${link}`)
    .join('\n')}\n\n${footer}`;

const getLinks: (madrDirectory: string) => Array<string> = (madrDirectory) =>
  readdirSync(madrDirectory)
    .filter((filename) => filename.match(/^\d{4}/))
    .map((filename) => `[ADR-${filename.substring(0, 4)}](./${filename}) - ${getTitleText(resolve(madrDirectory, filename))}`);

const getTitleText: (madrFile: string) => string = (madrFile) =>
  (
    readFileSync(madrFile, {encoding: 'utf-8'})
      .split(/\r?\n/)
      .find((line) => /^# .*$/.test(line)) || ''
  ).substring(2);
