import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap, map, catchError } from "rxjs";
import { FormModel } from "src/app/shared/form.model";
import QuestionModel from "src/app/shared/question.model";
import { environment } from "src/environments/environment";

import * as FormActions from './form.actions';

function handleRetrieveError(errorResponse: any, id: string) {
  let errorMsg = "An error occurred!";  
  
  if (!errorResponse.status || !errorResponse.error.text) {    
    return of(FormActions.retrieveFailure({ error: errorMsg, id: id }));
  }
  //handle different errors
  switch (errorResponse.status) {
    case 200:
      errorMsg = 'No such form';
  }
  return of(FormActions.retrieveFailure({ error: errorMsg, id: id }));
}

@Injectable()
export class FormEffects {
  retrieveForm$ = createEffect(() =>
  this.actions$.pipe(
    ofType(FormActions.retrieveStart),
    switchMap((action) =>
      this.http
        .get<{ form: FormModel; questions: QuestionModel[]; }>(environment.myApi + "form", {
          params: new HttpParams().set("id", action.id),
        })
        .pipe(
          map((resData) => {
            return FormActions.retrieveSuccess({ form: resData.form, questions: resData.questions });
          }),
          catchError((error) => {
            return handleRetrieveError(error, action.id);
          })
        )
    )
  )
);

  constructor(private actions$: Actions, private http: HttpClient) {}
}
