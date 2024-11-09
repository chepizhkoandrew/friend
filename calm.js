document.addEventListener("DOMContentLoaded", () => {
  const carouselInner = document.querySelector(".carousel-inner");
  const items = document.querySelectorAll(".carousel-item");
  let currentIndex = Math.floor(items.length / 2); // Start with the center item

  function updateCarousel() {
    items.forEach((item, index) => {
      if (index === currentIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Adjust carousel position for centered active item
    const offset = -(currentIndex - 1) * 100 / items.length; // Dynamically calculate offset
    carouselInner.style.transform = `translateX(${offset}%)`;
  }

  function handleNext() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  }

  function handlePrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  }

  document.querySelector(".nav.next").addEventListener("click", handleNext);
  document.querySelector(".nav.prev").addEventListener("click", handlePrev);

  // Initialize carousel
  updateCarousel();
});

console.log("Current Index:", currentIndex);
console.log("Active Item:", items[currentIndex]);