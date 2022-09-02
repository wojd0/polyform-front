import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { RouterModule } from '@angular/router';
import { AnswersListComponent } from './answers-list/answers-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ResultsComponent,
    AnswersListComponent,
    
    
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: ResultsComponent}])
  ]
})
export class ResultsModule { }
