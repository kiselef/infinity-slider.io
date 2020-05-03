import {DIRECTION_LEFT} from "../constants.js";

const SPEED = 10;

/**
 * Логика диагонального перемещения слайда.
 */
export default class DiagonalStrategy {
  constructor (slide) {
    this.slide = slide;
  }

  beforeMove () {
    const { slide, direction } = this;
    if (slide.isCurrent()) {
      return;
    }

    const sign = direction === DIRECTION_LEFT ? -1 : 1;
    slide.coordinates = { x: slide.size * sign, y: slide.height * sign };
  }

  moveSlide (direction) {
    this.direction = direction;

    this.beforeMove();
    return this.move();
  }

  move () {
    return new Promise(resolve => {
      const {slide} = this;
      slide.inAction = true;
      const startedCoordinates = slide.coordinates;
      const interval = setInterval(() => {
        const { x: xNew, y: yNew } = this.calculateNextCoordinates();
        // перемещаем слайд по новым координатам
        slide.coordinates = { x: xNew, y: yNew };
        // проверяем, пора ли заканчивать перемещение
        if (this.isFinished(startedCoordinates)) {
          clearInterval(interval);
          slide.inAction = false;
          return resolve();
        }
      }, SPEED);
    });
  }

  /**
   * TODO: добавить вычисление координат в зависимости от высоты/ширины слайда.
   * @returns {{x: *, y: *}}
   */
  calculateNextCoordinates() {
    const {slide, direction} = this;
    const sign = direction === DIRECTION_LEFT ? 1 : -1;
    const {x, y} = slide.coordinates;
    return {
      x: slide.size * sign / 50 + x,
      y: slide.size * sign / 125 + y
    }
  }

  isFinished(startCoordinates) {
    const {slide} = this;
    return Math.abs(startCoordinates.x - slide.x) >= slide.size
  }

  isCurrent () {
    return this.slide.x === 0;
  }
};
