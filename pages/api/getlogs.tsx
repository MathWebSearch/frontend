import * as fs from 'fs';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const LOG_PATH = serverRuntimeConfig.REACT_APP_LOG_FILEPATH;

export default async function handler(_req: any, res: any) {
  if (!LOG_PATH) {
    res.status(200).send('Log filepath not specified.');
    return;
  }
  const data = await fs.promises.readFile(LOG_PATH, 'utf8');
  res.status(200).send(data);
}
