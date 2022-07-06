import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, tap, map, switchMap, of } from 'rxjs';

import * as CreatorActions from './creator.actions';

function handleUpload(resData: string){
  return CreatorActions.uploadSuccess({url: resData});
}

function handleError(errorResponse: any){
  let errorMsg = 'An error occurred!';
  if(!errorResponse.error || !errorResponse.error.error){
    return of()
  }
  switch(errorResponse){
    //handle different errors
  }
  return of(CreatorActions.uploadFailure({error: errorMsg}));
}

@Injectable()
export class CreatorEffects {

  uploadForm$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CreatorActions.upload),
      switchMap(action => {
        
        return this.http.put<{message: string}>('http://localhost:1500', {
          questions: action.questions
        }).pipe(
          map(resData => {
            return handleUpload(resData.message)
          }),
          catchError(errorRes => {
            return handleError(errorRes)
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private http: HttpClient) {}
}
