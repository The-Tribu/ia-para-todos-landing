// Configuración de la cohorte que la landing está vendiendo.
//
// Punto único de verdad para marca, fechas, precios, sede y prueba social.
// Al cerrar una cohorte y abrir la siguiente se edita ESTE archivo, no los componentes:
// antes los precios estaban triplicados (Hero, Pricing, Registration) y los caps duplicados
// (Pricing, brevo.ts), y era fácil dejar la página anunciando datos de la cohorte anterior.

/** Marca pública. Cambia a "La Tribu IA" desde Cohorte 4 (transición post 10-oct-2026). */
export const MARCA = "La Tribu IA";

export interface Tier {
  id: 1 | 2 | 3;
  nombre: string;
  precio: string;
  /** Cupos totales del nivel. La suma de los tres es el cupo del curso. */
  cuposCap: number;
}

export const TIERS = [
  { id: 1, nombre: "Pioneros", precio: "$400.000", cuposCap: 4 },
  { id: 2, nombre: "Early Bird", precio: "$460.000", cuposCap: 6 },
  { id: 3, nombre: "General", precio: "$540.000", cuposCap: 2 },
] as const satisfies readonly Tier[];

export const CUPOS_TOTALES = TIERS.reduce((total, t) => total + t.cuposCap, 0);

export interface Sede {
  nombre: string;
  direccion: string;
  mapaUrl: string;
  mapaImg: string;
  comoLlegar: string;
}

export const COHORTE = {
  numero: 4,
  /** Valor del atributo COHORTE en Brevo. */
  slug: "cohorte-4",
  /** A dónde van los registros cuando ya no quedan cupos. */
  siguienteNumero: 5,
  siguienteSlug: "cohorte-5",

  /** Primera sesión, en prosa: "Empezamos el 17 de octubre." */
  inicio: "17 de octubre",
  /** Etiquetas de las cuatro sesiones, en orden. */
  fechas: ["Sáb 17 oct", "Sáb 24 oct", "Sáb 31 oct", "Sáb 7 nov"],
  horario: "9:00 AM – 12:00 PM",
  duracion: "12 horas",
  sesiones: 4,

  ciudad: "Cartago, Valle del Cauca",
  /**
   * Sede sin confirmar para Cohorte 4: mientras sea null la landing no publica dirección
   * ni mapa, solo la ciudad. Rellenar cuando Cotecnova confirme las cuatro fechas.
   */
  sede: null as Sede | null,

  /** Ancla tachada. Se muestra sin porcentaje de descuento a propósito (Ley 1480). */
  precioAncla: "$600.000 COP",
  /** Graduados de cohortes anteriores (13 de C1 + 10 de C2). */
  graduados: 23,
} as const;
