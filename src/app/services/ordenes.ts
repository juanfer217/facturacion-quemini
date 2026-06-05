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
  total: number;
  fecha: Date;
  estado: 'activa' | 'entregada';
}

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  private ordenes: Orden[] = [];
  private historial: Orden[] = [];

  constructor() {

    if (typeof window !== 'undefined') {

      const datos = localStorage.getItem('ordenes');

      if (datos) {
        const parsed = JSON.parse(datos);

        this.ordenes = parsed.map((o: any) => ({
          ...o,
          fecha: new Date(o.fecha),
          estado: o.estado ?? 'activa'
        }));
      }
    }
  }

  agregarOrden(orden: Orden) {

    orden.estado = 'activa';
    this.ordenes.push(orden);

    if (typeof window !== 'undefined') {
      localStorage.setItem('ordenes', JSON.stringify(this.ordenes)
      );
    }
  }

  obtenerOrdenes(): Orden[] {
    return this.ordenes;
  }

  getHistorial(): Orden[] {
    return this.ordenes.filter(o => o.estado === 'entregada');
  }

  marcarComoEntregada(id: number) {

    const orden = this.ordenes.find(o => o.id === id);

    if (orden) {
      orden.estado = 'entregada';
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('ordenes', JSON.stringify(this.ordenes));
    }
  }

  eliminarOrden(id: number) {

    this.ordenes = this.ordenes.filter(
      orden => orden.id !== id
    );

    if (typeof window !== 'undefined') {
      localStorage.setItem('ordenes', JSON.stringify(this.ordenes)
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