import * as fs from 'fs';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const LOG_PATH = serverRuntimeConfig.REACT_APP_LOG_FILEPATH;

export default async function handler(_req: any, res: any) {
  if (!LOG_PATH) {
    res.status(200).send('Log filepath not specified.');
    return;
  }
  const logData = await fs.promises.readFile(LOG_PATH, 'utf8');
  const lines = logData?.split(/r?\n/);
  // Consider using a library like d3 or Query-CSV if this becomes too complicated.
  const output = lines.map((line) => {
    const firstLoc = line.indexOf(',')
    const secondLoc = line.indexOf(',', firstLoc + 1);
    if (firstLoc < 0 || secondLoc <= firstLoc || line.substring(firstLoc + 1, secondLoc).trim() !== 'sent') {
      return '';
    }
    return line.substring(secondLoc + 1).trim();
  }).join('\n');

  res.status(200).send(output);
}
