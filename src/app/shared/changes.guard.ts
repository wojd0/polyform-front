import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { AppState } from "../store/app.reducer";

interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: "root",
})
export class ChangesGuard  {
  constructor(private store: Store<AppState>) {}

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //TODO: it may be enough, but consider changing it to some sorts of a regxp
    if (currentState.url.endsWith("new")) {
      //in creator
      return this.store.select("creator").pipe(
        map((data) => {
          if (data.changes) {
            return confirm("You have unsaved changes! Do you want to leave?");
          }
          return true;
        })
      );
    }

    return true;
  }
}
