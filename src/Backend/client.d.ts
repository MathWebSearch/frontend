/**
 * interface for the payload that are used for fetch
 * */
export interface Ipayload {
  headers?: string | Header;
  body?: string | URLSearchParams;
}

export interface Iqvar {
  name: string;
  xpath: string;
}
export interface ISubstitution {
  name: string;
  term: string;
}

export interface IFormulaHit {
  id: number;
  local_id: number;
  /** the document the hit comes fromt*/
  segment: string;
  /** the title from metadata */
  title?: string;
  /** the url to the fromula */
  url?: string;
  /** the mathml for the complete formula */
  source: string;
  /** the mathml for the subterm that was hit with the searchquery  */
  subterm: string;
  /** the xpath to subterm in source */
  xpath: string;
  /** Array of the terms of subsitions */
  substituitons: ISubstitutions;
  /** Query variables xpath */
  queryvariablesxpath: Array<Iqvar>;
  /** the text from the document */
  text: string;
}

export interface IMWSClientResult {
  total: number;
  entries: Array<IFormulaHit>;
  took?: number;
}

export interface ILTXResponse {
  status_code: number;
  log: string;
  result: string;
  status: string;
}
export interface IMWSAPIResponse {
  from: number;
  qvars: Array<Iqvars>;
  hits: Array<any>;
  took: number;
  kind: string;
  stats: any;
  total: number;
  size: number;
}
