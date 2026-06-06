import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenesService, Orden } from '../../services/ordenes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordenes',
  imports: [CommonModule],
  templateUrl: './ordenes.html',
  styleUrl: './ordenes.css',
})
export class Ordenes {

  ordenes: Orden[] = [];

  constructor(private ordenesService: OrdenesService, private router: Router) { }

  ngOnInit() {
    this.ordenes = this.ordenesService.obtenerOrdenes();
  }

  entregar(id: number) {
    this.ordenesService.marcarComoEntregada(id);
  }

  editar(orden: Orden) {

    this.ordenesService.setOrdenEditando(orden);

    this.router.navigate(['/']);
  }
  
  eliminarOrden(id: number) {

    const confirmar = confirm(
      '¿Deseas eliminar esta orden?'
    );

    if (confirmar) {

      this.ordenesService.eliminarOrden(id);

      this.ordenes =
        this.ordenesService.obtenerOrdenes();

    }

  }
}