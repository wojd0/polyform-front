import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

export interface modalCreated {
  type: "created";
  content: {
    url: string;
    id: string;
    accessCode: string;
  };
}

export interface modalMessage {
  type: "general";
  content: {
    msg: string;
    sub?: string;
    redirect: boolean;
  };
}

declare function ui(value?: any): any;

@Injectable({
  providedIn: "root",
})
export class BeerService {
  constructor(){}

  beerPage() {
    ui();
  }

  modal = new BehaviorSubject<modalCreated | modalMessage | null>(null);

  beerIt(val: string) {
    //remove event listener from modal, so losing focus wont hide it
    ui(val);
    document.querySelector("body > app-root > app-modal > div.overlay").replaceWith(document.querySelector("body > app-root > app-modal > div.overlay").cloneNode(true));
  }
}
