import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenesService, Orden } from '../../services/ordenes';

@Component({
  selector: 'app-ordenes',
  imports: [CommonModule],
  templateUrl: './ordenes.html',
  styleUrl: './ordenes.css',
})
export class Ordenes {

  ordenes: Orden[] = [];

  constructor(private ordenesService: OrdenesService) { }

  ngOnInit() {
    this.ordenes = this.ordenesService.obtenerOrdenes();
  }

  limpiarTodo() {

    if (confirm('¿Seguro que deseas borrar todas las órdenes?')) {

      this.ordenesService.limpiarOrdenes();
      this.ordenes = [];

    }
  }
}