import {DIRECTION_LEFT} from "./constants.js"

/**
 * Экземпляр конкретного слайда.
 * Всего их два. Один показывается, другой скрыт.
 */
export default class Slide {
  constructor (entity) {
    this.entity = entity;
    this.imageEntity = this.entity.children[0];
    this.inAction = false;
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

  /**
   * Изменение положения слайда в горизонтальной плоскости (по Х).
   * @param direction
   * @returns {Promise<any>}
   */
  move (direction) {
    return new Promise(resolve => {
      this.inAction = true;
      // в зависимости от направления sign задает смещение слайда в нужную сторону

      const startedX = this.coordinates.x;
      const interval = setInterval(() => {
        const {x: newX} = this.calculateNewCoordinates(direction);
        const diffBetweenStartedAndCurrentX = Math.abs(startedX - newX);
        // перемещаем слайд по новым координатам
        this.coordinates = {x: newX};
        // проверяем, пора ли заканчивать перемещение
        // (в данном случае перемещение идет на величину самого блока)
        if (diffBetweenStartedAndCurrentX >= this.size) {
          clearInterval(interval);
          this.inAction = false;
          return resolve(newX);
        }
      }, 5);
    });
  }

  /**
   * Логика вычисления координат для каждой итерации пути.
   * @returns {*}
   */
  calculateNewCoordinates (direction) {
    const sign = direction === DIRECTION_LEFT ? 1 : -1;
    return {
      x: this.size * sign / 50 + this.coordinates.x
    }
  }

  isCurrentShow () {
    return this.x === 0;
  }

  get size () {
    return this.entity.offsetWidth;
  }

  set coordinates (coords) {
    this.entity.style.right = `${coords.x}px`;
  }

  get coordinates () {
    return {
      x: parseInt(this.entity.style.right)
    };
  }

  get x () {
    return this.coordinates.x;
  }
}
