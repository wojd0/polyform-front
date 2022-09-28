import { createAction, props } from '@ngrx/store';
import { Submission } from 'src/app/shared/models/results.model';
import { FormModel } from 'src/app/shared/models/form.model';
import QuestionModel from 'src/app/shared/models/question.model';

export const FORM_RETRIEVE = '[Form] Retrieve';
export const FORM_RETRIEVE_SUCCESS = '[Form] Retrieve Success';
export const FORM_RETRIEVE_FAILURE = '[Form] Retrieve Failure';
export const FORM_ACKNOWLEDGE = '[Form] Acknowledge';

export const FORM_SEND = '[Form] Send';
export const FORM_SEND_SUCCESS = '[Form] Send Success';
export const FORM_SEND_FAILURE = '[Form] Send Failure';
export const FORM_SEND_ACKNOWLEDGE = '[Form] Send Acknowledge';

export const retrieveStart = createAction(
  FORM_RETRIEVE,
  props<{id: string}>()
);

export const retrieveSuccess = createAction(
  FORM_RETRIEVE_SUCCESS,
  props<{ form: FormModel, questions: QuestionModel[]}>()
);

export const retrieveFailure = createAction(
  FORM_RETRIEVE_FAILURE,
  props<{ error: string, id: string}>()
);

export const acknowledge = createAction(
  FORM_ACKNOWLEDGE
)


export const sendStart = createAction(
  FORM_SEND,
  props<{values: (string | string[])[]}>()
);

export const sendSuccess = createAction(
  FORM_SEND_SUCCESS,
  props<{ response: Submission}>()
);

export const sendFailure = createAction(
  FORM_SEND_FAILURE,
  props<{ error: string}>()
);