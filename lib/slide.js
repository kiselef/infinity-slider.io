/**
 * Экземпляр конкретного слайда.
 * Всего их два. Один показывается, другой скрыт.
 */
import HorizontalStrategy from "./strategy/horizontal.js";
import DiagonalStrategy from "./strategy/diagonal.js";

export const STRATEGY_HORIZONTAL = 'horizontal';
export const STRATEGY_DIAGONAL   = 'diagonal';

export class Slide {
  constructor (entity) {
    this.entity = entity;
    this.imageEntity = this.entity.children[0];
    this.inAction = false;
    this.coords = {
      x: 0,
      y: 0
    };
    this.strategy = STRATEGY_HORIZONTAL;
  }

  move (direction) {
    this.strategy.moveSlide(direction);
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
    return this.strategy.isCurrent();
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

  set strategy (strategy) {
    switch (strategy) {
      case STRATEGY_DIAGONAL:
        this.movingStrategy = new DiagonalStrategy(this);
        break;
      default:
        this.movingStrategy = new HorizontalStrategy(this);
    }
  }

  get strategy () {
    return this.movingStrategy;
  }
}
