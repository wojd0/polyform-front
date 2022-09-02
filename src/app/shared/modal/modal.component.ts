import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map } from "rxjs";
import { BeerService } from "src/app/beer.service";
import { sendSuccess } from "src/app/form/store/form.actions";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
  constructor(private beer: BeerService, private router: Router) {}

  show = this.beer.showModal;

  returnToMain() {
    this.beer.showModal.next(null);
    this.router.navigate(["/"]);
  }

}
