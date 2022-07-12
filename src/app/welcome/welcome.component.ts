import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
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

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {}

  goToForm() {
    this.store.dispatch(FormActions.retrieveStart({ id: this.id }));
    this.storeSub = this.store.select('form').subscribe(state => {
      if(state.done){
        this.router.navigate(['/f', this.id]);
      }
    })
  }

  showUrlInput() {
    this.showEnterLink = true;
  }
}
