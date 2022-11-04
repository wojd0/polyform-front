import { createAction, props } from '@ngrx/store';
import QuestionModel from 'src/app/shared/models/question.model';
import Question from 'src/app/shared/models/question.model';

export const CREATOR_UPLOAD = '[Creator] Upload';
export const CREATOR_UPLOAD_SUCCESS = '[Creator] Upload Success';
export const CREATOR_UPLOAD_FAILURE = '[Creator] Upload Failure';
export const CREATOR_UPLOAD_ACKNOWLEDGE = '[Creator] Upload Acknwoledge';
export const CREATOR_CHANGES = '[Creator] Changes';

export const uploadStart = createAction(
  CREATOR_UPLOAD,
  props<{questions: Question<any, any>[], name: string}>()
);

export const uploadSuccess = createAction(
  CREATOR_UPLOAD_SUCCESS,
  props<{ url: string, accessCode: string }>()
);

export const uploadFailure = createAction(
  CREATOR_UPLOAD_FAILURE,
  props<{ error: string }>()
);

export const uploadAcknowledge = createAction(
  CREATOR_UPLOAD_ACKNOWLEDGE
)

export const changes = createAction(
  CREATOR_CHANGES
)
