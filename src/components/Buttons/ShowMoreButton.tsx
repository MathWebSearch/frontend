import * as React from 'react';
import {Store} from '../../store/Store';
import {Spinner} from '.././Progress';
import {showMoreAction} from '../../store/Actions';


/**
 * Button to trigger the show more action
 * */
export function ShowMoreButton(props?: {
  className?: string;
}): JSX.Element | null {
  const {
    state: {triggerSearch, allEntries, total, current_formula},
    dispatch,
  } = React.useContext(Store);
  if (triggerSearch) {
    return <Spinner />;
  }
  if (!allEntries) {
    return null;
  }
  const curlength = allEntries.length;
  if (curlength < total) {
    return (
      <button
        onClick={() => dispatch(showMoreAction(current_formula))}
        disabled={curlength >= total}
        {...props}>
        Show More
      </button>
    );
  }
  return null;
}
