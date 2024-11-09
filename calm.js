document.addEventListener("DOMContentLoaded", () => {
  const carouselInner = document.querySelector(".carousel-inner");
  const items = Array.from(document.querySelectorAll(".carousel-item"));
  const nextButton = document.querySelector(".nav.next");
  const prevButton = document.querySelector(".nav.prev");

  let currentIndex = Math.floor(items.length / 2); // Start with the center item
  let isAnimating = false; // Prevent multiple clicks during animation

  // Clone items for seamless looping
  const firstClone = items[0].cloneNode(true);
  const lastClone = items[items.length - 1].cloneNode(true);
  carouselInner.appendChild(firstClone);
  carouselInner.insertBefore(lastClone, items[0]);

  // Update items list after cloning
  const updatedItems = Array.from(carouselInner.children);

  function updateCarousel() {
    if (isAnimating) return; // Prevent animation conflicts
    isAnimating = true;

    updatedItems.forEach((item, index) => {
      if (index === currentIndex + 1) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    const offset = -(currentIndex + 1) * 33.33; // Adjust offset for the active item
    carouselInner.style.transition = "transform 0.5s ease-in-out";
    carouselInner.style.transform = `translateX(${offset}%)`;

    // Reset position for seamless looping
    carouselInner.addEventListener("transitionend", () => {
      if (currentIndex === -1) {
        currentIndex = items.length - 1;
        carouselInner.style.transition = "none";
        carouselInner.style.transform = `translateX(-${(currentIndex + 1) * 33.33}%)`;
      } else if (currentIndex === items.length) {
        currentIndex = 0;
        carouselInner.style.transition = "none";
        carouselInner.style.transform = `translateX(-${(currentIndex + 1) * 33.33}%)`;
      }
      isAnimating = false;
    });
  }

  function handleNext() {
    if (isAnimating) return;
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  }

  function handlePrev() {
    if (isAnimating) return;
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  }

  nextButton.addEventListener("click", handleNext);
  prevButton.addEventListener("click", handlePrev);

  // Initialize carousel
  updateCarousel();
});
