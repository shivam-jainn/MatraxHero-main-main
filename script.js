const lenis = new Lenis({
  duration: 4,
  smooth: true,
  easing: (t, friction = 0.1) => {
    // Apply friction to the easing function
    const easedValue = Math.min(1, 1.001 - Math.pow(2, -10 * t));

    // Apply friction to the eased value
    const frictionedValue = easedValue - friction * t;

    return Math.min(1, frictionedValue);
  },
});
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.body.addEventListener("mousemove", function (dets) {
  gsap.to(".cursor", {
    left: dets.x,
    top: dets.y,
  });
});

function showNav() {
  document.getElementsByClassName("navigation")[0].classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide(".splide", {
    direction: "ttb",
    height: "50vh",
    wheel: true,
    perPage: 6,
    // type: "loop",
    perMove: 1,
    pagination: false,
    gap: 15,
    padding: "1rem",
  });
  splide.mount();
});

gsap.from(".heroCanvas", {
  x: 1300,
  rotate: 360,
  // repeat:-1,
  duration: 4,
});

function dom() {
  const canvas = document.querySelector(".heroSection>canvas");
  const context = canvas.getContext("2d");
  const imageSeq = {
    frame: 0,
  };

  function setCanvasSize() {
    const img = images[imageSeq.frame];
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
    render();
  }

  window.addEventListener("resize", setCanvasSize);

  function files(index) {
    const data = `
      ./images/SequenceImages/jlsousa tires project 4  Urcola+.3117.${
        31 + index
      }.webp
      `;
    return data.trim();
  }

  const frameCount = 121;
  const images = [];

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 1,
      pin: true,
      trigger: "#main",
      start: "top top",
      end: "8% top",
      // markers:true,
    },
    onUpdate: render,
  });

  images[0].onload = setCanvasSize;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }

  // gsap.to(".heroSection>canvas", {
  //   scale: 0.8,
  //   scrollTrigger: {
  //     scrub: 0.1,
  //     trigger: "#main",
  //     start: "bottom 100%",
  //     invalidateOnRefresh: true,
  //   },
  // });

  // ScrollTrigger.create({
  //   trigger: "#main",
  //   pin: true,
  //   start: "bottom 100%",
  // });
}

dom();

function videoSection() {
  let video = document.querySelector(".videoSection video");

  ScrollTrigger.create({
    trigger: "#main",
    // markers:true,
    start: "9% top",
    end: "45% top",
    // pin:".videoSection",
    onEnter: () => video.play(),
    onEnterBack: () => video.play(),
    onLeave: () => video.pause(),
    onLeaveBack: () => video.pause(),
  });

  // let tl1 = gsap.timeline({
  //   scrollTrigger: {
  //     scrub: 0.1,
  //     trigger: "#main",
  //     start: "11.5% top",
  //     end: "40% top",
  //     pin: true,
  //     markers:true,
  //   },
  // });

  // -------------
  const splitTypes = document.querySelectorAll(".reveal-type");

  splitTypes.forEach((char, i) => {
    const text = new SplitType(char, { types: "chars" });

    // Set initial opacity to 0
    gsap.set(text.chars, { opacity: 1 });

    gsap.from(
      text.chars,
      {
        scrollTrigger: {
          trigger: "#main",
          start: "11.5% top",
          end: "20% top",
          scrub: true,
          pin: true,
          // markers: true,
        },
        duration: 0.5, // Adjust the duration as needed
        stagger: 0.1,
        opacity: 0.2, // Set the target opacity to 1
      },
      "a"
    );
  });
  // ------------

  if (window.innerWidth < 600) {
    // tl1.to(".videoOverlay", { opacity: 0.85 }, "+.4");
    // tl1.to(".videoOverlayText", { bottom: "40%", duration: 8 }, "+.8");
  } else {
    // tl1.to(".videoOverlay", { opacity: 0.85 }, "+.4");
    // tl1.to(".videoOverlayText", { bottom: "30%", duration: 8 }, "+.8");
  }
}
videoSection();

function horizontalScroll() {
  let images = gsap.utils.toArray(".horizontal__item");
  let animationProps = {
    ease: "none",
    scrollTrigger: {
      trigger: "#main",
      pin: true,
      start: "23% top",
      end: "50% top",
      scrub: 1,
      // markers: true,
    },
    defaults: { duration: 1 },
  };
  // gsap.to(images, {
  //   xPercent: -50 * (images.length - 1),
  //   ...animationProps,
  //   onComplete: function () {
  //     gsap.delayedCall(10, () => {
  //       // Your code here that you want to execute after a 1-second delay at the end of the animation
  //       console.log("Animation completed. Adding a 1-second delay at the end.");
  //     });
  //   },
  // });

  // gsap.to(images, {
  //   xPercent: -50 * (images.length - 1),
  //   ...animationProps,
  // });

  // Check the screen width
  if (window.innerWidth < 600) {
    gsap.to(images, {
      xPercent: -160 * (images.length - 1),
      ...animationProps,
    });
  } else if (window.innerWidth >= 1000 && window.innerWidth < 1200) {
    gsap.to(images, {
      xPercent: -45 * (images.length - 1),
      ...animationProps,
    });
  } else if (window.innerWidth >= 700 && window.innerWidth < 900) {
    gsap.to(images, {
      xPercent: -60 * (images.length - 1),
      ...animationProps,
    });
  } else {
    gsap.to(images, {
      xPercent: -50 * (images.length - 1),
      ...animationProps,
    });
  }
}

horizontalScroll();

function curvedScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const slides = gsap.utils.toArray(".single-item");

  var yPercentValue;
  if (window.innerWidth < 600) {
    // Adjust for small screens
    yPercentValue = 0;
  } else {
    // Default value for larger screens
    yPercentValue = -4;
  }

  const animation = () => {
    gsap.set(".carrousel-wrappper", {
      xPercent: -50,
      yPercent: yPercentValue,
      width: `${slides.length * 350}px`,
      height: `${slides.length * 350}px`,
    });
    circleSetup(".carrousel-wrappper", ".single-item", -50);
  };

  gsap.to(".curvedScroll", {
    scrollTrigger: {
      trigger: "#main",
      pin: true,
      start: "34.49% top",
      end: "55% top",
      // markers: true,
      onUpdate: (self) => {
        gsap.set(".carrousel-wrappper", { rotation: self.progress * 200 });
      },
    },
  });

  /// set slides around the circle
  const circleSetup = (circle, items, percentageValue) => {
    const mainCicle = document.querySelector(circle);
    const circleItem = gsap.utils.toArray(items);

    const radius = mainCicle.offsetWidth / 2;
    const center = mainCicle.offsetWidth / 2;
    const total = circleItem.length;
    const slice = (-1.3 * Math.PI) / total;

    circleItem.forEach((item, i) => {
      const angle = i * slice;

      const x = center + radius * Math.sin(angle);
      const y = center - radius * Math.cos(angle);

      gsap.set(item, {
        rotation: angle + "_rad",
        xPercent: percentageValue,
        yPercent: percentageValue,
        x,
        y,
      });
    });
  };

  window.addEventListener("load", () => {
    animation();
    gsap.set("main", { autoAlpha: 1 });
  });
}
curvedScroll();

function bullStory() {
  ScrollTrigger.create({
    trigger: "#main",
    // markers: true,
    start: "46% top",
    end: "53% top",
    pin: true,
  });
  if (window.innerWidth < 600) {
    gsap.to(".bullStoryOverlay", {
      scrollTrigger: {
        trigger: "#main",
        // markers: true,
        start: "46% top",
        end: "52% top",
        scrub: 2,
      },
      top: "60%",
    });
  } else {
    gsap.to(".bullStoryOverlay", {
      scrollTrigger: {
        trigger: "#main",
        // markers: true,
        start: "46% top",
        end: "52% top",
        scrub: 2,
      },
      top: "50%",
    });
  }
}
bullStory();

function logoShrink() {
  let section = document.getElementById("section"),
    dot = document.querySelector(".dot");
  var newImageUrl = "./images/motaroLogo.svg";
  var originalImageUrl = "./images/bull.svg";

  var bullimgElement = document.querySelector(".bullimg");

  gsap.set(dot, {
    width: "142vmax", // ensures it fills every part of the screen.
    height: "142vmax",
    xPercent: -50, // center the dot in the section area
    yPercent: -50,
    top: "50%",
    left: "50%",
    transformOrigin: "center center", // Set the transform origin to the center
  });

  let tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#main",
      start: "57.5% top",
      end: "70% top",
      // markers: true,
      scrub: 1.5,
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
    },
    defaults: { ease: "none" },
  });

  tl1.fromTo(
    dot,
    {
      scale: 0,
    },
    {
      scale: 1,
      // ease: "power3.in",
    }
  );

  if (window.innerWidth < 600) {
    tl1.to(".bullimg", { duration: 0.8, width: "55%", y: -300 }, "+.6");
    tl1.to(".bullimg", {
      duration: 0.8,
      onStart: function () {
        document.querySelector(".bullimg").src = newImageUrl;
      },
      onReverseComplete: function () {
        document.querySelector(".bullimg").src = originalImageUrl;
      },
    });
    tl1.to(".nameLogo", { duration: 0.8, y: -650 }, "+.6");
    tl1.to(".logoTextSection", { duration: 0.8, y: -600 }, "+.9");
  } else {
    tl1.to(".bullimg", { duration: 0.8, width: "15%", y: -200 }, "+.6");
    tl1.to(".bullimg", {
      duration: 0.8,
      onStart: function () {
        document.querySelector(".bullimg").src = newImageUrl;
      },
      onReverseComplete: function () {
        document.querySelector(".bullimg").src = originalImageUrl;
      },
    });
    tl1.to(".nameLogo", { duration: 0.8, y: -530 }, "+.6");
    tl1.to(".logoTextSection", { duration: 0.8, y: -450 }, "+.9");
  }

  // --------------------------------

  // --------------------------------
}
logoShrink();

function ecosystem() {
  const card1 = document.getElementById("card1");
  const card2 = document.getElementById("card2");
  card1.addEventListener("mouseenter", () => {
    card2.classList.add("nonhover-card-eco");
  });

  card1.addEventListener("mouseleave", () => {
    card2.classList.remove("nonhover-card-eco");
  });

  card2.addEventListener("mouseenter", () => {
    card1.classList.add("nonhover-card-eco");
  });

  card2.addEventListener("mouseleave", () => {
    card1.classList.remove("nonhover-card-eco");
  });
}

ecosystem();
