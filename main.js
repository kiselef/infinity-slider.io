import Helper from "./init_helper.js";
import Slider from "./lib/slider.js";

window.onload = () => {
  const slider = new Slider('slider', Helper.generateUrls());

  const left = () => slider.left();
  const right = () => slider.right();
  const add = () => slider.addDataUrls(Helper.generateUrls());
  for (let arrow of document.getElementsByClassName('arrow')) {
    arrow.onclick = arrow.className.indexOf('left') !== -1 ? left : right;
  }
  document.getElementsByClassName('add-slides').item(0).onclick = () => {
    slider.addDataUrls(Helper.generateUrls());
  };
};


