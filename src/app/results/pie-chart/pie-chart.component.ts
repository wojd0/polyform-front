import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import {
  Color,
  ColorHelper,
  colorSets,
  LegendPosition,
  ScaleType,
} from "@swimlane/ngx-charts";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"],
})
export class PieChartComponent implements OnChanges {
  constructor() {}
  
  scheme: 'vivid'|'natural'|'cool'|'fire'|'solar'|'air'|'aqua'|'flame'|'ocean'|'forest'|'horizon'|'neons'|'picnic'|'night'|'nightLights' = 'forest';
  domain: Color = colorSets[this.scheme];

  ngOnChanges() {
    console.log(this.results);
    
    if(this.results){      
      this.names = this.results.map((result) => {
        return result.name;
      });
      this.colors = new ColorHelper(
        this.scheme,
        ScaleType.Ordinal,
        [],
        null
      );
      this.show = true;
    }else{
      this.show = false;
    }

  }

  @Input("results") results: { name: string; value: any }[];
  show = false;

  names: string[];
  colors: ColorHelper;

  pos = LegendPosition.Right;
}
