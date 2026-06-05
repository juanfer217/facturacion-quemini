import { Component, OnInit } from '@angular/core';
import { Orden, OrdenesService } from '../../services/ordenes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial implements OnInit {

  historial: Orden[] = [];

  constructor(private ordenesService: OrdenesService) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.historial = this.ordenesService.getHistorial();
  }

  ngDoCheck() {
    this.cargarHistorial(); // 👈 esto lo mantiene actualizado
  }
}