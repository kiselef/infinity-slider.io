import List from "./list.js";
import {Slide, STRATEGY_DIAGONAL, STRATEGY_HORIZONTAL} from "./slide.js";
import {DIRECTION_LEFT, DIRECTION_RIGHT} from "./constants.js";

/**
 * Логика упраления слайдами.
 */
export default class Slider
{
  constructor(entityId, imageUrls = []) {
    this.entity = document.getElementById(entityId);
    this.isLeftDirection = true;

    this.initImages(imageUrls);
    this.initSlides();
    this.initSlider();
  }

  initImages (imageUrls) {
    this.images = new List(imageUrls);
    this.images.preload();
  }

  initSlider () {
    document.onkeydown = (e) => {
      const direction = this.getDirectionByEventKey(e.key);
      if (direction === null) {
        return;
      }
      this.handle(this.getDirectionByEventKey(e.key));
    };
  }

  initSlides () {
    this.slides = [];
    [...this.entity.children].forEach(entity => {
      this.slides.push(new Slide(entity));
    });

    this.slides[0].image = this.images.current;
    this.slides[0].coordinates = {x: 0, y: 0};
    this.slides[1].coordinates = {x: -this.slides[1].size, y: 0};
  }

  async moveSlide (slide, direction) {
    if (slide.inAction) {
      return;
    }

    try {
      if (! slide.isCurrent()) {
        this.setNextDataForSlide(slide);
      }

      await slide.move(direction);

      if (! slide.isCurrent()) {
        this.images.preload();
      }
    } catch (e) {
      console.log(e);
    }
  }

  handle (direction) {
    this.isLeftDirection = direction === DIRECTION_LEFT;
    if (! this.isAvailableStep()) {
      return;
    }

    this.slides.forEach(slide => this.moveSlide(slide, direction));
  }

  left () {
    this.handle(DIRECTION_LEFT);
  }

  right () {
    this.handle(DIRECTION_RIGHT);
  }

  isAvailableStep () {
    return this.images.isNext() && this.isLeftDirection
      || this.images.isPrev() && !this.isLeftDirection;
  }

  setNextDataForSlide(slide) {
    slide.image = this.images[this.isLeftDirection ? 'next' : 'prev'];
  }

  addDataUrls (urls) {
    this.images.add(urls);
  }

  getDirectionByEventKey (key) {
    const direction = key.match(/^arrow(\w+)$/i);
    return direction === null ? null : direction[1].toLocaleLowerCase();
  }

  setStrategy (strategy) {
    if (! [STRATEGY_DIAGONAL, STRATEGY_HORIZONTAL].includes(strategy.toLocaleLowerCase())) {
      return;
    }

    this.slides[0].strategy = strategy;
    this.slides[1].strategy = strategy;
  }
}
