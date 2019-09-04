import * as React from 'react';
import '../css/ResultListEntry.css';
import {expandContext} from './ResultList';

interface ResultListEntryProps {
  title: string;
  formulas: Array<Function>;
}
/*
 * A single Entry in the result list can include multiple fromulahits
 * */
export function ResultListEntry(props: ResultListEntryProps): JSX.Element {
  const {title, formulas} = props;
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
    inner = <div>{formulas.map((newMath: Function) => newMath())}</div>;
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
