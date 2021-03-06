let slider = document.querySelector(".slider"),
    sliderList = slider.querySelector(".slider-list"),
    sliderTrack = slider.querySelector(".slider-track"),
    slides = slider.querySelectorAll(".slide"),
    arrows = slider.querySelector(".slider-arrows"),
    prev = arrows.children[0],
    next = arrows.children[1],
    slideWidth = slides[0].offsetWidth,
    slideIndex = 0,
    posInit = 0,
    posX1 = 0,
    posX2 = 0,
    posY1 = 0,
    posY2 = 0,
    posFinal = 0,
    isSwipe = false,
    isScroll = false,
    allowSwipe = true,
    transition = true,
    nextTrf = 0,
    prevTrf = 0,
    lastTrf = --slides.length * slideWidth,
    posThreshold = slides[0].offsetWidth * 0.35,
    trfRegExp = /([-0-9.]+(?=px))/,
    getEvent = function () {
        return event.type.search("touch") !== -1 ? event.touches[0] : event;
    },
    slide = function () {
        if (transition) {
            sliderTrack.style.transition = "transform .5s";
        }
        sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

        prev.classList.toggle("disabled", slideIndex === 0);
        next.classList.toggle("disabled", slideIndex === --slides.length);
    },
    swipeStart = function () {
        let evt = getEvent();

        if (allowSwipe) {
            transition = true;

            nextTrf = (slideIndex + 1) * -slideWidth;
            prevTrf = (slideIndex - 1) * -slideWidth;

            posInit = posX1 = evt.clientX;
            posY1 = evt.clientY;

            sliderTrack.style.transition = "";

            document.addEventListener("touchmove", swipeAction);
            document.addEventListener("mousemove", swipeAction);
            document.addEventListener("touchend", swipeEnd);
            document.addEventListener("mouseup", swipeEnd);

            sliderList.classList.remove("grab");
            sliderList.classList.add("grabbing");
        }
    },
    swipeAction = function () {
        let evt = getEvent(),
            style = sliderTrack.style.transform,
            transform = +style.match(trfRegExp)[0];

        posX2 = posX1 - evt.clientX;
        posX1 = evt.clientX;

        posY2 = posY1 - evt.clientY;
        posY1 = evt.clientY;

        // ?????????????????????? ???????????????? ?????????? ?????? ????????????
        if (!isSwipe && !isScroll) {
            let posY = Math.abs(posY2);
            if (posY > 7 || posX2 === 0) {
                isScroll = true;
                allowSwipe = false;
            } else if (posY < 7) {
                isSwipe = true;
            }
        }

        if (isSwipe) {
            // ???????????? ?????????? ?????????? ???? ???????????? ????????????
            if (slideIndex === 0) {
                if (posInit < posX1) {
                    setTransform(transform, 0);
                    return;
                } else {
                    allowSwipe = true;
                }
            }

            // ???????????? ?????????? ???????????? ???? ?????????????????? ????????????
            if (slideIndex === --slides.length) {
                if (posInit > posX1) {
                    setTransform(transform, lastTrf);
                    return;
                } else {
                    allowSwipe = true;
                }
            }

            // ???????????? ?????????????????????????? ???????????? ???????????? ????????????
            if ((posInit > posX1 && transform < nextTrf) || (posInit < posX1 && transform > prevTrf)) {
                reachEdge();
                return;
            }

            // ?????????????? ??????????
            sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
        }
    },
    swipeEnd = function () {
        posFinal = posInit - posX1;

        isScroll = false;
        isSwipe = false;

        document.removeEventListener("touchmove", swipeAction);
        document.removeEventListener("mousemove", swipeAction);
        document.removeEventListener("touchend", swipeEnd);
        document.removeEventListener("mouseup", swipeEnd);

        sliderList.classList.add("grab");
        sliderList.classList.remove("grabbing");

        if (allowSwipe) {
            if (Math.abs(posFinal) > posThreshold) {
                if (posInit < posX1) {
                    slideIndex--;
                } else if (posInit > posX1) {
                    slideIndex++;
                }
            }

            if (posInit !== posX1) {
                allowSwipe = false;
                slide();
            } else {
                allowSwipe = true;
            }
        } else {
            allowSwipe = true;
        }
    },
    setTransform = function (transform, comapreTransform) {
        if (transform >= comapreTransform) {
            if (transform > comapreTransform) {
                sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
            }
        }
        allowSwipe = false;
    },
    reachEdge = function () {
        transition = false;
        swipeEnd();
        allowSwipe = true;
    };

sliderTrack.style.transform = "translate3d(0px, 0px, 0px)";
sliderList.classList.add("grab");

sliderTrack.addEventListener("transitionend", () => (allowSwipe = true));
slider.addEventListener("touchstart", swipeStart);
slider.addEventListener("mousedown", swipeStart);

arrows.addEventListener("click", function () {
    let target = event.target;

    if (target.classList.contains("next")) {
        slideIndex++;
    } else if (target.classList.contains("prev")) {
        slideIndex--;
    } else {
        return;
    }

    slide();
});

let clouse = document.querySelector(".clouse");
let popup = document.querySelector(".popup");
let btnPopup = document.querySelector(".btn-popup");

clouse.addEventListener("click", function () {
    popup.classList.add("hide");
});
btnPopup.addEventListener("click", function () {
    popup.classList.remove("hide");
});

////////////////////////////////////////////////////////////////////$Recycle.Bin

/* ???????????? ???????????? ???? ?????????????????? */
var slideIndex2x = 1;
showSlides(slideIndex2x);

/* ?????????????? ?????????????????????? ???????????? ???? 1, ???????????????????? ???????????????? ??????????*/
function plusSlide() {
    showSlides((slideIndex2x += 1));
}

/* ?????????????? ?????????????????? ???????????? ???? 1, ???????????????????? ???????????????????? ??????????*/
function minusSlide() {
    showSlides((slideIndex2x -= 1));
}

/* ?????????????????????????? ?????????????? ?????????? */
function currentSlide(n) {
    console.log("click");
    showSlides((slideIndex2x = n));
}

let homeLink = document.querySelector(".header");

homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    slideIndex = 0;
    slide();
});

let whatNext = document.querySelector("#what_next");

whatNext.addEventListener("click", (e) => {
    e.preventDefault();
    slideIndex = 1;
    slide();
});

// ?????????????????? ????????????

// let bigText = document.querySelector(".bigtext");
// let bbb = bigText.querySelector("p");
// let scrollContainer = document.querySelector(".scroll");
// let scrollTrack = document.querySelector(".scroll__track");

// let touchStartY;
// let touchCurrentY;
// let current;
// let min = 0;
// let currentTop = 0;
// let max = bbb.offsetHeight;

// bigText.addEventListener("touchstart", (e) => {
//     touchStartY = e.targetTouches[0].clientY;
// });

// bigText.addEventListener("touchmove", (e) => {
//     touchCurrentY = e.targetTouches[0].clientY;

//     // if (currentTop - (touchCurrentY - touchStartY) <= 0) currentTop = 0;
//     currentTop = Math.abs(touchCurrentY - touchStartY) - currentTop;

//     console.log(currentTop);
// });

// bigText.addEventListener("mousemove", (e) => {
//     console.log(e);
// });

/* ???????????????? ?????????????? ???????????????? */
function showSlides(n) {
    console.log(n);
    var i;
    var slides = document.getElementsByClassName("item2x");
    var dots = document.getElementsByClassName("slider-dots_item");
    if (n > slides.length) {
        slideIndex2x = 1;
    }
    if (n < 1) {
        slideIndex2x = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex2x - 1].style.display = "block";
    dots[slideIndex2x - 1].className += " active";
}
