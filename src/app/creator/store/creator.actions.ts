import { createAction, props } from '@ngrx/store';
import Question from 'src/app/shared/question.model';

export const CREATOR_UPLOAD = '[Creator] Upload';
export const CREATOR_UPLOAD_SUCCESS = '[Creator] Upload Success';
export const CREATOR_UPLOAD_FAILURE = '[Creator] Upload Failure';
export const CREATOR_UPLOAD_ACKNOWLEDGE = '[Creator] Upload Failure';

export const upload = createAction(
  CREATOR_UPLOAD,
  props<{questions: Question[]}>()
);

export const uploadSuccess = createAction(
  CREATOR_UPLOAD_SUCCESS,
  props<{ url: string }>()
);

export const uploadFailure = createAction(
  CREATOR_UPLOAD_FAILURE,
  props<{ error: string }>()
);

export const acknowledgeError = createAction(
  CREATOR_UPLOAD_ACKNOWLEDGE
)
