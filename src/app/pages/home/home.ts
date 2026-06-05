import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdenesService } from '../../services/ordenes';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  cliente = '';

  miniHamburguesas = 0;
  miniPerros = 0;
  miniArepas = 0;

  papasPequenas = 0;
  papasGrandes = 0;

  gaseosa250 = 0;
  gaseosa500 = 0;

  aumentar(campo: keyof Home) {
    (this[campo] as number)++;
  }

  disminuir(campo: keyof Home) {
    if ((this[campo] as number) > 0) {
      (this[campo] as number)--;
    }
  }

  confirmarPedido() {

    const orden = {
      id: Date.now(),
      cliente: this.cliente,

      miniHamburguesas: this.miniHamburguesas,
      miniPerros: this.miniPerros,
      miniArepas: this.miniArepas,

      papasPequenas: this.papasPequenas,
      papasGrandes: this.papasGrandes,

      gaseosa250: this.gaseosa250,
      gaseosa500: this.gaseosa500,

      fecha: new Date()
    };

    this.ordenesService.agregarOrden(orden);

    this.router.navigate(['/ordenes']);
  }

  constructor(
    private ordenesService: OrdenesService,
    private router: Router
  ) { }
}