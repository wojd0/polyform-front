import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { catchError, map, Observable, of, timeout } from "rxjs";
import { environment } from "src/environments/environment";
import { BeerService } from "./beer.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "polyform-front";
  connected: Observable<boolean>;

  errorMessage = ''
  constructor(private beerService: BeerService, private http: HttpClient) {}

  ngOnInit() {
    this.beerService.beerPage();
    this.connected = this.http
      .get(environment.myApi, {
        responseType: "text",
      })
      .pipe(
        timeout(2400),
        map(() => true),
        catchError((err) => {
          this.errorMessage = 'Failed to establish a connection to the server. Try again later!'
          return of(false);
        }),
      );
  }

  onDowntime() {
    this.beerService.modal.next({
      type: "general",
      content: {
        msg: "There was a problem with server connection",
        sub: "The website is on a downtime - please try again later :)",
        redirect: false,
      },
    });
  }
}
