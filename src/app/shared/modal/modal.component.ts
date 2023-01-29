import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BeerService } from "src/app/beer.service";
import { sendSuccess } from "src/app/submission/store/form.actions";
import { AppState } from "src/app/app.reducer";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent{
  constructor(private beer: BeerService, private router: Router) {}

  modalSubject = this.beer.modal;
  returnToMain() {
    this.beer.modal.next(null);
    this.router.navigate(["/"]);
  }

}
