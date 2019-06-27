import {MakeEntries as apiEntries} from './MakeMwsApiEntry';
import {MakeEntries as purenEntries} from './MakeMwsEntry';

//TODO: make configurable

console.log(process.env.REACT_APP_MWS_MODE);
const MakeEntries =
  process.env.REACT_APP_MWS_MODE === 'API' ? apiEntries : purenEntries;
export {MakeEntries};
