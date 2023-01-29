import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs";
import { BeerService } from "../../beer.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  activeTheme: {
    boxColor: any;
    backgroundColor: any;
    highlightColor: any;
    textColor: any;
  };
  isHome: any;

  constructor(private beerService: BeerService, private router: Router) {
  }
  
  ngOnInit() {
    this.isHome = this.router.events.pipe(filter(event => event instanceof NavigationEnd), map((event: NavigationEnd) => event.url === '/'));
    this.beerService.beerPage();

    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }

    this.checkTheme();

  }

  checkTheme() {
    this.beerService.changeTheme(localStorage.getItem('theme'))


  }

  switchTheme() {
    if (localStorage.getItem("theme") === "light") {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }

    this.checkTheme();
  }
}
