import {latexmlQuery} from './Latexml';
import {mwsApiQuery} from './MwsApi';
import {mwsQuery} from './MwsPure';

// export default latexmlQuery;

// TODO make configurable
const searchQuery = process.env.MWS_MODE === 'API' ? mwsApiQuery : mwsQuery;
const convertQuery = latexmlQuery;

export {convertQuery, searchQuery};
