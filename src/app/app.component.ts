import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable, catchError, concat, concatMap, delay, map, mergeMap, of, retry, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { BeerService } from "./beer.service";
import { TreeMapModule } from "@swimlane/ngx-charts";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "polyform-front";
  testConectivity: Observable<boolean>;
  constructor(private beerService: BeerService, private http: HttpClient) {}

  ngOnInit() {
    this.beerService.beerPage();
    this.testConectivity = this.http
      .get(environment.myApi, {
        responseType: "text",
        
      })
      .pipe(
        retry(3),
        catchError((err) => {
          this.onDowntime();
          return of(false);
        }),
        map(() => true),
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
