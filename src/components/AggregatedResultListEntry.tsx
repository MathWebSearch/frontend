import * as React from 'react';
import {ResultListEntry} from './ResultListEntry';
import {IFormulaHit} from '../interfaces';
import {Taggregation} from './ResultList';

interface Ipartition {
  [title: string]: IFormulaHit[];
}
/*
 * creates an array of ResultListEntries based on the choosen aggregation
 * */
function aggregate(
  allEntries: IFormulaHit[],
  kind: Taggregation = 'None',
): React.ReactNodeArray {
  switch (kind) {
    case 'Title':
      let partition: Ipartition = {};
      for (let entry of allEntries) {
        const title = entry.title || entry.segment;
        if (!title) {
          continue;
        }
        if (!partition[title]) {
          partition[title] = [];
        }
        partition[title].push(entry);
      }
      return Object.keys(partition).map((title: string, index: number) => (
        <ResultListEntry
          key={index}
          title={title}
          formulahits={partition[title]}
        />
      ));
    case 'None':
    default:
      return allEntries.map((entry: IFormulaHit, index: number) => (
        <ResultListEntry
          key={index}
          title={entry.title || entry.segment}
          formulahits={[entry]}
        />
      ));
  }
}
interface IAREProps {
  allEntries: Array<IFormulaHit>;
  kind: Taggregation;
}

export default function AggregatedResultListEntry(props: IAREProps) {
  const {allEntries, kind} = props;
  return <React.Fragment>{aggregate(allEntries, kind)} </React.Fragment>;
}
