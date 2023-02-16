import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

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

declare function ui(value?: any, value2?: any): any;

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

  async changeTheme(theme: string){
    await ui('theme', '#006a5f');
    ui('mode', theme);
    // document.body.style.setProperty('--body', theme === 'light' ? '#c2c2c2' : '#1c1c1c');
  }
}
