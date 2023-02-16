import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../shared/shared.module';
import { AnswersListComponent } from './answers-list/answers-list.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ResultsComponent } from './results.component';


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
