import { Component, OnInit, OnDestroy, Input } from '@angular/core';


@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styles: []
})
export class GraficoBarraHorizontalComponent implements OnInit, OnDestroy {

  // results: any[] = [
  //   {
  //     'name': 'Juego 1',
  //     'value': 20
  //   },
  //   {
  //     'name': 'Juego 2',
  //     'value': 30
  //   },
  //   {
  //     'name': 'Juego 3',
  //     'value': 15
  //   },
  //   {
  //     'name': 'Juego 4',
  //     'value': 35
  //   }
  // ];

  @Input() results: any[] = [];


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme = 'nightLights';

  intervalo: any;

  constructor() {
    // this.intervalo = setInterval(() => {
    //   console.log('tick');

    //   const newResults = [...this.results];

    //   // tslint:disable-next-line: forin
    //   for (const i in newResults) {
    //     newResults[i].value = Math.round(Math.random() * 100);
    //   }

    //   this.results = [...newResults];
    // }, 1500);

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // clearInterval(this.intervalo);
  }

  onSelect(event) {
    console.log(event);
  }
}
