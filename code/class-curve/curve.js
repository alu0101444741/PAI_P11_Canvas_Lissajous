/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since May 10 2022
 * @desc Clase Curve
 * @module curve
 */

 'use static';

 /** @desc Clase Curve */
export class Curve {

  /** @desc Constructo de la clase Curve */
  constructor() {
    this.path = [];
    this.currentPointCoordinateX = 0;
    this.currentPointCoordinateY = 0;
  }

  /**
   * @desc Método público para añadir un punto al conjunto de puntos de la instancia.
   * El punto se construye a través de las coordenadas almacenadas en la misma instancia.
   */
  addPoint() {
    this.path.push({coordinateX: this.currentPointCoordinateX, coordinateY: this.currentPointCoordinateY});
  }

  /**
   * @desc Método público para mostrar el camino de puntos almacenado.
   * @param {context} - contexto en donde dibujar los puntos.
   */
  show(context) { 
    //context.strokeStyle = 'rgb(255,255,255)';
    //context.beginPath();
    for (const point of this.path) {
      context.strokeRect(point.coordinateX, point.coordinateY, 1, 1);
    }
    context.stroke();
  }

  /**
   * @desc Método público para borrar el camino dibujado.
   */
  reset() {
    this.path.length = 0;
    this.path = [];
  }

  /**
   * @desc Método público cambiar el valor de la coordenada X.
   * @param {Number} - nuevo valor de la coordenada.
   */
  setX(coordinateX) {
    this.currentPointCoordinateX = coordinateX;
  }

  /**
   * @desc Método público cambiar el valor de la coordenada Y.
   * @param {Number} - nuevo valor de la coordenada.
   */
  setY(coordinateY) {
    this.currentPointCoordinateY = coordinateY;
  }
}