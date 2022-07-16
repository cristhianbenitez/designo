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

export default initHomepageAnimation;
