import path from 'path';
import { config } from 'dotenv';

const dotenvSettings = config({
  path: path.resolve('./.env'),
}).parsed;
// spread .env overwrites onto process.env to be accessed conveniently everywhere else
process.env = Object.assign(process.env, dotenvSettings);
