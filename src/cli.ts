#!/usr/bin/env node
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';
import * as indexCommand from './commands/index';
import * as initCommand from './commands/init';
import * as newCommand from './commands/new';
import {CommandModule} from 'yargs';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs(hideBin(process.argv))
  .scriptName('madr')
  .command([indexCommand, initCommand, newCommand] as Array<CommandModule>)
  .demandCommand()
  .strict()
  .version('1.1.3') // x-release-please-version
  .alias({h: 'help', v: 'version'}).argv;
