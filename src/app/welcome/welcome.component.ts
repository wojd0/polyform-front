import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeerService } from '../beer.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  showEnterLink = false;
  hello = '';
  constructor(private router: Router, private http: HttpClient){}

  ngOnInit(): void {
  }

  goToForm(){
    console.log("works");
    this.router.navigate(['/f/test']);
  }
  
  showUrlInput(){
    this.showEnterLink = true;
  }
}
