import {MakeEntries as apiEntries} from './MakeMwsApiEntry';
import {MakeEntries as pureEntries} from './MakeMwsEntry';

const MakeEntries =
  process.env.REACT_APP_MWS_MODE === 'API' ? apiEntries : pureEntries;
export {MakeEntries};
