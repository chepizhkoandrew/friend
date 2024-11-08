document.addEventListener("DOMContentLoaded", () => {
    const carouselInner = document.querySelector(".carousel-inner");
    const items = Array.from(document.querySelectorAll(".carousel-item"));
    const nextButton = document.querySelector(".nav.next");
    const prevButton = document.querySelector(".nav.prev");
    let currentIndex = 0;
  
    function updateCarousel() {
      const offset = (currentIndex * -33.3) % 100; // 33.3% for each item
      carouselInner.style.transform = `translateX(${offset}%)`;
      items.forEach((item, index) => {
        item.classList.toggle(
          "active",
          index === (currentIndex % items.length + items.length) % items.length
        );
      });
    }
  
    nextButton.addEventListener("click", () => {
      currentIndex++;
      updateCarousel();
    });
  
    prevButton.addEventListener("click", () => {
      currentIndex--;
      updateCarousel();
    });
  
    updateCarousel();
  });
  