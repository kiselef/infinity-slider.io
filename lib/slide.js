/**
 * Экземпляр конкретного слайда.
 * Всего их два. Один показывается, другой скрыт.
 */
import HorizontalStrategy from "./strategy/horizontal.js";
import DiagonalStrategy from "./strategy/diagonal.js";

export default class Slide {
  constructor (entity) {
    this.entity = entity;
    this.imageEntity = this.entity.children[0];
    this.inAction = false;
    this.moveStrategy = new DiagonalStrategy(this);
    this.coords = {
      x: 0,
      y: 0
    };
  }

  move (direction) {
    this.moveStrategy.moveSlide(direction);
  }

  get image () {
    if (this.imageEntity.getAttribute('src').length === 0) {
      return '';
    }

    return this.imageEntity.getAttribute('src');
  }

  set image (url) {
    this.imageEntity.setAttribute('src', url);
  }

  isCurrent () {
    return this.moveStrategy.isCurrent();
  }

  get size () {
    return this.entity.offsetWidth;
  }

  get height () {
    return this.entity.offsetHeight;
  }

  set coordinates (coordinates) {
    const {x, y} = coordinates;
    this.coords = {x, y};
    this.entity.style.right = `${x}px`;
    this.entity.style.bottom = `${y}px`;
  }

  get coordinates () {
    return this.coords;
  }

  get x () {
    return this.coords.x;
  }

  get y () {
    return this.coords.y;
  }
}
