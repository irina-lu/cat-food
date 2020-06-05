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
  //  debugger;
  let fullWidth = 570;
  fatCatWrapper.style.transitionDuration ="0s";
  slimCatWrapper.style.transitionDuration ="0s";
  let value = document.querySelector('.before-after__range-toggle').value;
  //fatCatWrapper.offsetWidth = parseInt(value);
  let slimCatWidth = (fullWidth * value) / 100;
  let fatCatWidth = fullWidth - (fullWidth * value) / 100;
  //let width = (fullWidth * fatCatWrapper.offsetWidth) / 100;
  //let width = (fatCatWrapper.offsetWidth * 100) / fullWidth;
  fatCatWrapper.style.width = `${fatCatWidth}px`;
  slimCatWrapper.style.width = `${slimCatWidth}px`;
}

function pictureRangeMobile() {
  document.querySelector('.before-after__range-toggle').value = 8;
  document.querySelector('.before-after__range-toggle').disabled = true;
  buttonBefore.addEventListener('click', function() {
    slimCatWrapper.classList.remove('before-after__cat-wrapper--translate-left');
    fatCatWrapper.classList.remove('before-after__cat-wrapper--translate-left');
    document.querySelector('.before-after__range-toggle').value = 8;
  });

  buttonAfter.addEventListener('click', function() {
    fatCatWrapper.classList.add('before-after__cat-wrapper--translate-left');
    slimCatWrapper.classList.add('before-after__cat-wrapper--translate-left');
    document.querySelector('.before-after__range-toggle').value = 92;
  });
}

function pictureRangeByButton() {
  document.querySelector('.before-after__range-toggle').disabled = false;
  debugger;
  buttonAfter.addEventListener('click', function() {
    fatCatWrapper.style.transitionDuration ="1s";
    slimCatWrapper.style.transitionDuration ="1s";
    fatCatWrapper.style.width = `0`;
    slimCatWrapper.style.width = `100%`;
    document.querySelector('.before-after__range-toggle').value = 100;
  });
  buttonBefore.addEventListener('click', function() {
    fatCatWrapper.style.transitionDuration ="1s";
    slimCatWrapper.style.transitionDuration ="1s";
    fatCatWrapper.style.width = `100%`;
    slimCatWrapper.style.width = `0%`;
    document.querySelector('.before-after__range-toggle').value = 0;
  });
}

if (window.matchMedia("(max-width: 767px)").matches) {
  pictureRangeMobile();
} else {
  pictureRangeByButton();
}

window.addEventListener("resize", function() {
  debugger;
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
