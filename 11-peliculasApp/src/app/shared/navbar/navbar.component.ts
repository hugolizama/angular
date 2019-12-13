import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {  }

  ngOnInit() {
  }

  buscar(texto: string) {
    this.router.navigateByUrl(`/buscar/${texto}`);
  }
}
