/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since May 10 2022
 * @desc Clase TableLissajous
 * @module table-lissajous
 */

 'use static';

 import { Curve } from '../class-curve/curve.js';

 /** @desc Clase TableLissajous */
export class TableLissajous {
  #height;
  #width;
  #angle;
  #context;
  #curves;
  #rows;
  #columns;
  #cellSize;
  //#startTime; #time;
  /**
   * @desc Constructor de la clase TableLissajous
   * @param {Number} height - altura (tamaño en eje Y)
   * @param {Number} width - anchura (tamaño en eje X)
   * @param {Number} angle - ángulo inicial
   * @param {HTMLElement} canvas - canvas sobre el que dibujar las figuras
  */
  constructor(height, width, angle = 0, canvas) { 
    this.#height = height;
    this.#width = width;
    this.#angle = angle;  
    this.#context = canvas.getContext('2d');
    this.#cellSize = width / 10;
    this.#rows = Math.floor(height / this.#cellSize) - 1;
    this.#columns = Math.floor(width / this.#cellSize) - 1;
    this.#curves = [];
    for (let i = 0; i < this.#rows; ++i) {
      this.#curves.push([]);
    }
    for (let i = 0; i < this.#rows; ++i) {
      for (let j = 0; j < this.#columns; ++j) {
        this.#curves[i][j] = new Curve();
      }
    }
    //this.#startTime = Date.now();
  }

  /** @desc Método para dibujar la tabla con las curvas de Lissajous */
  draw() {
    let diameter = this.#cellSize - this.#cellSize / 2 - 5;    
    this.drawColumns(diameter);
    this.drawRows(diameter);

    this.#context.strokeStyle = 'rgb(255,255,255)';
    this.#context.beginPath();
    this.#context.lineWidth = 1;
    for (let i = 0; i < this.#rows; ++i) {
      for (let j = 0; j < this.#columns; ++j) {
        this.#curves[i][j].addPoint();
        this.#curves[i][j].show(this.#context);
      }
    }

    this.#angle = (this.#angle > 2 * Math.PI) ? 0 : this.#angle + 0.01;
  }

  /** @desc Método para animar la tabla con las curvas de Lissajous dibujada */
  update() {
    this.#context.clearRect(0, 0, this.#width, this.#height);
    this.draw();
    //this.#time = (Date.now() - this.#startTime);
    if (this.#angle === 0)
    for (let i = 0; i < this.#rows; ++i) {
      for (let j = 0; j < this.#columns; ++j) {
        this.#curves[i][j].reset();
      }
    }
    window.requestAnimationFrame(() => this.update());
  }

  /**
   * @desc Método para dibujar el contenido de las columnas de la tabla
   * @param {Number} diameter - diámetro de las circuferencias de referencia
   */
  drawColumns(diameter) {
    let coordinateX, coordinateY, offsetX, offsetY;
    for (let i = 0; i < this.#columns; ++i) {
      coordinateX = this.#cellSize + this.#cellSize * i + this.#cellSize / 2;
      coordinateY = this.#cellSize / 2;
      this.#context.strokeStyle = 'rgb(255,255,255)';
      this.#context.beginPath();
      this.#context.lineWidth = 1;  
      this.#context.ellipse(coordinateX, coordinateY, diameter, diameter, Math.PI / 4, 0, Math.PI * 2);
      this.#context.stroke();

      offsetX = (diameter/* / 2*/) * Math.cos(this.#angle * (i + 1) - Math.PI / 2);
      offsetY = (diameter/* / 2*/) * Math.sin(this.#angle * (i + 1) - Math.PI / 2);
      // Aquí se dibujan los puntos que recorren las circunferencias (parte superior)
      this.#context.beginPath();
      this.#context.lineWidth = 5;
      this.#context.strokeStyle = 'rgb(255,0,0)';
      this.#context.strokeRect(coordinateX + offsetX, coordinateY + offsetY, 1, 1);
      this.#context.stroke();
      // Aquí se dibujan las líneas amarillas
      this.#context.beginPath();
      this.#context.lineWidth = 1;
      this.#context.strokeStyle = 'rgb(255,255,0)';
      this.#context.moveTo(coordinateX + offsetX, 0);
      this.#context.lineTo(coordinateX + offsetX, this.#height);
      this.#context.stroke();
      // Dibujo de los puntos de las curvas (verticales)
      for (let j = 0; j < this.#rows; ++j) {
        this.#curves[i][j].setX(coordinateX + offsetX);
      }
    }
  }

  /**
   * @desc Método para dibujar el contenido de las filas de la tabla
   * @param {Number} diameter - diámetro de las circuferencias de referencia
   */
  drawRows(diameter) {
    let coordinateX, coordinateY, offsetX, offsetY;
    for (let i = 0; i < this.#rows; ++i) {
      coordinateX = this.#cellSize / 2;
      coordinateY = this.#cellSize + this.#cellSize * i + this.#cellSize / 2;
      this.#context.strokeStyle = 'rgb(255,255,255)';
      this.#context.beginPath();
      this.#context.lineWidth = 1;  
      this.#context.ellipse(coordinateX, coordinateY, diameter, diameter, Math.PI / 4, 0, Math.PI * 2);
      this.#context.stroke();

      offsetX = (diameter/* / 2*/) * Math.cos(this.#angle * (i + 1) - Math.PI / 2);
      offsetY = (diameter/* / 2*/) * Math.sin(this.#angle * (i + 1) - Math.PI / 2);
      // Aquí se dibujan los puntos que recorren las circunferencias (parte izquierda)
      this.#context.beginPath();
      this.#context.lineWidth = 5;
      this.#context.strokeStyle = 'rgb(255,0,0)';
      this.#context.strokeRect(coordinateX + offsetX, coordinateY + offsetY, 1, 1);
      this.#context.stroke();
      // Aquí se dibujan las líneas amarillas (horizontales)
      this.#context.beginPath();
      this.#context.lineWidth = 1;
      this.#context.strokeStyle = 'rgb(255,255,0)';
      this.#context.moveTo(0, coordinateY + offsetY);
      this.#context.lineTo(this.#width, coordinateY + offsetY);
      this.#context.stroke();
      // Dibujo de los puntos de las curvas
      for (let j = 0; j < this.#columns; ++j) {
        this.#curves[j][i].setY(coordinateY + offsetY);
      }
    }
  }
}

