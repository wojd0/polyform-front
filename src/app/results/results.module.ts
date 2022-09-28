import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { RouterModule } from '@angular/router';
import { AnswersListComponent } from './answers-list/answers-list.component';
import { SharedModule } from '../shared/shared.module';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    ResultsComponent,
    AnswersListComponent,
    PieChartComponent,
    
    
  ],
  imports: [
    SharedModule,
    NgxChartsModule,
    RouterModule.forChild([{path: '', component: ResultsComponent}])
  ]
})
export class ResultsModule { }
