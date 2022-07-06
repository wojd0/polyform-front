import { Component, OnInit } from '@angular/core';
import { BeerService } from './beer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'polyform-front';
  constructor(private beerService: BeerService){}
  ngOnInit(){
    this.beerService.beerIt();
  }
}
