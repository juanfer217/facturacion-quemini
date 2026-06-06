import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenesService, Orden } from '../../services/ordenes';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

    /*Swal.fire({
      title: '¿Eliminar orden?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      background: '#2d2d2d',
      color: '#ffffff',
      width: '90%'
    }).then((result) => {

      if (result.isConfirmed) {

        this.ordenesService.eliminarOrden(id);

        this.ordenes = this.ordenesService.obtenerOrdenes();

        Swal.fire({
          title: 'Eliminada',
          text: 'La orden fue eliminada correctamente.',
          icon: 'success',
          confirmButtonColor: '#16a34a',
          background: '#2d2d2d',
          color: '#ffffff'
        });

      }

    });*/
    const confirmar = confirm('¿Deseas eliminar esta orden?');

    if (confirmar) {

      this.ordenesService.eliminarOrden(id);
      this.ordenes = this.ordenesService.obtenerOrdenes();

    }

  }
  
}