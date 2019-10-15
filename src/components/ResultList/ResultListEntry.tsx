import * as React from 'react';
import styles from './ResultListEntry.module.css';
import {IFormulaHit} from '../../interfaces';
import FormulaHit from './FormulaHit';
import {Store} from '../../store/Store';

interface ResultListEntryProps {
  title: string;
  formulahits: Array<IFormulaHit>;
}
/*
 * A single Entry in the result list can include multiple fromulahits
 * the state indicates if this is closed (just showing the title)
 * or expandend (also showing the formulahit(x))
 * */
export function ResultListEntry(props: ResultListEntryProps): JSX.Element {
  const {title, formulahits} = props;
  const [active, setValue] = React.useState<boolean>(false);
  const {
    state: {expandAll, aggregation},
  } = React.useContext(Store);
  const toggleExpansion = () => {
    setValue(!active);
  };
  /* Close if the aggregation changes*/
  React.useEffect(() => {
    setValue(false);
  }, [aggregation]);
  /* check if openall/closeall button was clicked */
  if (active !== expandAll && expandAll !== undefined) {
    setValue(expandAll);
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
    <div className={styles.ResultListEntry}>
      <div onClick={toggleExpansion} className={styles.title}>
        <b>{title}</b>
      </div>
      {inner}
    </div>
  );
}
