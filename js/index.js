// Navigation Burger
const menuBtn = $('.header__navigation-burger');
const menuList = $('.header__navigation__list');
$(menuBtn).on('click', () => {
  menuBtn.toggleClass('open');
  menuList.toggleClass('visible');

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
      name: 'opacity-transition',
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
