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
