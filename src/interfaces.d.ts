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
    | 'DEFAULT';
  payload: {
    limitmin?: number;
    input_formula?: string | null;
    input_text?: string;
    total?: number;
    took?: number;
    allEntries?: Array<IFormulaHit>;
    triggerSearch?: bool;
    progress?: number,
  };
}

export interface IStore {
  state: IState;
  dispatch?: React.Dispatch<IAction>;
}
