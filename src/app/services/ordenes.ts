import { Injectable } from '@angular/core';

export interface Orden {
  id: number;
  cliente: string;
  miniHamburguesas: number;
  miniPerros: number;
  miniArepas: number;
  papasPequenas: number;
  papasGrandes: number;
  gaseosa250: number;
  gaseosa500: number;
  fecha: Date;
}

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  private ordenes: Orden[] = [];

  constructor() {

    if (typeof window !== 'undefined') {

      const datos = localStorage.getItem('ordenes');

      if (datos) {
        this.ordenes = JSON.parse(datos);
      }

    }
  }

  agregarOrden(orden: Orden) {

    this.ordenes.push(orden);

    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'ordenes',
        JSON.stringify(this.ordenes)
      );
    }
  }

  obtenerOrdenes(): Orden[] {
    return this.ordenes;
  }

  eliminarOrden(id: number) {

    this.ordenes = this.ordenes.filter(
      orden => orden.id !== id
    );

    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'ordenes',
        JSON.stringify(this.ordenes)
      );
    }
  }

  limpiarOrdenes() {

    this.ordenes = [];

    if (typeof window !== 'undefined') {
      localStorage.removeItem('ordenes');
    }
  }
}