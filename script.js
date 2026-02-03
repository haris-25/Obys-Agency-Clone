let counter = document.querySelector("#counter");
let count = 0;
let tl = gsap.timeline();
const cursor = document.querySelector("#circle-cursor");
const magnetElements = document.querySelectorAll(".menu-opener__square, #social-links h4");
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
function mouseAnimation(){
  const mouseCircle = document.querySelector("#circle-cursor");
  window.addEventListener("mousemove", (event)=>{
    mouseX = event.clientX;
    mouseY = event.clientY;
    gsap.to(mouseCircle, {
      x: mouseX,
      y: mouseY,
      xPercent: -50,
      yPercent: -50,
      duration: 0.1
    })
  })
}
function magnetEffect() {
  window.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    let isInsideAny = false;
    magnetElements.forEach((el)=>{const rect = el.getBoundingClientRect();
    let centerX = rect.left + rect.width / 2;
    let centerY = rect.top + rect.height / 2;
    const distance = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2),
    );
    if(distance<60){
      isInsideAny = true;
      let deltaX = mouseX - centerX;
      let deltaY = mouseY - centerY;
      let power = el.classList.contains("menu-opener__square") ? 1 : 0.2;
        gsap.to(el, {
            x: deltaX*power,
            y: deltaY,
            duration: 0.3
        });
    }
    else{
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.3,
        });
    }
});
  gsap.to(cursor, {
    scale: isInsideAny ? 1.4 : 1,
    duration: 0.3
  });
});
}
mouseAnimation();
loaderAnimation();
magnetEffect();
