import * as React from 'react';
import {colors} from '../../config/Colors';
import MathML from '../MathML';
import styles from './ResultListEntry.module.css';

/**
 * creates an jsx element containg for every query variable the substition
 * */
interface SubsitutionsProps {
  subst: {[key: string]: string};
}
export default function Subsitutions(
  props: SubsitutionsProps,
): JSX.Element | null {
  const {subst} = props;
  if (!subst) {
    return null;
  }
  return (
    <div className={styles.FlexContainer}>
      <b> Substitutions: </b>
      {Object.keys(subst).map((qvar: string, index: number) => {
        return (
          <div key={qvar}>
            <span
              style={{color: colors[index % colors.length]}}
              className={styles.FlexContainer}>
              <b>{`${qvar}:`}</b>
              <MathML mathstring={subst[qvar]} />
            </span>
          </div>
        );
      })}
    </div>
  );
}
