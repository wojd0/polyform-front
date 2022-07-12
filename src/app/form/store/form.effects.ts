import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap, map, catchError } from "rxjs";
import { FormModel } from "src/app/shared/form.model";
import QuestionModel from "src/app/shared/question.model";
import { environment } from "src/environments/environment";

import * as FormActions from './form.actions';

function handleRetrieveError(errorResponse: any) {
  let errorMsg = "An error occurred!";
    
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(FormActions.retrieveFailure({ error: errorMsg }));
  }
  //handle different errors
  switch (errorResponse) {
  }
  return of(FormActions.retrieveFailure({ error: errorMsg }));
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
            return handleRetrieveError(error);
          })
        )
    )
  )
);

  constructor(private actions$: Actions, private http: HttpClient) {}
}
