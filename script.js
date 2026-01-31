let counter = document.querySelector("#counter");
let count = 0;
let tl = gsap.timeline();
function loaderAnimation(){
    tl.from("#loader-text h2", {
        y: 150,
        stagger: 0.3,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
    tl.from("#counter-text h3", {
        opacity: 0,
        duration: 1,
        delay: 0.3
    }, "<")
    tl.from("#loader-text p", {
        opacity: 0,
    });
    const countTimer = setInterval(()=>{
    counter.innerHTML = count;
    if(count<100){
        count++
    }
    else{
        clearInterval(countTimer);
        revealMainSite();
    }
}, 10);
}
function revealMainSite(){
    tl.to("#loader-text h2, #counter-text h3, #loader-text p", {
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.inOut"
    });
    tl.to("#loader", {
        y: "-100%",
        duration: 0.7,
        ease: "power4.out",
    });
    tl.set("#loader", {display: "none"});
    tl.fromTo(".hero-line>span", {
        y: "100%",
        opacity: 0,
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.07,
        ease: "power4.out"
    }, "<0.1");
}
loaderAnimation();