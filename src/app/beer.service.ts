import { Injectable } from "@angular/core";

declare function ui(value?: any): any;

@Injectable({
  providedIn: "root",
})
export class BeerService {
    beerPage(){
        ui()
    }

    beerIt(val: string){
      ui(val)
    }
}
