/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since May 10 2022
 * @desc Clase Lissajous
 * @module lissajous
 */

 'use static';

 import { Curve } from '../class-curve/curve.js';

 /** @desc Clase Lissajous */
export class Lissajous {
  #height;
  #width;
  //#angle;
  #valueA;
  #valueB;
  #context;
  #curve;
  #time;
  #startTime;
  /**
   * @desc Constructor de la clase Lissajous
   * @param {Number} height - altura (tamaño en eje Y)
   * @param {Number} width - anchura (tamaño en eje X)
   * @param {HTMLElement} canvas - canvas sobre el que dibujar las figuras
   * @param {Number} valueA - valor 'a' que representa los 'lobes' horizontales
   * @param {Number} valueB- valor 'b' que representa los 'lobes' verticales
  */
  constructor(height, width, canvas, valueA = 1, valueB = 1) { 
    this.#height = height;
    this.#width = width;
    //this.#angle = angle;  
    this.#valueA = valueA;
    this.#valueB = valueB;    
    this.#curve = new Curve();
    this.#startTime = Date.now();
    
    this.#context = canvas.getContext('2d');
    this.#context.strokeStyle = 'rgb(255,255,255)';
    this.#context.beginPath();
  }

  /** @desc Método para dibujar las curvas de Lissajous */
  draw() {
    this.#context.lineWidth = 1;

    for (let angle = 0.00; angle < 2; angle += 0.01) {
      let coordinateX = (this.#width / 4) * Math.sin(this.#valueA * this.#time + angle * Math.PI);
      let coordinateY = (this.#height / 4) * Math.sin(this.#valueB * this.#time + angle * Math.PI);
      let offsetX = (this.#width / 2) + (this.#width / 8) * Math.cos(this.#valueA * angle * Math.PI);
      let offsetY = (this.#width / 2) + (this.#height / 8) * Math.cos(this.#valueB * angle * Math.PI);
      this.#curve.setX(coordinateX + offsetX);
      this.#curve.setY(coordinateY + offsetY);
      this.#curve.addPoint();
      this.#curve.show(this.#context);
    }
  }

  /** @desc Método para animar las curvas de Lissajous dibujadas */
  update() {
    this.#time = (Date.now() - this.#startTime) / 1000;
    this.#context.clearRect(0, 0, this.#width, this.#height);
    this.draw();
    this.#curve.reset();
    window.requestAnimationFrame(() => this.update());
  }
}

