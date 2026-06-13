// =========================
// SEARCH FUNCTION
// =========================

const searchBox = document.getElementById("searchBox");

if (searchBox) {

  searchBox.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    const seen = new Set();

document.querySelectorAll(".card, .game-card").forEach(card => {

    let text = card.innerText.toLowerCase().trim();

    if (seen.has(text)) {
        card.style.display = "none";
        return;
    }

    seen.add(text);

    if (text.includes(value)) {
        card.style.display = "";
    } else {
        card.style.display = "none";
    }

});



    });

}

// =========================
// SCROLL PROGRESS BAR
// =========================

window.addEventListener("scroll", () => {
  const scrollBar = document.getElementById("scroll-bar");
  if (!scrollBar) return;
  
  
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
  
  scrollBar.style.width =
      (scrollTop / scrollHeight) * 100 + "%";
  
  
  });
  
 // =========================
  // Arrows*************************
  // =========================
  
  document.querySelectorAll(".games-grid").forEach(grid => {

    const leftArrow = document.createElement("div");
    leftArrow.className = "slider-hint left";
    leftArrow.innerHTML = "❮";

    const rightArrow = document.createElement("div");
    rightArrow.className = "slider-hint right";
    rightArrow.innerHTML = "❯";

    const wrapper = document.createElement("div");
    wrapper.className = "slider-wrapper";

    grid.parentNode.insertBefore(wrapper, grid);
    wrapper.appendChild(leftArrow);
    wrapper.appendChild(rightArrow);
    wrapper.appendChild(grid);

});



  // =========================
  // GAMES GRID
  // =========================
  
  document.querySelectorAll(".games-grid").forEach((grid) => {
  
  
  let speed = 0;
  
  grid.addEventListener("mousemove", (e) => {
  
      const rect = grid.getBoundingClientRect();
      const x = e.clientX - rect.left;
  
      if (x < 120) {
          speed = -3;
      } else if (x > rect.width - 120) {
          speed = 3;
      } else {
          speed = 0;
      }
  });
  
  grid.addEventListener("mouseleave", () => {
      speed = 0;
  });
  
  function autoScrollGrid() {
      if (speed !== 0) {
          grid.scrollLeft += speed;
      }
      requestAnimationFrame(autoScrollGrid);
  }
  
  autoScrollGrid();
  
  grid.addEventListener("wheel", (e) => {
      e.preventDefault();
  
      grid.scrollBy({
          left: e.deltaY * 2,
          behavior: "smooth"
      });
  });
  
  
  });
  
  // =========================
  // TRENDING SLIDER
  // =========================
  
  const slider = document.getElementById("trending-slider");

  if (slider) {
  
  
      let autoSpeed = 1;
      let manualSpeed = 0;
  let paused = false;
  let touchTimeout;
  
  function loopSlider() {

    const halfWidth = slider.scrollWidth / 2;

    if (!paused) {
        slider.scrollLeft += autoSpeed;
    }

    if (manualSpeed !== 0) {
        slider.scrollLeft += manualSpeed;
    }

    if (slider.scrollLeft >= halfWidth) {
        slider.scrollLeft -= halfWidth;
    }

    if (slider.scrollLeft <= 0) {
        slider.scrollLeft += halfWidth;
    }

    requestAnimationFrame(loopSlider);
}

loopSlider();
  
  
  // PC hover pause
  
  slider.addEventListener("mouseenter", () => {
      paused = true;
  });
  
  slider.addEventListener("mouseleave", () => {
      paused = false;
      manualSpeed = 0;
  });
  
  
  // Left Right edge movement
  
  slider.addEventListener("mousemove", (e) => {
  
      const rect = slider.getBoundingClientRect();
      const x = e.clientX - rect.left;
  
      if (x < 120) {
        manualSpeed = -3;
    }
    else if (x > rect.width - 120) {
        manualSpeed = 3;
    }
    else {
        manualSpeed = 0;
    }
  });
  
  
  // Mobile touch support
  
  slider.addEventListener("touchstart", () => {
      paused = true;
  });
  
  slider.addEventListener("touchmove", () => {
      paused = true;
  
      clearTimeout(touchTimeout);
  
      touchTimeout = setTimeout(() => {
          paused = false;
      }, 3000);
  });
  
  slider.addEventListener("touchend", () => {
  
      clearTimeout(touchTimeout);
  
      touchTimeout = setTimeout(() => {
          paused = false;
      }, 3000);
  });
}