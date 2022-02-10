import type {Arguments, CommandBuilder} from 'yargs';

type Options = {
  path: string;
};

export const command: string = 'init [path]';
export const desc: string = 'Initialize the MADR directory under docs/decisions or the given [path]';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs.positional('path', {
    type: 'string',
    describe: 'The path relative to the project root where to initialize the MADR directory',
    default: 'docs/decisions',
  });

export const handler = (argv: Arguments<Options>): void => {
  const {path} = argv;

  console.log('path', path);

  process.exit(0);
};
