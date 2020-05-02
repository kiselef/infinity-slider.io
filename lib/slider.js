import List from "./list.js";
import Slide from "./slide.js";
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

  initSlider () {
    document.onkeydown = (e) => {
      const direction = this.getDirectionByEventKey(e.key);
      if (direction === null) {
        return;
      }
      this.handle(this.getDirectionByEventKey(e.key));
    };
  }

  getDirectionByEventKey (key) {
    const direction = key.match(/arrow(\w+)$/i);
    return direction === null ? null : direction[1].toLocaleLowerCase();
  }

  initImages (imageUrls) {
    this.images = new List(imageUrls);
    this.images.preload();
  }

  initSlides () {
    this.slides = [];
    [...this.entity.children].forEach(entity => {
      this.slides.push(new Slide(entity));
    });

    this.slides[0].image = this.images.current;
    this.slides[0].coordinates = {x: 0};
    this.slides[1].coordinates = {x: -this.slides[1].size};
  }

  async moveSlide (slide, direction) {
    if (slide.inAction) {
      return false;
    }

    try {
      this.prepareSlideBeforeShow(slide);

      await slide.move(direction);

      if (! slide.isCurrentShow()) {
        this.images.preload();
      }
    } catch (e) { console.log(e) }
  }

  prepareSlideBeforeShow (slide) {
    if (! slide.isCurrentShow()) {
      const sign = this.isLeftDirection ? -1 : 1;
      slide.coordinates = { x: slide.size * sign };
      slide.image = this.images[this.isLeftDirection ? 'next' : 'prev'];
    }
  }
}
