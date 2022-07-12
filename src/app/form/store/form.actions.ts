import { createAction, props } from '@ngrx/store';
import { FormModel } from 'src/app/shared/form.model';
import QuestionModel from 'src/app/shared/question.model';

export const CREATOR_RETRIEVE = '[Creator] Retrieve';
export const CREATOR_RETRIEVE_SUCCESS = '[Creator] Retrieve Success';
export const CREATOR_RETRIEVE_FAILURE = '[Creator] Retrieve Failure';
export const CREATOR_RETRIEVE_ACKNOWLEDGE = '[Creator] Retrieve Acknowledge';

export const retrieveStart = createAction(
  CREATOR_RETRIEVE,
  props<{id: string}>()
);

export const retrieveSuccess = createAction(
  CREATOR_RETRIEVE_SUCCESS,
  props<{ form: FormModel, questions: QuestionModel[]}>()
);

export const retrieveFailure = createAction(
  CREATOR_RETRIEVE_FAILURE,
  props<{ error: string, id: string}>()
);

export const retrieveAcknowledge = createAction(
  CREATOR_RETRIEVE_ACKNOWLEDGE
)