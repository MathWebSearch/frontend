import * as React from 'react';
import {Store} from '../store/Store';
import {updateProgressAction} from '../store/Actions';
const Progress = require('react-progress');

/*
 * Progressbar on the top
 * */
export function ProgressBar(): JSX.Element {
  const {state, dispatch} = React.useContext(Store);
  React.useEffect(() => {
    state.progress === 66 &&
      setTimeout(() => dispatch(updateProgressAction(100)), 300);
  });
  return <Progress percent={state.progress} height={4} color={'#4caf50'} />;
}
