document.addEventListener("DOMContentLoaded", () => {
    const carouselInner = document.querySelector(".carousel-inner");
    const items = document.querySelectorAll(".carousel-item");
    const nextButton = document.querySelector(".nav.next");
    const prevButton = document.querySelector(".nav.prev");
    let currentIndex = 0;
  
    function updateCarousel() {
      carouselInner.style.transform = `translateX(-${currentIndex * 50}%)`; // Adjust for partial view
    }
  
    function handleClick(event) {
      const target = event.target.closest(".carousel-item");
      if (target) {
        const environment = target.dataset.environment;
        window.location.href = `/${environment}`;
      }
    }
  
    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    });
  
    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
    });
  
    items.forEach((item) => item.addEventListener("click", handleClick));
  });
  