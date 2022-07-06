import { Injectable } from "@angular/core";

declare function ui(): any;

@Injectable({
  providedIn: "root",
})
export class BeerService {
    beerIt(){
        ui()
    }
}
