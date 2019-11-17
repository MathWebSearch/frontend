import * as React from 'react';
import {Taggregation} from '../../interfaces';
import {BRANDING_TITLE} from '../../config';
import {Store} from '../../store/Store';
import {changeAggregationAction} from '../../store/Actions';
import {CheckBox} from '../CheckBox';
import {getButtonText} from '../../util/buttonText';

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
  const toggleAggregation = () => {
    const newaggr: Taggregation = aggregation === 'None' ? 'Title' : 'None';
    dispatch(changeAggregationAction(newaggr));
  };
  const text = getButtonText('aggr').replace(/BRANDING_TITLE/, BRANDING_TITLE);
  return (
    <CheckBox
      className={props.className}
      text={text}
      checked={aggregation === 'Title'}
      onChange={toggleAggregation}
    />
  );
}
