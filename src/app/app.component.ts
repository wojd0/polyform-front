import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { catchError, map, of } from "rxjs";
import { environment } from "src/environments/environment";
import { BeerService } from "./beer.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "polyform-front";
  constructor(private beerService: BeerService, private http: HttpClient) {}
  ngOnInit() {
    this.beerService.beerPage();
    this.testConectivity();
  }

  onDowntime() {
    console.log("error");
    this.beerService.modal.next({
      type: "general",
      content: {
        msg: "There was a problem with server connection",
        sub: "The website is on a downtime - please try again later :)",
        redirect: false,
      },
    });
  }

  testConectivity() {
    this.http
      .get<string>(environment.myApi)
      .pipe(
        catchError((err) => {
          if (err.status !== 200) {
            return of(this.onDowntime());
          }
          return of(null);
        })
      )
      .subscribe();
  }
}
