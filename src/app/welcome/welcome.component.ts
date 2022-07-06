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
    const response =this.http.get(`http://127.0.0.1:4000/form?id=${'19WQVEG5SZ2K'}`);
    response.subscribe(result => {
      console.log(result);
      
    })
  }

  goToForm(){
    console.log("works");
    this.router.navigate(['/f/test']);
  }
  
  showUrlInput(){
    this.showEnterLink = true;
  }
}
