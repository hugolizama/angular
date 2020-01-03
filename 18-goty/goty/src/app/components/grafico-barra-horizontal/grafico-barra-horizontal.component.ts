import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styles: []
})
export class GraficoBarraHorizontalComponent implements OnInit {

  results: any[] = [
    {
      'name': 'Juego 1',
      'value': 20
    },
    {
      'name': 'Juego 2',
      'value': 30
    },
    {
      'name': 'Juego 3',
      'value': 15
    },
    {
      'name': 'Juego 4',
      'value': 35
    }
  ];


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

  constructor() { 
  }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }
}
