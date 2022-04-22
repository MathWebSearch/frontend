import * as React from 'react';
import { LogClient } from 'src/Backend/client';
import { Store } from '../../store/Store';
import styles from './SampleQueries.module.css';



const getRecentSample = (responseText: string, numSamples: number, numRecent: number) => {
  const allQueries = responseText?.trim().split('\n');
  if (!allQueries || !allQueries.length) return [];
  const uniqueQueries = [...new Set(allQueries)].filter(query => query !== LogClient.REDACTED_TAG);
  const recentQueries = uniqueQueries.length > numRecent ? uniqueQueries.slice(-numRecent) : uniqueQueries;

  const shuffled = recentQueries.sort(() => 0.5 - Math.random());
  return shuffled.length > numSamples ? shuffled : shuffled.slice(0, numSamples);
};

/**
 * Function component the displays previously logged queries.
 * */
export default function SampleQueries(): JSX.Element | null {
  const { state } = React.useContext(Store);
  const { allEntries, triggerSearch } = state;

  const [sampleQueries, setSampleQueries] = React.useState([] as string[]);

  React.useEffect(() => {
    async function getSampleQueries() {
      const response = await fetch('/api/getqueries');
      const responseText = await response.text();

      setSampleQueries(getRecentSample(responseText, 5, 100));
    }
    getSampleQueries();
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      {sampleQueries && !allEntries && !triggerSearch ?
        <div >
          <h2 >Recent queries</h2>
          {sampleQueries.map((query, idx) =>
            <span className={styles.query} key={idx} style={{ display: 'block' }}>{query}</span>
          )}
          <div style={{ marginTop: '30px' }} >
            <a href="/api/getqueries" target="_blank">Show queries from all users</a>
          </div>
        </div>
        : null}

    </div>);
}
