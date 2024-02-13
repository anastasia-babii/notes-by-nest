import * as dotenv from 'dotenv';
import * as fs from 'fs';

export const config = () => {
  const envConfig = dotenv.parse(fs.readFileSync('.env'));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
};
