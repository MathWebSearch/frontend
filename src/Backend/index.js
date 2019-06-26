import {latexmlQuery} from './Latexml';
import {mwsApiQuery} from './MwsApi';

// export default latexmlQuery;

// TODO make configurable
const searchQuery = mwsApiQuery;
const convertQuery = latexmlQuery;

export { convertQuery, searchQuery };
// export searchQuery;
