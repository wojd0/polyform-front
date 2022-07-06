import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NumberQuestion } from 'src/app/shared/question.model';

//TODO: handle precision (float answers)
@Component({
  selector: 'creator-number',
  templateUrl: './creator-number.component.html'
})
export class NumberCreatorComponent implements AfterViewInit {
  @Output('changed') value = new EventEmitter<NumberQuestion>();
  @ViewChild('form') form !: NgForm;

  min = 0;
  max = 100;
  prefix = '';
  suffix = '';

  constructor() { }

  ngAfterViewInit(): void {
    this.form.valueChanges?.subscribe(val=>{
      this.value.emit(val);
    })
  }

  
}
