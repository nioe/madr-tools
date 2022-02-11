import chalk from 'chalk';

export const logger: Logger = {
  log: (message, optionalParams) => console.log(chalk.white(message, optionalParams)),
  info: (message, optionalParams) => console.log(chalk.cyan(message, optionalParams)),
  ok: (message, optionalParams) => console.log(chalk.greenBright(message, optionalParams)),
  warn: (message, optionalParams) => console.log(chalk.yellow(message, optionalParams)),
  error: (message, optionalParams) => console.log(chalk.redBright(message, optionalParams)),
};

export interface Logger {
  log: LoggerFunction;
  info: LoggerFunction;
  ok: LoggerFunction;
  warn: LoggerFunction;
  error: LoggerFunction;
}

export type LoggerFunction = (message?: unknown, ...optionalParams: Array<unknown>) => void;
