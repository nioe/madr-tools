import {resolve} from 'path';
import {existsSync, readFileSync, writeFileSync} from 'fs';

export interface MadrToolsConfig {
  madrDirectory: string;
}

export const configFileName = '.madrrc.json';

export const defaultConfig: MadrToolsConfig = {
  madrDirectory: 'docs/decisions',
};

export const getConfig: () => MadrToolsConfig = () => {
  const configPath = getConfigPath();
  const storedConfig = existsSync(configPath) ? JSON.parse(readFileSync(configPath, {encoding: 'utf-8'})) : {};

  return {...defaultConfig, ...storedConfig};
};

export const saveConfig: (partialConfig: Partial<MadrToolsConfig>) => void = (partialConfig) => {
  writeFileSync(getConfigPath(), JSON.stringify({...getConfig(), ...partialConfig}, null, 2), 'utf-8');
};

const getConfigPath = () => resolve(process.cwd(), configFileName);
