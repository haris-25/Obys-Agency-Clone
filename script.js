let counter = document.querySelector("#counter");
let count = 0;
let tl = gsap.timeline();
const cursor = document.querySelector("#circle-cursor");
const magnetElements = document.querySelectorAll(
  ".menu-opener__square, #social-links h4",
);
const flagHeadings = document.querySelectorAll(".hero-line-3");
const videoCursor = document.querySelector("#video-cursor");
const videoContainer = document.querySelector("#video-container");
const video = document.querySelector("#obys-video");
function loaderAnimation() {
  tl.from("#loader-text h2", {
    y: 150,
    stagger: 0.3,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });
  tl.from(
    "#counter-text h3",
    {
      opacity: 0,
      duration: 1,
      delay: 0.3,
    },
    "<",
  );
  tl.from("#loader-text p", {
    opacity: 0,
  });
  const countTimer = setInterval(() => {
    counter.innerHTML = count;
    if (count < 100) {
      count++;
    } else {
      clearInterval(countTimer);
      revealMainSite();
    }
  }, 33);
}
function revealMainSite() {
  tl.to("#loader-text h2, #counter-text h3, #loader-text p", {
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.inOut",
  });
  tl.to("#loader", {
    y: "-100%",
    duration: 0.7,
    ease: "power4.out",
  });
  tl.set("#loader", { display: "none" });
  tl.fromTo(
    ".hero-line>span",
    {
      y: "100%",
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.07,
      ease: "power4.out",
    },
    "<0.1",
  );
}
function mouseAnimation() {
  const mouseCircle = document.querySelector("#circle-cursor");
  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    gsap.to(mouseCircle, {
      x: mouseX,
      y: mouseY,
      xPercent: -50,
      yPercent: -50,
      duration: 0.1,
    });
  });
}
function magnetEffect() {
  window.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    let isInsideAny = false;
    magnetElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      let centerX = rect.left + rect.width / 2;
      let centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2),
      );
      if (distance < 60) {
        isInsideAny = true;
        let deltaX = mouseX - centerX;
        let deltaY = mouseY - centerY;
        let power = el.classList.contains("menu-opener__square") ? 1 : 0.2;
        gsap.to(el, {
          x: deltaX * power,
          y: deltaY,
          duration: 0.3,
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.3,
        });
      }
    });
    gsap.to(cursor, {
      scale: isInsideAny ? 1.4 : 1,
      duration: 0.3,
    });
  });
}
function scrollTextAnimation() {
  let tl = gsap.timeline({ repeat: -1 });
  tl.to("#animating-scroll-text", {
    y: 25,
    duration: 1.2,
    ease: "power2.in",
  })
    .set("#animating-scroll-text", {
      y: -25,
    })
    .to("#animating-scroll-text", {
      y: 0,
      duration: 1,
      ease: "power2.out",
    });
    gsap.to("#animating-scroll-text", {
      scrollTrigger: {
        trigger: "#animating-scroll-text",
        start: "top 80%",
        end: "top 80%",
        scrub: 0.8,
      },
      opacity: 0,
    })
}
function flagAnimation() {
  flagHeadings.forEach((heading) => {
    heading.addEventListener("mouseenter", () => {
      gsap.to("#flag-img", { opacity: 1 });
    });
    heading.addEventListener("mouseleave", () => {
      gsap.to("#flag-img", { opacity: 0 });
    });
    heading.addEventListener("mousemove", (e) => {
      gsap.to("#flag-img", {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.3,
      });
    });
  });
}
function videoAnimation() {
  const idleOffsetY = -100;
  gsap.to("#video-cursor", {
    y: idleOffsetY,
  })
  const offsetX = -1100;
  videoContainer.addEventListener("mouseenter", ()=>{
    gsap.to(cursor, {
      opacity: 0
    })
  });
  videoContainer.addEventListener("mousemove", (e)=>{
    const rect = videoContainer.getBoundingClientRect();
    const x = e.clientX - rect.left + offsetX;
    const y = e.clientY - rect.top;
      gsap.to("#video-cursor", {
        x: x,
        y: y,
        yPercent: -50,
        duration: 0.4,
      })
    })
  videoContainer.addEventListener("mouseleave", ()=>{
    gsap.to("#video-cursor", {
      x: 0,
      y: -10,
    });
    gsap.to(cursor, {
      opacity: 1
    });
  })
  videoContainer.addEventListener("click", ()=>{
    if(video.paused){
     video.play();
     videoCursor.classList.add("is-playing");
    gsap.to(video, {
      opacity: 1,
      duration: 0.5,
    })
    gsap.to(videoCursor, {
      scale: 0.5,
      delay: 0.4,
      duration: 0.3
    })
    }
    else{
      video.pause();
      videoCursor.classList.remove("is-playing");
      gsap.to(video, {
        opacity: 0,
        duration: 0.5,
      })
      gsap.to(videoCursor, {
      scale: 1,
      duration: 0.3
    })
    }
  })
}
flagAnimation();
mouseAnimation();
loaderAnimation();
magnetEffect();
scrollTextAnimation();
videoAnimation();
