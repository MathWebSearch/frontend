import * as React from 'react';
import {colors} from '../config/Colors';
import MathML from './MathML';
import PropTypes from 'prop-types';

/**
 * creates an jsx element containg for every query variable the substition
 * */
interface SubsitutionsProps{
  subst: any;
}
export default function Subsitutions(props: SubsitutionsProps) {
  const {subst} = props;
  if (!subst) {
    return null;
  }
  return (
    <div className="FlexContainer">
      <b> Subsitutions: </b>
      {Object.keys(subst).map((qvar, index) => {
        return (
          <div key={qvar}>
            <span
              style={{color: colors[index % colors.length]}}
              className="FlexContainer">
              <b>{`${qvar}:`}</b>
              <MathML mathstring={subst[qvar]} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

Subsitutions.propTypes = {
  subst: PropTypes.object,
};
