export interface resultListContent {
  total: number;
  allEntries: Array<IFormulaHit>;
}

export interface IState {
  input_text: string | null;
  input_formula: string | null;
  current_formula: string | null;
  allEntries?: Array<IFormulaHit>;
  total: number;
  limitmin: number;
  answsize: number;
  last_took?: number;
  triggerSearch: bool;
  progress: number;
  aggregation: Taggregation;
}

interface IUpadateinputtextaction {
  type: 'UPDATE_INPUT_TEXT';
  payload: {input_text: string; input_formula: string | null};
}
interface IConvertAction {
  type: 'CONVERT';
  payload: {input_formula: string | null};
}

interface ISearchAction {
  type: 'SEARCH';
  payload: {
    limitmin: number;
    current_formula: string;
    total: number;
    allEntries: Array<IFormulaHit>;
    took?: number | undefined;
    triggerSearch: boolean;
    progress: number;
  };
}
interface ITriggersearchaction {
  type: 'TRIGGER_SEARCH';
  payload: {
    triggerSearch: boolean;
    allEntries?: Array<IFormulaHit>;
    progress: number;
    limitmin: number;
  };
}
interface IUpdateprogressaction {
  type: 'UPDATE_PROGRESS';
  payload: {progress: number};
}
interface IShowmoreaction {
  type: 'SHOW_MORE';
  payload: {triggerSearch: boolean; progress: number; input_formula: string};
}
interface IDefaultaction {
  type: 'DEFAULT';
  payload: {};
}
interface IResetaction {
  type: 'RESET';
  payload: {};
}

interface IUpdateanswsizeaction {
  type: 'UPDATE_ANSSWIZE';
  payload: {answsize: number};
}
interface IChangeAggregation {
  type: 'CHANGE_AGGREGATION';
  payload: {aggregation: Taggregation};
}

export type IAction =
  | IUpadateinputtextaction
  | IConvertAction
  | ISearchAction
  | ITriggersearchaction
  | IUpdateprogressaction
  | IDefaultaction
  | IResetaction
  | IShowmoreaction
  | IUpdateanswsizeaction
  | IChangeAggregation;

export interface IStore {
  state: IState;
  dispatch?: React.Dispatch<IAction>;
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
  subterm?: string;
  /** the xpath to subterm in source */
  xpath: string;
  /** Array of the terms of subsitions */
  substituitons?: ISubstitutions;
  /** Query variables xpath */
  queryvariablesxpath: Array<Iqvar>;
  /** the text from the document */
  text: string;
}

export type Taggregation = 'None' | 'Title';
