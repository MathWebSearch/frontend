import {mwsclient, ltxclient} from '../Backend';
import {IFormulaHit} from '../Backend/client';
import {IAction} from '../interfaces';

export function updateInputTextAction(new_text: string): IAction {
  window.history.pushState(null, '', `?query-math=${encodeURI(new_text)}`);
  return {
    type: 'UPDATE_INPUT_TEXT',
    payload: {input_text: new_text, input_formula: null},
  };
}

export const convertAction = (dispatch: any) => async (input_text: string) => {
  const clean_text = input_text.replace(/\s*$/g, '');
  let input_formula: string | null = '';
  if ('' !== clean_text) {
    try {
      input_formula = await ltxclient.fetchContent(clean_text);
    } catch (e) {
      input_formula = '';
    }
  } else {
    input_formula = null;
  }
  return dispatch({type: 'CONVERT', payload: {input_formula}});
};

export const searchAction = (dispatch: any) => async (
  answsize: number,
  input_formula: string,
  limitmin: number = 0,
  currentList: Array<IFormulaHit> = [],
) => {
  if (!input_formula) {
    return dispatch({type: 'DEFAULT', payload: {}});
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
      total: result.total,
      allEntries: [...currentList, ...result.entries],
      took: result.took,
      triggerSearch: false,
      progress: 66,
    };
  } catch (e) {
    console.error('searchAction failed', e);
    return dispatch({type: 'DEFAULT', payload: null});
  }
  let ret: IAction = {type: 'SEARCH', payload};

  return dispatch(ret);
};

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

export const showMoreAction = (): IAction => {
  return {
    type: 'SHOW_MORE',
    payload: {triggerSearch: true, progress: 20},
  };
};

export const updateProgressAction = (new_progress: number): IAction => {
  return {type: 'UPDATE_PROGRESS', payload: {progress: new_progress}};
};
