import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma: FormGroup;

  usuario: any = {
    nombrecompleto: {
      nombre: 'Alberto',
      apellido: 'Cárdenas'
    },
    correo: 'alberto@alb.com',
    pasatiempos: ['Correr', 'Dormir', 'Comer']
  };

  constructor() {

      console.log(this.usuario);

      // this.forma = new FormGroup({
      //   'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      //   'apellido': new FormControl('', Validators.required),
      //   'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])
      // });

      this.forma = new FormGroup({
        nombrecompleto: new FormGroup({
          nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
          apellido: new FormControl('', [Validators.required, this.noCardenas]),
        }),
        correo: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
        pasatiempos: new FormArray([
          new FormControl('Correr', Validators.required)
        ]),
        username: new FormControl('', Validators.required, this.existeUsuario),
        password1: new FormControl('', Validators.required),
        password2: new FormControl()
      });

      // this.forma.setValue(this.usuario);
      this.forma.controls['password2'].setValidators([
        Validators.required,
        this.noIgual.bind(this.forma)
      ]);


      this.forma.controls['username'].valueChanges.subscribe( data => {
        console.log('A',data);
      });

      this.forma.controls['username'].statusChanges.subscribe( data => {
        console.log('B', data);
      });
   }

  ngOnInit() {
  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  // Esto mejor en un fichero separado
  noCardenas( control: FormControl ): { [s: string]: boolean } {
    if (control.value === 'cardenas') {
      return {
        nocardenas: true
      }
    }

    return null;
  }

  noIgual( control: FormControl ): { [s: string]: boolean } {
    // Le pasamos por bind tl this.forma
    const forma: any = this;
    // control.value seria password2 y
    if (control.value !== forma.controls['password1'].value) {
      return {
        noiguales: true
      }
    }

    return null;
  }

  existeUsuario( control: FormControl ): Promise<any> | Observable<any> {
    let promesa = new Promise(
      (resolve, reject) => {
        setTimeout( () => {
          if (control.value === 'strider') {
            resolve( {existe: true} );
          } else {
            resolve( null );
          }
        }, 3000);
      }
    );
    return promesa;
  }


  guardarCambios() {
    console.log(this.forma);
    // this.forma.reset({
    //   nombrecompleto: {
    //     nombre: '',
    //     apellido: ''
    //   },
    //   correo: ''
    // });
  }

}
