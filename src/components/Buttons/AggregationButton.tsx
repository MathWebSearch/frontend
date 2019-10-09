import * as React from 'react';
import {Taggregation} from '../../interfaces';
import {BRANDING_TITLE} from '../../config';
import {Store} from '../../store/Store';
import {changeAggregationAction} from '../../store/Actions';
import {useExpand} from './ExpandButtons';
import {CheckBox} from '../CheckBox';

/**
 * checkbox to toogle the if the elements are grouped by document or not
 * */
export function ChangeAggregationButton(props: {
  className?: string;
}): JSX.Element {
  const {
    state: {aggregation},
    dispatch,
  } = React.useContext(Store);
  const {close} = useExpand();
  const toggleAggregation = () => {
    close();
    const newaggr: Taggregation = aggregation === 'None' ? 'Title' : 'None';
    dispatch(changeAggregationAction(newaggr));
  };
  return (
    <CheckBox
      className={props.className}
      text={`group formulas by ${BRANDING_TITLE} Document`}
      checked={aggregation === 'Title'}
      onChange={toggleAggregation}
    />
  );
}
