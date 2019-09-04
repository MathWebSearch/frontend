import * as React from 'react';
import '../css/ResultListEntry.css';
import {expandContext} from './ResultList';
import {IFormulaHit} from '../Backend/client.d';
import FormulaHit from './FormulaHit';

interface ResultListEntryProps {
  title: string;
  formulahits: Array<IFormulaHit>;
}
/*
 * A single Entry in the result list can include multiple fromulahits
 * */
export function ResultListEntry(props: ResultListEntryProps): JSX.Element {
  const {title, formulahits} = props;
  const [active, setValue] = React.useState<boolean>(false);
  const hook = React.useContext(expandContext);
  const toggleExpansion = () => {
    setValue(!active);
  };
  if (active !== hook && hook !== undefined) {
    setValue(hook);
  }

  let inner: React.ReactNode;
  if (active) {
    inner = (
      <div>
        {formulahits.map((entry: IFormulaHit, index: number) => (
          <FormulaHit key={index} {...entry} />
        ))}
      </div>
    );
  }
  return (
    <div className="ResultListEntry">
      <div onClick={toggleExpansion}>
        <b>{title}</b>
      </div>
      {inner}
    </div>
  );
}
