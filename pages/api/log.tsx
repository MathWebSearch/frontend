import { Request, Response } from 'express';
import * as fs from 'fs';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const LOG_PATH = serverRuntimeConfig.REACT_APP_LOG_FILEPATH;

export default async function handler(req: Request, res: Response) {
  if (!LOG_PATH) {
    res.status(200).send('Log filepath not specified.');
    return;
  }
  const json = JSON.parse(req.body)
  await fs.promises.appendFile(LOG_PATH,`${+new Date()},${json.status},${json.query}\n`);
  res.status(200);
}
