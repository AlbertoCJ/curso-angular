import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styleUrls: ['./heroe-tarjeta.component.css']
})
export class HeroeTarjetaComponent implements OnInit {

  @Input() heroe: any = {};
  @Input() idx: number;

  @Output() herroSeleccionado: EventEmitter<number>;

  constructor( private _router:Router ) { 
    this.herroSeleccionado = new EventEmitter();
  }

  ngOnInit() {
  }

  verHeroe() {
    this._router.navigate(['/heroe', this.idx]);
    // this.herroSeleccionado.emit(this.idx);
  }

}
