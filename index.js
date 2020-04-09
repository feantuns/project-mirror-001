const {
  useRef,
  useState,
  useEffect,
  style,
  Fragment,
  fowardRef,
  Component,
  createRef,
} = React;

const onloadAnimation = controls => {
  const tl = gsap.timeline();
  tl.fromTo(
    ".slide-number-container",
    { x: "3%" },
    { opacity: 1, x: 0, duration: 0.32 },
    "in+=0.56"
  )
    .fromTo(".slide-title", { y: "200%" }, { y: 0, duration: 0.64 }, "in")
    .to(".slide-info-container", { opacity: 1 }, "in+=0.64")
    // info box
    .to(
      ".slide-info-box",
      { "clip-path": "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
      "in+=0.64"
    )
    .to(".slide-info-box a", { opacity: 1 }, "in+=0.82")
    .to(".slide-info-box h4", { opacity: 1 }, "in+=0.82")
    // controls -
    .to(controls, { opacity: 1, duration: 0.32 }, "in+=0.64");
};

// ANIMATE SLIDE
const animateSlide = (
  titleWrap,
  numberWrap,
  setSlidingState,
  wrapTransform
) => {
  const tl = gsap.timeline();
  // hide title clip
  tl.to(
    ".slide-title",
    { "clip-path": "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)", duration: 0.32 },
    "in"
  )
    .to(
      titleWrap,
      { y: wrapTransform, duration: 0.44, ease: "power2" },
      "in+=0.32"
    )
    // animate the number container
    .to(
      numberWrap,
      { y: wrapTransform, duration: 0.4, ease: "power2" },
      "in+=0.32"
    )
    // animate the number
    .to(".slide-number", { opacity: 0, duration: 0.32 }, "in")
    // reset the number animation
    .set(".slide-number", { opacity: 1 }, "in+=0.32")
    // show title clip
    .to(".slide-title", {
      "clip-path": "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
      duration: 0.64,
    })
    // animate slide info text container
    .to(
      ".slide-info",
      { y: wrapTransform, duration: 0.32, ease: "power2" },
      "in+=0.32"
    )
    // animate info text
    .to(".slide-info", { opacity: 0, duration: 0.32 }, "in")
    .to(".slide-info", { opacity: 1, duration: 0.32 }, "in+=0.32")
    .add(setSlidingState, 1.1);
};

// ANIMATE SLIDER WHEN WXPAND BUTTON IS CLICKED
const animateSliderOut = () => {
  const tl = gsap.timeline({ onComplete: () => {} });
  tl.to(
    ".slide-title",
    {
      "clip-path": "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
      duration: 0.4,
    },
    "out"
  )
    .to(
      ".slide-number",
      {
        y: "+=100%",
      },
      "out"
    )
    .fromTo(
      ".slide-number",
      {
        "clip-path": "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
      },
      {
        "clip-path": "polygon(0% 100%, 0% 100%, 100% 100%, 100% 100%)",
        duration: 0.08,
      },
      "out"
    )
    .to(
      ".slide-info-box",
      {
        opacity: 0,
      },
      "out"
    );
};

// ANIMATE OVERLAY WHEN EXPAND BUTTON IS CLICKED
const animateOverlayIn = (overlay, navbar, setExpandingState) => {
  const tl = gsap.timeline({ delay: 0.4, onComplete: () => {} });
  tl
    // navbar
    .to(
      navbar,
      {
        y: "-100%",
      },
      "in"
    )
    // overlay
    .to(
      overlay,
      {
        autoAlpha: 1,
      },
      "in+=0.08"
    )
    .fromTo(
      ".overlay-nav-heading",
      {
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      },
      {
        "clip-path": "polyfon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.48,
        ease: "power1.inOut",
      },
      "in"
    )
    // slides
    .fromTo(
      ".overlay-slide-preview",
      {
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      },
      {
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        stagger: 0.32,
        duration: 0.8,
        ease: "expo.inOut",
      },
      "in+=0.1"
    )
    .fromTo(
      ".overlay-preview-title-text",
      {
        "clip-path": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      },
      {
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        stagger: 0.32,
        duration: 0.56,
        ease: "sine",
      },
      "in+=0.48"
    )
    .fromTo(
      ".overlay-preview-title-number",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.32,
        duration: 0.48,
      },
      "in+=0.48"
    )
    .add(setExpandingState, 1);
};

// ANIMATE THE OVERLAY QWHEN CLOSE BUTTON IS CLICKED
const animateOverlayOut = (overlay, navbar, callback) => {
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(overlay, { visbility: "hidden" });
    },
  });
  tl.to(
    ".slide-title",
    {
      "clip-path": "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
      duration: 0.64,
    },
    "in+=0.32"
  )
    .to(".slide-info-box", { opacity: 1 }, "in+=0.32")
    .to(
      ".slide-number",
      {
        "clip-path": "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
        y: "-=100%",
      },
      "in+=0.32"
    )
    .to(overlay, { opacity: 0 }, "in")
    .to(navbar, { y: 0, duration: 0.64 }, "in")
    .add(callback, 0.96);
};

// ANIMATE THE OVERLAY AND THE SLIDER WHEN OVERLAY IMAGE IS CLICKED
const animateImg = (overlay, callback, navbar) => {
  const tl = gsap.timeline({
    defaults: { duration: 0.4 },
    onComplete: () => {
      gsap.set(".overlay-preview-wrap", { clearProps: "width,x,padding" });
      gsap.set(".overlay-slide-preview", { clearProps: "margin,width,height" });
      gsap.set(".overlay-slide-container", {
        clearProps: "padding-left,height,overflow,width",
      });
      gsap.set(".overlay-slide-container", {
        clearProps: "height,overflow,width",
      });
      gsap.set(".overlay-preview-title-text", { clearProps: "clip-path,y" });
      gsap.set(".overlay-preview-title-number", { clearProps: "opacity" });
    },
  });
  tl
    // Overlay components
    .set(".overlay-slide-container", { width: "100%" }, "animate")
    .to(
      ".overlay-slide-container",
      { height: "100%", overflow: "hidden", width: "100%" },
      "animate"
    )
    .to(
      ".overlay-slide-preview",
      { margin: "0", width: "100vw", height: "100vh" },
      "animate"
    )
    // hide overlay image text
    .to(
      ".overlay-preview-title-text",
      {
        "clip-path": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        duration: 0.24,
      },
      "animate"
    )
    .to(
      ".overlay-preview-title-number",
      { opacity: 0, duration: 0.24 },
      "animate"
    )
    .to(
      overlay,
      {
        opacity: 0,
        onComplete: () => {
          gsap.set(overlay, { visbility: "hidden" });
        },
      },
      "animate+=0.32"
    )
    .add(callback, 0.72)
    // Animating the slider components
    .fromTo(
      ".slide-title",
      { "clip-path": "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)" },
      {
        "clip-path": "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
        duration: 0.64,
      },
      0.48
    )
    .fromTo(
      ".slide-number",
      { "clip-path": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
      {
        "clip-path": "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        y: "-=100%",
      },
      0.48
    )
    // show slider info box
    .to(".slide-info-box", { opacity: 1 }, 0.48)
    // animating the navbar
    .to(navbar, { y: 0 }, 0.4);
};
