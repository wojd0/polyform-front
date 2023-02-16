import {
    Component,
    Input,
    OnChanges
} from "@angular/core";
import {
    Color,
    ColorHelper,
    colorSets,
    LegendPosition,
    ScaleType
} from "@swimlane/ngx-charts";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"],
  
})
export class PieChartComponent implements OnChanges {
  constructor() {}
  
  scheme: 'vivid'|'natural'|'cool'|'fire'|'solar'|'air'|'aqua'|'flame'|'ocean'|'forest'|'horizon'|'neons'|'picnic'|'night'|'nightLights' = 'forest';  domain: Color = colorSets.find(cs => cs.name === this.scheme);
  @Input("results") results: { name: string; value: any; }[];
  show = false;
  totalCount: number = 1;
  names: string[];
  colors: ColorHelper;
  
  pos = LegendPosition.Right;
  
  ngOnChanges() {    
    if(this.results){
      this.results = this.results.sort((a,b) => b.value - a.value)
      this.names = this.results.map((result) => {
        return result.name;
      });
      this.colors = new ColorHelper(
        this.scheme,
        ScaleType.Ordinal,
        [],
        null
      );
      this.totalCount = this.results.length;

      this.show = true;
      
    }else{
      this.show = false;
    }

  }

  calculatePercent(val: number){
    return +(val / this.totalCount).toPrecision(2)*100+'%';
  }

}
