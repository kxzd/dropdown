const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

// Will arrange slides to be next to eachother
const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

// Function that will move the carousel to show the first slide once ned of carousel is reached
const resetCarousel = (currentSlide, currentDot) => {
  const firstSlide = slides[0];
  const firstDot = dots[0];
  moveToSlide(track, currentSlide, firstSlide);
  updateDots(currentDot, firstDot);
};

const playCarousel = () => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  if (nextSlide === null) {
    resetCarousel(currentSlide, currentDot);
  } else {
    updateDots(currentDot, nextDot);
    moveToSlide(track, currentSlide, nextSlide);
  }
};

// -----------------EVENT LISTENERS----------------//

prevButton.addEventListener("click", () => {
  const currentSlide = track.querySelector(".current-slide");
  const previousSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;

  if (previousSlide != null) {
    moveToSlide(track, currentSlide, previousSlide);
    updateDots(currentDot, prevDot);
  } else {
    moveToSlide(track, currentSlide, slides[slides.length - 1]);
    updateDots(currentDot, dots[slides.length - 1]);
  }
});

nextButton.addEventListener("click", () => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;

  if (nextSlide != null) {
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
  } else {
    moveToSlide(track, currentSlide, slides[0]);
    updateDots(currentDot, dots[0]);
  }
});

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
});

// -----------------EVENT LISTENERS----------------//

// Module pattern that initiates the carousel
const carouselRepeater = (() => {
  const player = setInterval(playCarousel, 3000);
  nextButton.addEventListener("click", () => {
    clearInterval(player);
  });
  prevButton.addEventListener("click", () => {
    clearInterval(player);
  });
  dotsNav.addEventListener("click", () => {
    clearInterval(player);
  });
})();
