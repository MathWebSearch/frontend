export interface resultListContent {
  total: number;
  allEntries: Array<IFormulaHit>;
}

export interface IState {
  input_text: string | null;
  input_formula: string | null;
  allEntries?: Array<IFormulaHit>;
  total: number;
  limitmin: number;
  answsize: number;
  last_took?: number;
  triggerSearch: bool;
  progress: number;
}

export interface IAction {
  type:
    | 'UPDATE_INPUT_TEXT'
    | 'CONVERT'
    | 'SEARCH'
    | 'TRIGGER_SEARCH'
    | 'UPDATE_PROGRESS'
    | 'SHOW_MORE'
    | 'DEFAULT'
    | 'RESET';
  payload: {
    limitmin?: number;
    input_formula?: string | null;
    input_text?: string;
    total?: number;
    took?: number;
    allEntries?: Array<IFormulaHit>;
    triggerSearch?: bool;
    progress?: number;
  };
}

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
