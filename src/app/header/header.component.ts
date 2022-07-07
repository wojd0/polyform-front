import { Component, OnInit } from '@angular/core';
import { BeerService } from '../beer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private beerService: BeerService){}
  ngOnInit(){
    this.beerService.beerPage();
  }

  switchTheme(){
    //TODO: make dark theme work
  }
}
