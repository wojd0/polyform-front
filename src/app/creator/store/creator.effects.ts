import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, of } from "rxjs";
import { environment } from "src/environments/environment";

import * as CreatorActions from "./creator.actions";

function handleUpload(resData: { formId: string; formUrl: string; accessCode: string }) {
  return CreatorActions.uploadSuccess({ url: resData.formUrl, accessCode: resData.accessCode });
}

function handleUploadError(errorResponse: any) {
  let errorMsg = "An error occurred!";
  if (!errorResponse.error || !errorResponse.error.error) {
    return of();
  }
  //handle different errors
  switch (errorResponse) {
  }
  return of(CreatorActions.uploadFailure({ error: errorMsg }));
}

@Injectable()
export class CreatorEffects {
  uploadForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreatorActions.uploadStart),
      switchMap((action) => {
        return this.http
          .put<{ formId: string; formUrl: string; accessCode: string }>(environment.myApi + "form", {
            questions: action.questions,
            formData: {
              username: "dummy",
              options: {
                name: action.name
              },
            },
          })
          .pipe(
            map((resData) => {
              return handleUpload(resData);
            }),
            catchError((errorRes) => {
              return handleUploadError(errorRes);
            })
          );
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
