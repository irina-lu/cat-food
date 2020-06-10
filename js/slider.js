//ползунок
let inputRange = document.querySelector('.before-after__range-toggle');
let buttonBefore = document.querySelector('.before-after__toggle-left');
let buttonAfter = document.querySelector('.before-after__toggle-right');
let fatCatWrapper = document.querySelector('.before-after__fat-cat-wrapper');
let slimCatWrapper = document.querySelector('.before-after__slim-cat-wrapper');

function pictureRange() {
  let fullWidth = 570;
  fatCatWrapper.style.transitionDuration = "0s";
  slimCatWrapper.style.transitionDuration = "0s";
  let value = document.querySelector('.before-after__range-toggle').value;
  let slimCatWidth = (fullWidth * value) / 100;
  let fatCatWidth = fullWidth - (fullWidth * value) / 100;
  fatCatWrapper.style.width = `${fatCatWidth}px`;
  slimCatWrapper.style.width = `${slimCatWidth}px`;
}

function addTranslateLeft() {
  fatCatWrapper.style.transitionDuration = "1s";
  slimCatWrapper.style.transitionDuration = "1s";
  fatCatWrapper.classList.add('before-after__cat-wrapper--translate-left');
  slimCatWrapper.classList.add('before-after__cat-wrapper--translate-left');
  inputRange.value = 92;
}

function removeTranslateLeft() {
  fatCatWrapper.style.transitionDuration = "1s";
  slimCatWrapper.style.transitionDuration = "1s";
  slimCatWrapper.classList.remove('before-after__cat-wrapper--translate-left');
  fatCatWrapper.classList.remove('before-after__cat-wrapper--translate-left');
  inputRange.value = 8;
}

function pictureRangeMobile() {
  buttonBefore.removeEventListener('click', clickButtonBefore);
  buttonAfter.removeEventListener('click', clickButtonAfter);
  fatCatWrapper.style.width = `100%`;
  slimCatWrapper.style.width = `100%`;

  inputRange.value <= 50 ? inputRange.value = 8 : addTranslateLeft();

  inputRange.disabled = true;
  buttonBefore.addEventListener('click', removeTranslateLeft);
  buttonAfter.addEventListener('click', addTranslateLeft);
}

function clickButtonAfter() {
  fatCatWrapper.style.transitionDuration = "1s";
  slimCatWrapper.style.transitionDuration = "1s";
  fatCatWrapper.style.width = `0`;
  slimCatWrapper.style.width = `100%`;
  inputRange.value = 100;
}

function clickButtonBefore() {
  fatCatWrapper.style.transitionDuration = "1s";
  slimCatWrapper.style.transitionDuration = "1s";
  fatCatWrapper.style.width = `100%`;
  slimCatWrapper.style.width = `0%`;
  inputRange.value = 0;
}

function pictureRangeByButton() {
  inputRange.disabled = false;
  slimCatWrapper.classList.remove('before-after__cat-wrapper--translate-left');
  fatCatWrapper.classList.remove('before-after__cat-wrapper--translate-left');
  buttonBefore.removeEventListener('click', removeTranslateLeft);
  buttonAfter.removeEventListener('click', addTranslateLeft);
  pictureRange();

  buttonAfter.addEventListener('click', clickButtonAfter);
  buttonBefore.addEventListener('click', clickButtonBefore);
}


if (window.matchMedia("(max-width: 767px)").matches) {
  pictureRangeMobile();
} else {
  pictureRangeByButton();
}

window.addEventListener("resize", function() {
   innerWidth < 768 ? pictureRangeMobile() : pictureRangeByButton();
 });
