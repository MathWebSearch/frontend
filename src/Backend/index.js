import {latexmlQuery} from './Latexml';
import {mwsApiQuery} from './MwsApi';
import {mwsQuery} from './MwsPure';

const searchQuery =
  process.env.REACT_APP_MWS_MODE === 'API' ? mwsApiQuery : mwsQuery;
const convertQuery = latexmlQuery;

export {convertQuery, searchQuery};
