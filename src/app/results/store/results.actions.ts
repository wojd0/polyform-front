import { createAction, props } from '@ngrx/store';
import { Results } from 'src/app/shared/models/results.model';

export const loadResults = createAction(
  '[Results] Load Results',
  props<{ accessCode: string}>()
);

export const loadResultsSuccess = createAction(
  '[Results] Load Resultss Succes',
  props<{ data: Results }>()
);

export const loadResultsFailure = createAction(
  '[Results] Load Resultss Failure',
  props<{ error: any }>()
);
