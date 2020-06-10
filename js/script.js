//менюшка
let navMain = document.querySelector('.main-nav');
let navToggle = document.querySelector('.page-header__toggle');
//ползунок
let inputRange = document.querySelector('.before-after__range-toggle');
let buttonBefore = document.querySelector('.before-after__toggle-left');
let buttonAfter = document.querySelector('.before-after__toggle-right');
let fatCatWrapper = document.querySelector('.before-after__fat-cat-wrapper');
let slimCatWrapper = document.querySelector('.before-after__slim-cat-wrapper');
//карта
let pinWidth = 55;
let pinHeight = 53;

let pinTop = -40;
let pinLeft = -30;

let centerLatitude = 59.93861646;
let centerLongitude = 30.32318612;


navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    navToggle.classList.remove('page-header__toggle--closed');
    navToggle.classList.add('page-header__toggle--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    navToggle.classList.add('page-header__toggle--closed');
    navToggle.classList.remove('page-header__toggle--opened');
  }
});

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


if (window.matchMedia("(min-width: 768px)").matches) {
  pinWidth = 113;
  pinHeight = 106;
  pinLeft = -50;
  pinTop = -90;
}

if (window.matchMedia("(min-width: 1440px)").matches) {
  centerLatitude = 59.93861646;
  centerLongitude = 30.32149404;
}

ymaps.ready(init);

function init() {
  window.addEventListener("resize", function() {
    let widthScreen = innerWidth;
    widthScreen >= 1440 ? setCenterCordinate([59.93861646, 30.32149404]) : setCenterCordinate([59.93861646, 30.32318612]);

    widthScreen >= 768 ? setPlacemarkParams({
        width: 113,
        height: 106,
        left: -50,
        top: -90
      }) :
      setPlacemarkParams({
        width: 55,
        height: 53,
        left: -30,
        top: -40
      });
  }, false);

  // Создание карты.
  let myMap = new ymaps.Map("map", {
      center: [centerLatitude, centerLongitude],
      zoom: 18
    }),

    myPlacemark = new ymaps.Placemark([59.93860450, 30.32318000], {}, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      iconImageHref: 'http://127.0.0.1:3000/img/map-pin.png',
      iconImageSize: [pinWidth, pinHeight],
      // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
      iconImageOffset: [pinLeft, pinTop]
    });

  myMap.geoObjects.add(myPlacemark);
  myMap.controls
    .remove('rulerControl')
    .remove('trafficControl')
    .remove('searchControl')
    .remove('geolocationControl')
    .remove('typeSelector')
    .remove('zoomControl');

  function setCenterCordinate(array) {
    [centerLatitude, centerLongitude] = array;
    return myMap.setCenter([centerLatitude, centerLongitude]);
  }

  function setPlacemarkParams(obj) {
    pinWidth = obj.width;
    pinHeight = obj.height;
    pinLeft = obj.left;
    pinTop = obj.top;

    myPlacemark.options._options.iconImageSize[0] = pinWidth;
    myPlacemark.options._options.iconImageSize[1] = pinHeight;
    myPlacemark.options._options.iconImageOffset[0] = pinLeft;
    myPlacemark.options._options.iconImageOffset[1] = pinTop;
  }
}
