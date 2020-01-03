import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styles: []
})
export class VirtualComponent implements OnInit {

  personas = Array(500).fill(0);

  constructor() { }

  ngOnInit() {
  }

}
