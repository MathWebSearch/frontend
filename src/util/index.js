import {MakeEntries as apiEntries} from './MakeMwsApiEntry';
import {MakeEntries as purenEntries} from './MakeMwsEntry';

//TODO: make configurable

const MakeEntries = process.env.MWS_MODE === 'API' ? apiEntries : purenEntries;
export {MakeEntries};
