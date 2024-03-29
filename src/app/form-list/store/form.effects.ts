import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of, switchMap, map, catchError, withLatestFrom } from "rxjs";
import { FormModel } from "src/app/shared/models/form.model";
import QuestionModel from "src/app/shared/models/question.model";
import { Submission } from "src/app/shared/models/results.model";
import { AppState } from "src/app/store/app.reducer";
import { environment } from "src/environments/environment";

import * as FormActions from "./form.actions";

function handleRetrieveError(errorResponse: any, id: string) {
  let errorMsg = "An error occurred!";

  if (!errorResponse.status || !errorResponse.error.text) {
    return of(FormActions.retrieveFailure({ error: errorMsg, id: id }));
  }
  //handle different errors
  switch (errorResponse.status) {
    case 200:
      errorMsg = "No such form";
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
          .get<{ form: FormModel; questions: QuestionModel[] }>(`${environment.myApi}form`, {
            params: new HttpParams().set("id", action.id),
          })
          .pipe(
            map((resData) => {
              if(!resData.form || !resData.questions) throw 'No such form!';
              return FormActions.retrieveSuccess({ form: resData.form, questions: resData.questions });
            }),
            catchError((error) => {
              return handleRetrieveError(error, action.id);
            })
          )
      )
    )
  );

  sendResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormActions.sendStart),
      withLatestFrom(this.store$.select("form").pipe(map((state) => (state.form ? state.form.id : null)))),
      switchMap(([action, formId]) =>
        this.http
          .post<string | Submission>(`${environment.myApi}answers`, {
            formId: formId,
            answers: {answers: action.values, submitDate: new Date()},
          })
          .pipe(
            map((res) => {
              if (typeof res === "string") throw res;
              return FormActions.sendSuccess({ response: res });
            }),
            catchError((err) => {
              return of(FormActions.sendFailure({ error: err }));
            })
          )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient, private store$: Store<AppState>) {}
}
