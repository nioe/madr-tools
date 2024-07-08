#!/usr/bin/env node
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';

yargs(hideBin(process.argv)).scriptName('madr').commandDir('commands').demandCommand().strict().alias({h: 'help'}).argv;
