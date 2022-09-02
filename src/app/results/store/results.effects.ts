import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Results } from '../../shared/models/results.model';
import { loadResults, loadResultsFailure, loadResultsSuccess } from './results.actions';



@Injectable()
export class ResultsEffects {
  fetchResults$ = createEffect(() => this.actions$.pipe(
    ofType(loadResults),
    switchMap((action) => {      
      return this.http.get<string | Results>(environment.myApi+'answers', {params: {
        code: action.accessCode
      }}).pipe(
        map(results => {          
          if(typeof results === 'string') throw results;
          return loadResultsSuccess({data: results});
        }),
        catchError((err: HttpErrorResponse) => {
          switch(err.status){
            case 400:
              return of(loadResultsFailure({error: 'Invalid results access code'}))
            default:
              return of(loadResultsFailure({error: err}))
          }
          
        })
      )
    }),
  ))

  constructor(private actions$: Actions, private http: HttpClient) {}
}
