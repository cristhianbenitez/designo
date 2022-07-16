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

// Hide background image when image not big enough

if ($(window).width() < 768) {
  console.log('object');
}

// Barba Transition
barba.init({
  transitions: [
    {
      name: 'default',
      beforeEnter({ current, next, trigger }) {
        window.scrollTo({ top: 0, behavior: 'smooth' });

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
          opacity: 1
        });
      }
    }
  ],
  views: [
    {
      namespace: 'home',
      beforeEnter() {
        initHomepageAnimation();
      },
      afterEnter() {}
    }
  ]
});

gsap.registerPlugin(ScrollTrigger);
// LOCOMOTIVE SCROLL
const locoScroller = '[data-scroll-container]';
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(locoScroller),
  smooth: true
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on('scroll', ScrollTrigger.update);
// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(locoScroller, {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(locoScroller).style.transform
    ? 'transform'
    : 'fixed'
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

const initHomepageAnimation = () => {
  let tl = gsap.timeline({});

  tl.from('.hero__headline, .hero__copy, .hero__button', {
    duration: 1,
    y: 9999,
    stagger: 0.5
  });

  tl.from(
    '.hero__image',
    {
      duration: 2,
      scale: 0.5,
      ease: 'power1.out',
      opacity: 0
    },
    '-=1.5'
  );

  gsap.from('.categories', {
    scrollTrigger: {
      trigger: '.categories',
      end: 'center center',
      scroller: locoScroller,
      scrub: true
    },
    opacity: 0,
    duration: 1,
    y: 300
  });

  gsap.from('.our-process__item', {
    scrollTrigger: {
      trigger: '.our-process',
      scroller: locoScroller,
      end: 'center center',
      scrub: true
    },
    opacity: 0,
    duration: 1,
    x: 500,
    stagger: 0.5
  });
};
