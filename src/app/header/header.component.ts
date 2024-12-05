import { Component, OnInit } from "@angular/core";
import { BeerService } from "../beer.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    standalone: false
})
export class HeaderComponent implements OnInit {
  //light/dark
  darkTheme = {
    backgroundColor: "#1c1b1f",
    highlightColor: "#78dc77",
    textColor: "#ffffff",
    boxColor: "#424840",
  };
  lightTheme = {
    boxColor: "#dbe5e2",
    backgroundColor: "#ffffff",
    highlightColor: "#006a5f",
    textColor: "#191c1b",
  };

  activeTheme: {
    boxColor: any;
    backgroundColor: any;
    highlightColor: any;
    textColor: any;
  };

  constructor(private beerService: BeerService) {}
  ngOnInit() {
    this.beerService.beerPage();

    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }

    this.checkTheme();
  }

  checkTheme() {
    const rootEl: HTMLElement = document.querySelector(":root");

    if (localStorage.getItem("theme") == "light") {
      this.activeTheme = this.lightTheme;
    } else {
      this.activeTheme = this.darkTheme;
    }

    rootEl.style.setProperty("--primary", this.activeTheme.highlightColor);
    rootEl.style.setProperty("--background", this.activeTheme.backgroundColor);
    rootEl.style.setProperty("--on-background", this.activeTheme.textColor);
    rootEl.style.setProperty("--on-surface-variant", this.activeTheme.textColor);
    rootEl.style.setProperty("--on-background", this.activeTheme.textColor);
    rootEl.style.setProperty("--surface-variant", this.activeTheme.boxColor);
    rootEl.style.setProperty("-internal-light-dark", this.activeTheme.boxColor);
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
