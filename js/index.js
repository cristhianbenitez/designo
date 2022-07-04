// Navigation Burger
const menuBtn = $('.header__navigation-burger');
const menuList = $('.header__navigation__list');
$(menuBtn).on('click', () => {
  menuBtn.toggleClass('open');
  menuList.toggleClass('visible');
  // NO SCROLL ON OPEN MENU
  if ($('body').css('overflow') === 'hidden') {
    $('html, body').css({
      overflow: 'visible',
      height: 'auto'
    });
  } else {
    $('html, body').css({
      overflow: 'hidden',
      height: '100%'
    });
  }
});

// Barba Transition
barba.init({
  transitions: [
    {
      name: 'default-transition',
      beforeEnter({ current, next, trigger }) {
        const headerLinks = $('.header__navigation__list-item');
        const href = next.url.path;
        const activeClass = 'header__navigation__list-item--active';
        headerLinks.each((_, link) => {
          if ($(link).children('a').attr('href') === href) {
            $(link).addClass(activeClass);
          } else {
            $(link).removeClass(activeClass);
          }
        });
      },
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0
        });
      }
    }
  ]
});
