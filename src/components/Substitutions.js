import React from 'react';
import {colors} from '../util/Colors.js'; 
import {MathML} from './MathML';

/**
 * creates an jsx element containg for every query variable the substition
 * @param {array} subst the subst array from the api reply
 * @return {jsx}
 * */
export default function Subsitutions(props) {
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
