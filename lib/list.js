/**
 * Список Url-ов для слайдеров. 
 * Пока это картинки, но в идеале может быть любая ссылка на любое html содержимое.
 * Сделан наподобие двусвязного списка: т.е. доступ возможен последовательно только к следующему/предыдущему/текущему элементам.
 * Доступен прелоадинг. Прелоадить можно как при инициализации, так и после.
 */
export default class List {
  constructor (list = [], preloadStep = 2) {
    // список url, которые грузить в слайдер
    this.list = list;
    // сюда грузятся данные из url-ов list (при постепенном проходе через слайды, не сразу)
    this.preloadedData = [];
    // запас хода для предзагрузки, т.е. сколько наперед он прогрузит при первом запуске
    this.preloadStep = preloadStep;
    this.currentIndex = 0;
  }

  /**
   * Предзагружает картинки в массив preloadedData.
   * Если данные загружены, статус loaded = true.
   *
   * TODO: добавить проверку при показе слайдера - загрузилась ли картинка.
   *
   * @param numberOfPreloadItems
   */
  preload (numberOfPreloadItems = 1) {
    const maxPreloadIndex = this.currentIndex + this.preloadStep + numberOfPreloadItems;
    const startPreloadIndex = this.preloadedData.length < this.currentIndex + 1
      ? (this.preloadedData.length > 0 ? this.preloadedData.length - 1 : 0)
      : this.preloadedData.length - 1;

    if (startPreloadIndex >= maxPreloadIndex) {
      return;
    }

    for (let i = startPreloadIndex; i < maxPreloadIndex; i++) {
      if (typeof this.list[i] === 'undefined') {
        break;
      }
      if (typeof this.preloadedData[i] === 'undefined') {
        this.preloadedData[i] = { data: this.loadImage(i) };
      }
    }
  }

  loadImage (index) {
    const image = new Image();
    image.onload = () => this.preloadedData[index]['loaded'] = true;
    image.src = this.list[index];
    return image;
  }

  add (item) {
    if (! Array.isArray(item)) {
      item = [item];
    }

    this.list.concat(item);
  }

  get next () {
    return this.isNext() ? this.list[++this.currentIndex] : null;
  }

  get prev () {
    return this.isPrev() ? this.list[--this.currentIndex] : null;
  }

  get current () {
    return this.list[this.currentIndex];
  }

  get size () {
    return this.list.length;
  }

  isNext() {
    return typeof this.list[this.currentIndex + 1] !== 'undefined';
  }

  isPrev() {
    return typeof this.list[this.currentIndex - 1] !== 'undefined';
  }
}
