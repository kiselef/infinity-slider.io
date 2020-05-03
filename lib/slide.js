/**
 * Экземпляр конкретного слайда.
 * Всего их два. Один показывается, другой скрыт.
 */
import HorizontalStrategy from "./strategy/horizontal.js";

export default class Slide {
  constructor (entity) {
    this.entity = entity;
    this.imageEntity = this.entity.children[0];
    this.inAction = false;
    this.moveStrategy = new HorizontalStrategy(this);
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
    return this.x === 0 && this.y === 0;
  }

  get size () {
    return this.entity.offsetWidth;
  }

  set coordinates (coordinates) {
    const {x, y} = coordinates;
    this.entity.style.right = `${x}px`;
    this.entity.style.bottom = `${y}px`;
    this.coords = {x, y};
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
