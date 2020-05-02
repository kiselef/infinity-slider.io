import Slider from "./lib/slider.js";

const defaultImageUrls = [];
for (let i = 0; i < 10; i++) {
  defaultImageUrls.push(`https://fakeimg.pl/400x160/?text=slide${i + 1}`);
}

window.onload = () => {
  const slider = new Slider('slider', defaultImageUrls);

  const left = () => slider.left();
  const right = () => slider.right();
  for (let arrow of document.getElementsByClassName('arrow')) {
    arrow.onclick = arrow.className.indexOf('left') !== -1 ? left : right;
  }
};


