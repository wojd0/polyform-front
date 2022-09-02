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
  showFillBox = false;
  showAnswerBox = false;
  hello = "";
  formId = "";
  answerId = "";
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
      }
    });
  }

  goToForm() {
    this.router.navigate(["/f", this.formId]);
  }

  goToResults() {
    this.router.navigate(["/r", this.answerId]);
  }

  onAccknowledge() {
    this.store.dispatch(FormActions.acknowledge());
    this.beer.beerIt("#navError");
  }
}
