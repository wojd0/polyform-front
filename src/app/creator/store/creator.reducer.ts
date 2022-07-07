import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { FormModel } from 'src/app/shared/form.model';
import Question from 'src/app/shared/question.model';
import * as CreatorActions from './creator.actions';

export const creatorFeatureKey = 'creator';

export interface CreatorState {
  url: string,
  errorMsg: string,
  done: boolean,
  changes: boolean
}

export const initialState: CreatorState = {
  url: '',
  done: true,
  errorMsg: '',
  changes: false
};

export const creatorReducer = createReducer(
  initialState,

  on(
    CreatorActions.uploadStart,
    (state) => ({
      ...state,
      url: '',
      done: false
    })
  ),

  on(
    CreatorActions.uploadSuccess,
    (state, action) => ({
      ...state,
      url: action.url,
      done: true
    })
  ),

  on(
    CreatorActions.uploadFailure,
    (state, action) => ({
      ...state,
      done: true,
      errorMsg: action.error,
      url: ''
    })
  ),
  
  on(
    CreatorActions.uploadAcknowledge,
    (state) => ({
      ...state,
      errorMsg: ''
    })
  ),

  on(
    CreatorActions.changes,
    (state) => ({
      ...state,
      changes: true
    })
  )

);