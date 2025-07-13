const slidesContainer = document.querySelector(".slideshow");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let slideIndex = 0;
let autoSlideInterval = null;

function updateDots(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function showSlide(index) {
  const slideWidth = slidesContainer.clientWidth;
  slidesContainer.scrollTo({
    left: index * slideWidth,
    behavior: 'smooth',
  });
  updateDots(index);
  slideIndex = index;
}

function autoAdvanceSlides() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

// Starte Auto-Slideshow
autoSlideInterval = setInterval(autoAdvanceSlides, 4000);

// Benutzersteuerung: Bei Scroll Slide erkennen
slidesContainer.addEventListener("scroll", () => {
  const scrollLeft = slidesContainer.scrollLeft;
  const slideWidth = slidesContainer.clientWidth;
  const index = Math.round(scrollLeft / slideWidth);
  if (index !== slideIndex) {
    slideIndex = index;
    updateDots(index);
  }
});

// Optional: Auto-Wechsel stoppen bei Nutzeraktion (Touch oder Maus)
["mousedown", "touchstart"].forEach(evt => {
  slidesContainer.addEventListener(evt, () => {
    clearInterval(autoSlideInterval);
  });
});
