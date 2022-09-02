import { Action, createReducer, on } from '@ngrx/store';
import { Results } from 'src/app/shared/models/results.model';
import * as ResultsActions from './results.actions';

export const resultsFeatureKey = 'results';

export interface ResultsState {
  error: string;
  results: Results;
  formName: string;
}

export const initialState: ResultsState = {
  error: null,
  results: null,
  formName: null,
};

export const resultsReducer = createReducer(
  initialState,
  on(ResultsActions.loadResults, ()=>({
    ...initialState
  })),
  on(ResultsActions.loadResultsFailure, (state, action)=>({
    ...initialState,
    error: action.error,
  })),
  on(ResultsActions.loadResultsSuccess, (state, action)=>({
    ...state,
    formName: action.data.formName,
    results: action.data
  }))
);
