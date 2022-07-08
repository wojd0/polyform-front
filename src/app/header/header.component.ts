import { Component, OnInit } from "@angular/core";
import { BeerService } from "../beer.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  //light         dark
  backgroundColor: "#ffffff" | "#1c1b1f";
  highlightColor: "#006a5f" | "#78dc77";
  

  constructor(private beerService: BeerService) {}
  ngOnInit() {
    this.beerService.beerPage();

    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }

    this.checkTheme();
  }

  checkTheme() {
    const rootEl: HTMLElement = document.querySelector(':root');

    if (localStorage.getItem("theme") == "light") {
      this.backgroundColor = "#ffffff";
      this.highlightColor = "#006a5f";
    } else {
      this.backgroundColor = "#1c1b1f";
      this.highlightColor = "#78dc77";
    }

    rootEl.style.setProperty('--primary', this.highlightColor);
    rootEl.style.setProperty('--background', this.backgroundColor);
  }

  switchTheme() {
    console.log('switch');
    
    if (localStorage.getItem("theme") === "light") {
      localStorage.setItem("theme", "dark");
    }else{
      localStorage.setItem("theme", "light");
    }

    this.checkTheme();
  }
}
