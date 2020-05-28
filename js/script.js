let navMain = document.querySelector('.main-nav');
let navToggle = document.querySelector('.page-header__toggle');

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



let pinWidth = 55;
let pinHeight = 53;

let pinTop = -40;
let pinLeft = -30;

let centerLatitude = 59.93861646;
let centerLongitude = 30.32318612;


if (window.matchMedia("(min-width: 768px)").matches) {
  pinWidth = 113;
  pinHeight = 106;
  pinTop = -90;
  pinLeft = -50;
}

if (window.matchMedia("(min-width: 1440px)").matches) {
  centerLatitude = 59.93861646;
  centerLongitude = 30.32149404;
}

ymaps.ready(init);

function init() {
  window.addEventListener("resize", function() {
    let widthScreen = innerWidth;
    if (widthScreen >= 1440) {
      centerLatitude = 59.93861646;
      centerLongitude = 30.32149404;
      myMap.setCenter([centerLatitude, centerLongitude]);
    } else {
      centerLatitude = 59.93861646;
      centerLongitude = 30.32318612;
      myMap.setCenter([centerLatitude, centerLongitude]);
    }

    if (widthScreen >= 768) {
      pinWidth = 113;
      pinHeight = 106;
      pinTop = -90;
      pinLeft = -50;

      myPlacemark.options._options.iconImageSize[0] = pinWidth;
      myPlacemark.options._options.iconImageSize[1] = pinHeight;
      myPlacemark.options._options.iconImageOffset[0] = pinLeft;
      myPlacemark.options._options.iconImageOffset[1] = pinTop;
    } else {
      pinWidth = 55;
      pinHeight = 53;
      pinTop = -40;
      pinLeft = -30;

      myPlacemark.options._options.iconImageSize[0] = pinWidth;
      myPlacemark.options._options.iconImageSize[1] = pinHeight;
      myPlacemark.options._options.iconImageOffset[0] = pinLeft;
      myPlacemark.options._options.iconImageOffset[1] = pinTop;
    }
  }, false);

  // Создание карты.
  let myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      center: [centerLatitude, centerLongitude],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 18
    }),

    myPlacemark = new ymaps.Placemark([59.93860450, 30.32318000], {}, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'http://127.0.0.1:3000/img/map-pin.png',
      // Размеры метки.
      iconImageSize: [pinWidth, pinHeight],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
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
}
