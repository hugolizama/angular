import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList, null) lista: IonList;
  @Input() terminada = true;

  listaPendientes: Lista[];

  constructor(public deseosService: DeseosService,
              private router: Router,
              public alertCtrl: AlertController) {
    this.listaPendientes = deseosService.getListasPendientes();
  }

  ngOnInit() {}

  listaSeleccionada(lista: Lista) {

    const listaId = lista.id;

    if (!this.terminada) {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${listaId}`);
    }

  }

  async editarLista(lista: Lista) {
    // console.log(lista);

    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
          value: lista.titulo
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            } else {
              // editar lista
              lista.titulo = data.titulo;
              this.deseosService.guardarStorage();
              this.lista.closeSlidingItems();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
    this.listaPendientes = this.deseosService.getListasPendientes();
  }
}
