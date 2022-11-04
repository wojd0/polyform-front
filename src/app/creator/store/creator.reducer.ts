import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import Question from 'src/app/shared/models/question.model';
import * as CreatorActions from './creator.actions';

export const creatorFeatureKey = 'creator';

export interface CreatorState {
  url: string;
  errorMsg: string;
  done: boolean;
  changes: boolean;
  accessCode: string;
}

export const initialState: CreatorState = {
  url: '',
  accessCode: '',
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
      accessCode: '',
      done: false
    })
  ),

  on(
    CreatorActions.uploadSuccess,
    (state, action) => ({
      ...state,
      url: action.url,
      accessCode: action.accessCode,
      done: true,
      changes: false
    })
  ),

  on(
    CreatorActions.uploadFailure,
    (state, action) => ({
      ...state,
      done: true,
      errorMsg: action.error,
      url: '',
      accessCode: ''
    })
  ),
  
  on(
    CreatorActions.uploadAcknowledge,
    (state) => ({
      ...state,
      errorMsg: '',
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