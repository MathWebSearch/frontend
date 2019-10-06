import {mwsclient, ltxclient} from '../Backend';
import {IFormulaHit, Taggregation} from '../interfaces';
import {IAction} from '../interfaces';
import {errorLog} from '../config';

export function updateInputTextAction(new_text: string): IAction {
  window.history.pushState(null, '', `?query-math=${encodeURI(new_text)}`);
  return {
    type: 'UPDATE_INPUT_TEXT',
    payload: {input_text: new_text, input_formula: null},
  };
}

/**
 * Creates the action to update the previewed formula
 **/
export const convertAction = async (input_text: string) => {
  /* trim the whitespaces at the end of input */
  const clean_text = input_text.replace(/\s*$/g, '');
  let input_formula: string | null = null;
  if ('' !== clean_text) {
    try {
      input_formula = await ltxclient.fetchContent(clean_text);
    } catch (e) {
      /* empty string indicates error for preview */
      input_formula = '';
    }
  } else {
    /* null indicates nothing to preview*/
    input_formula = null;
  }
  return {type: 'CONVERT', payload: {input_formula}};
};

/*
 * Action to search for a fromula
 **/
export const searchAction = async (
  answsize: number,
  input_formula: string,
  limitmin: number = 0,
  currentList: Array<IFormulaHit> = [],
) => {
  if (!input_formula) {
    return {type: 'DEFAULT', payload: {}};
  }
  let payload;
  try {
    const result = await mwsclient.fetchContent(
      input_formula,
      answsize,
      limitmin,
    );
    payload = {
      limitmin: limitmin + answsize,
      current_formula: input_formula,
      total: result.total,
      allEntries: [...currentList, ...result.entries],
      took: result.took,
      triggerSearch: false,
      progress: 66,
    };
  } catch (e) {
    /* In case of an error  */
    errorLog('searchAction failed', e);
    alert('Sorry, but this search failed for some reason');
    return {type: 'RESET', payload: {}};
  }
  let ret: IAction = {type: 'SEARCH', payload};

  return ret;
};

/*
 * Action to trigger an Search action
 **/
export const triggerSearchAction = (): IAction => {
  return {
    type: 'TRIGGER_SEARCH',
    payload: {
      triggerSearch: true,
      allEntries: undefined,
      progress: 20,
      limitmin: 0,
    },
  };
};

/*
 * Action to trigger an Search action that uses the same input_formula as the current state
 * to get the next results
 **/
export const showMoreAction = (current_formula: string): IAction => {
  return {
    type: 'SHOW_MORE',
    payload: {
      triggerSearch: true,
      progress: 20,
      input_formula: current_formula,
    },
  };
};

/*
 * Action to Update the percentage for the Progressbar
 **/
export const updateProgressAction = (new_progress: number): IAction => {
  return {type: 'UPDATE_PROGRESS', payload: {progress: new_progress}};
};

export const updateansizeAction = (newanswsize: number): IAction => {
  return {type: 'UPDATE_ANSSWIZE', payload: {answsize: newanswsize}};
};

export const changeAggregationAction = (aggr: Taggregation): IAction => {
  return {type: 'CHANGE_AGGREGATION', payload: {aggregation: aggr}};
};

export const changeExpandAllAction = (newexapndAll?: boolean): IAction => {
  return {type: 'EXPAND_ALL', payload: {expandAll: newexapndAll}};
};

export const changeTooltipsAction = (newtooltip: boolean): IAction => {
  return {type: 'TOGGLE_TOOLTIP', payload: {tooltips: newtooltip}};
};
