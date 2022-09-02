import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

declare function ui(value?: any): any;

@Injectable({
  providedIn: "root",
})
export class BeerService {
    beerPage(){
        ui()
    }


    showModal = new BehaviorSubject<{
      type: string,
      content: any
    } | null>(null);

    beerIt(val: string){
      //remove event listener from modal, so losing focus wont hide it
      ui(val)
      document.querySelector("body > app-root > app-modal > div.overlay")
      .replaceWith(document.querySelector("body > app-root > app-modal > div.overlay").cloneNode(true));
    }
}
