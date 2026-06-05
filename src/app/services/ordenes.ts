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

  private guardar() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ordenes', JSON.stringify(this.ordenes));
      localStorage.setItem('historial', JSON.stringify(this.historial));
    }
  }

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
      const historial = localStorage.getItem('historial');

      if (historial) {
        this.historial = JSON.parse(historial);
      }
    }
  }

  agregarOrden(orden: Orden) {

    const nuevaOrden: Orden = {
      ...orden,
      estado: 'activa'
    };

    this.ordenes.push(nuevaOrden);

    this.guardar();
  }

  obtenerOrdenes(): Orden[] {
    return this.ordenes;
  }

  getHistorial(): Orden[] {
    return this.historial;
  }

  marcarComoEntregada(id: number) {

    const index = this.ordenes.findIndex(o => o.id === id);

    if (index !== -1) {

      const orden = this.ordenes[index];

      orden.estado = 'entregada';

      this.ordenes.splice(index, 1);
      this.historial.push(orden);

      this.guardar();
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

    this.historial = [];

    if (typeof window !== 'undefined') {
      localStorage.removeItem('Historial');
    }
  }
}