import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { BeerService } from "../beer.service";
import { AppState } from "../store/app.reducer";

import * as FormActions from "../form/store/form.actions";
import { Subscription } from "rxjs";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})

export class WelcomeComponent implements OnInit {
showEnterLink = false;
  hello = "";
  id = "";
  storeSub: Subscription;

  error = "";
  errorId = "";

  constructor(private router: Router, private store: Store<AppState>, private beer: BeerService) {}

  ngOnInit(): void {
    this.storeSub = this.store.select("form").subscribe((state) => {
      if (state.errorMsg === "No such form") {
        this.error = state.errorMsg;
        this.errorId = state.errorId;
        this.beer.beerIt("#navError");

        // document
        //   .querySelector("body > app-root > app-welcome > div.overlay.active")
        //   .replaceWith(document.querySelector("body > app-root > app-welcome > div.overlay.active").cloneNode(true));
      }
    });
  }

  goToForm() {
    this.router.navigate(["/f", this.id]);
  }

  onAccknowledge() {
    this.store.dispatch(FormActions.retrieveAcknowledge());
    this.beer.beerIt("#navError");
  }

  showUrlInput() {
    this.showEnterLink = true;
  }
}
