import * as fs from 'fs';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const LOG_PATH = serverRuntimeConfig.REACT_APP_LOG_FILEPATH;
const LOG_PASSCODE = serverRuntimeConfig.REACT_APP_LOG_PASSCODE;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  const provided = req.body?.passcode;
  if (!LOG_PASSCODE || LOG_PASSCODE !== provided) {
    res.status(401).send(`Invalid passcode.`)
    return;
  }
  if (!LOG_PATH) {
    res.status(200).send('Log filepath not specified.');
    return;
  }
  const data = await fs.promises.readFile(LOG_PATH, 'utf8');
  res.status(200).send(data);
}
