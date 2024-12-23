import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NumberQuestion } from 'src/app/shared/models/question.model';

//TODO: handle precision (float answers)
@Component({
    selector: 'creator-number',
    templateUrl: './creator-number.component.html',
    standalone: false
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
      this.value.emit({
        max: this.max,
        min: this.min,
        prefix: this.prefix,
        suffix: this.suffix
      });
    })
  }

  
}
