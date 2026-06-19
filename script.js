// =========================
// SEARCH FUNCTION
// =========================

const searchBox = document.getElementById("searchBox");
const resultsBox = document.getElementById("search-results");

searchBox.addEventListener("keyup", function () {
  const value = this.value.toLowerCase().trim();

  resultsBox.innerHTML = "";

  if (value === "") {
    resultsBox.style.display = "none";

    document
      .querySelectorAll(".category-box,.category-box-2,.category-box-6")
      .forEach((el) => (el.style.display = ""));

    document.querySelectorAll(".game-card").forEach((card) => {
      card.style.display = "";
    });

    return;
  }

  document.querySelectorAll(".game-card").forEach((card) => {
    const text = card.innerText.toLowerCase();

    const cleanText = text.replace(/\s/g, "");
    const cleanValue = value.replace(/\s/g, "");

    const matched =
      text.includes(value) ||
      value.includes(text) ||
      cleanText.includes(cleanValue) ||
      text.split(" ").some((word) => word.startsWith(cleanValue));

    if (matched) {
      resultsBox.appendChild(card.cloneNode(true));
    }
    if (resultsBox.children.length > 0) {
      resultsBox.style.display = "flex";

      resultsBox.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      resultsBox.style.display = "none";
    }
  });

  resultsBox.style.display = "flex";
  const seen = new Set();

  document.querySelectorAll(".game-card").forEach((card) => {
    let text = card.innerText.toLowerCase().trim();

    if (seen.has(text)) {
      card.style.display = "none";
      return;
    }

    seen.add(text);

    card.style.display = text.includes(value) ? "" : "none";
  });
});

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

  scrollBar.style.width = (scrollTop / scrollHeight) * 100 + "%";
});

// =========================
// Arrows*************************
// =========================

document.querySelectorAll(".games-grid").forEach((grid) => {
  if (!grid.parentNode) return;

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
      behavior: "smooth",
    });
  });
});

// =========================
// PCTRENDING SLIDER
// =========================
["trending-slider", "android-slider"].forEach((sliderId) => {
  const slider = document.getElementById(sliderId);

  if (!slider) return;

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

  slider.addEventListener("mouseenter", () => {
    paused = true;
  });

  slider.addEventListener("mouseleave", () => {
    paused = false;
    manualSpeed = 0;
  });

  slider.addEventListener("mousemove", (e) => {
    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < 120) {
      manualSpeed = -3;
    } else if (x > rect.width - 120) {
      manualSpeed = 3;
    } else {
      manualSpeed = 0;
    }
  });

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
});

// =========================
// GO TO TOP
// =========================

const goTopBtn = document.getElementById("goTop");

goTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// =========================
// HERO BACKGROUND SLIDER
// =========================

const heroBg = document.querySelector(".hero-bg");

if (heroBg) {
  const images = [
    "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4704690/163e2a742e5fb8e1f5d1e3a890da98f04ab809d4/header.jpg?t=1781108224",

    "https://image.api.playstation.com/vulcan/ap/rnd/202507/1710/ecd54be57f89360d3ef7fa6f9b52c581d93b9ab11ab9e570.png",

    "https://xboxwire.thesourcemediaassets.com/sites/2/2026/01/FH6_Evergreen_KeyArt_Branded-Horizontal_3840x2160-7591242f9c6791be6d45.jpg",

    "https://xboxwire.thesourcemediaassets.com/sites/2/2025/06/Resident-Evil-Requiem-Grace-Key-Art-8dbdf81f6b8d5d66b5f0.jpg",
    
    "https://cdn.wccftech.com/wp-content/uploads/2025/12/demo_image-HD-scaled.jpeg",




    
  ];

  let current = 0;

  heroBg.style.backgroundImage = `url(${images[0]})`;

  function changeHeroBg() {
    heroBg.style.opacity = 0.05;

    setTimeout(() => {
      current = (current + 2) % images.length;

      heroBg.style.backgroundImage = `url(${images[current]})`;

      heroBg.style.opacity = 0.8;
    }, 800);
  }

  setInterval(changeHeroBg, 6000);
}



// =========================
// JARVIS AI
// =========================


const jarvisToggle =
document.getElementById("jarvisBtn");

const jarvisChat =
document.getElementById("jarvis-chat");

const jarvisClose =
document.getElementById("jarvis-close");

const jarvisSend =
document.getElementById("jarvis-send");

const jarvisInput =
document.getElementById("jarvis-input");

const jarvisMessages =
document.getElementById("jarvis-messages");

// =========================
// OPEN CHAT
// =========================

if (jarvisToggle) {

jarvisToggle.addEventListener("click", () => {

```
jarvisChat.style.display = "flex";
```

});

}

// =========================
// CLOSE CHAT
// =========================

if (jarvisClose) {

jarvisClose.addEventListener("click", () => {

```
jarvisChat.style.display = "none";
```

});

}

// =========================
// SEND MESSAGE
// =========================

async function sendJarvisMessage() {

  const jarvisInput =
  document.getElementById("jarvis-input");
  
  const jarvisMessages =
  document.getElementById("jarvis-messages");
  
  if (!jarvisInput || !jarvisMessages) {
  console.log("Jarvis elements not found");
  return;
  }
  
  const message =
  jarvisInput.value.trim();
  
  if (!message) return;

jarvisMessages.innerHTML += `     <div class="jarvis-user">
      ${message}     </div>
  `;

jarvisInput.value = "";

jarvisMessages.innerHTML += `     <div class="jarvis-bot" id="typing">
      JARVIS is thinking...     </div>
  `;

jarvisMessages.scrollTop =
jarvisMessages.scrollHeight;

try {

const res = await fetch(
  `https://jarvis.sagarverma95604-a99.workers.dev/?q=${encodeURIComponent(message)}`
);

const data =
await res.json();

const typing =
document.getElementById("typing");

if (typing) typing.remove();

jarvisMessages.innerHTML += `
  <div class="jarvis-bot">
    ${data.answer || "No response received."}
  </div>
`;


} catch (error) {


const typing =
document.getElementById("typing");

if (typing) typing.remove();

jarvisMessages.innerHTML += `
  <div class="jarvis-bot">
    Server is currently unavailable.
  </div>
`;

console.error(error);


}

jarvisMessages.scrollTop =
jarvisMessages.scrollHeight;

}

// =========================
// SEND BUTTON
// =========================

if (jarvisSend) {

jarvisSend.addEventListener(
"click",
sendJarvisMessage
);

}

// =========================
// ENTER KEY
// =========================

if (jarvisInput) {

jarvisInput.addEventListener(
"keypress",
(e) => {

  if (e.key === "Enter") {

    sendJarvisMessage();

  }

}


);

}

// =========================
// TOOLTIP ROTATOR
// =========================

const tips = [
  "Need Help?",
  "Fix DLL Errors",
  "Linkvertise Help",
  "Game Installation",
  "Ask JARVIS"
  ];
  
  let tip = 0;
  
  setInterval(() => {
  
  const btn =
  document.getElementById("jarvisBtn");
  
  if(!btn) return;
  
  btn.setAttribute(
  "data-tooltip",
  tips[tip]
  );
  
  btn.classList.add("show-tip");
  
  setTimeout(() => {
  btn.classList.remove("show-tip");
  }, 3000);
  
  tip = (tip + 1) % tips.length;
  
  }, 7000);
  

  window.addEventListener("load", () => {

    const btn = document.getElementById("jarvisBtn");
    const chat = document.getElementById("jarvis-chat");
    const closeBtn = document.getElementById("jarvis-close");
    
    if (btn && chat) {
    btn.onclick = () => {
    chat.style.display = "flex";
    };
    }
    
    if (closeBtn && chat) {
    closeBtn.onclick = () => {
    chat.style.display = "none";
    };
    }
    
    });
    
  

  