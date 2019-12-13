import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;

  usuario: Object = {
    nombreCompleto: {
      nombre: 'alexander',
      apellido: 'mejia'
    },
    correo: 'hugo@localhost.com',
    // pasatiempos: [ 'correr', 'dormir', 'comer' ]
  };

  constructor() {
    console.log(this.usuario);

    this.forma = new FormGroup({

      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('', [
          Validators.required,
          Validators.minLength(4)
        ]),
        'apellido': new FormControl('', [
          Validators.required,
          this.noLizama
        ])
      }),
      'correo': new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      'pasatiempos': new FormArray([
        new FormControl('correr', Validators.required)
      ]),
      'password1': new FormControl('', [Validators.required]),
      'password2': new FormControl(),
      'username': new FormControl('', Validators.required, this.existeUsuario)
    });

    // this.forma.setValue(this.usuario);

    /** establecer validador a un control */
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.compararContrasena.bind(this.forma)
    ]);


    /** detectar cambios en el formulario */
    this.forma.controls['username'].valueChanges.subscribe(
      data => {
        console.log('valueChanges', data);
      }
    );


    this.forma.controls['username'].statusChanges.subscribe(
      data => {
        console.log('statusChanges', data);
      }
    );
  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);
  }

  resetFormulario() {
    this.forma.reset(this.usuario);
  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  /** validacion personalizada */
  noLizama(control: FormControl): { [s: string]: boolean} {
    if (control.value === 'lizama') {
      return {
        noLizama: true
      };
    }

    return null;
  }


  compararContrasena(control: FormControl): { [s: string]: boolean } {

    const forma: any = this;

    if (control.value !== forma.controls['password1'].value) {
      return {
        compararContrasena: true
      };
    }

    return null;
  }



  existeUsuario(control: FormControl): Promise<any>|Observable<any> {
    const promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'hugo') {
            resolve({ existeUsuario: true });
          } else {
            resolve(null);
          }
        }, 3000);
      }
    );

    return promesa;
  }
}
