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
        homepageAnimation();
      }
    },
    {
      namespace: 'about',
      beforeEnter() {
        aboutUsAnimation();
      }
    },
    {
      namespace: 'locations',
      beforeEnter() {
        locationsAnimation();
      }
    },
    {
      namespace: 'contact',
      beforeEnter() {
        const tl = gsap.timeline({});
        tl.from('.our-locations__list-item', {
          opacity: 0,
          duration: 1,
          x: -8000,
          stagger: 0.5
        });
      }
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

const footerAnimation = () => {
  const tl = gsap.timeline({});

  tl.from('.cta__inner-container', {
    opacity: 0,
    duration: 1,
    y: -100
  });
};
footerAnimation();

const homepageAnimation = () => {
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

  tl.from(
    '.categories',
    {
      opacity: 0,
      duration: 0.5,
      y: 300
    },
    '-=1'
  );

  tl.from('.our-process__item', {
    opacity: 0,
    duration: 1,
    x: 500,
    stagger: 0.5
  });
};

const aboutUsAnimation = () => {
  const tl = gsap.timeline({});

  tl.from('.about-hero', {
    duration: 0.5,
    y: 9999
  });
  tl.from('.about-hero__headline, .about-hero__copy, .about-hero__button', {
    duration: 0.5,
    y: 9999,
    stagger: 0.5
  });

  tl.from('.our-team__inner-container', {
    opacity: 0,
    duration: 1,
    y: 300
  });

  tl.from('.our-locations__list-item', {
    opacity: 0,
    duration: 1,
    x: -500,
    stagger: 0.5
  });

  tl.from('.our-mission__inner-container', {
    opacity: 0,
    duration: 1,
    y: -200
  });
};

const locationsAnimation = () => {
  const tl = gsap.timeline({});

  tl.from('.locations__location:first-child, .locations__location:last-child', {
    opacity: 0,
    duration: 2,
    x: 300
  });
  tl.from(
    '.locations__location:nth-child(2)',
    {
      opacity: 0,
      duration: 2,
      x: -300
    },
    '-=2'
  );
};
