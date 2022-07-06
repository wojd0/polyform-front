import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import Question from 'src/app/shared/question.model';
import * as AuthActions from './creator.actions';

export const creatorFeatureKey = 'creator';

export interface CreatorState {
  url: string,
  errorMsg: string,
  done: boolean
}

export const initialState: CreatorState = {
  url: '',
  done: true,
  errorMsg: ''
};

export const creatorReducer = createReducer(
  initialState,

  on(
    AuthActions.upload,
    (state) => ({
      ...state,
      url: '',
      done: false
    })
  ),

  on(
    AuthActions.uploadSuccess,
    (state, action) => ({
      ...state,
      url: action.url,
      done: true
    })
  ),

  on(
    AuthActions.uploadFailure,
    (state, action) => ({
      ...state,
      done: true,
      errorMsg: action.error,
      url: ''
    })
  ),
  
  on(
    AuthActions.acknowledgeError,
    (state) => ({
      ...state,
      errorMsg: ''
    })
  )
);