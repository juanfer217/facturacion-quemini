import { Component, OnInit } from '@angular/core';
import { Orden, OrdenesService } from '../../services/ordenes';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial',
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial implements OnInit {

  historial: Orden[] = [];
  selectedVentaId: number | null = null;
  totalDia: number = 0;

  constructor(private ordenesService: OrdenesService) { }

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.historial = this.ordenesService.getHistorial();
  }

  toggleDetalles(id: number) {

    if (this.selectedVentaId === id) {
      this.selectedVentaId = null;
    } else {
      this.selectedVentaId = id;
    }

  }

  ngDoCheck() {
    this.cargarHistorial();
  }

  limpiarTodo() {

    /*Swal.fire({
      title: '¿Eliminar historial?',
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

        this.ordenesService.limpiarOrdenes();
        this.historial = [];

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
    const confirmar = confirm('¿Deseas eliminar el historial?');
    if (confirmar) {

      this.ordenesService.limpiarOrdenes();
      this.historial = [];

    }
  }

  cerrarDia() {

    this.totalDia = this.historial.reduce(
      (total, venta) => total + Number(venta.total),
      0
    );

  }
}