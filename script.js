const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const randomBlinkHue = () => Math.floor(Math.random() * 360);
const setRandomBlinkColor = (element) => {
  const hue = randomBlinkHue();
  element.style.setProperty("--blink-hue", `${hue}`);
};

document.querySelectorAll(".hero-card, .timeline-item, .project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => setRandomBlinkColor(card));
  card.addEventListener("focusin", () => setRandomBlinkColor(card));
});

if (supportsFinePointer && !prefersReducedMotion) {
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  let sparkleTimeout;

  const createSparkle = (x, y) => {
    const sparkle = document.createElement("span");
    sparkle.className = "cursor-sparkle";

    const size = 4 + Math.random() * 8;
    const dx = (Math.random() - 0.5) * 32;
    const dy = (Math.random() - 0.5) * 32;
    const hue = 210 + Math.random() * 70;

    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.setProperty("--dx", `${dx}px`);
    sparkle.style.setProperty("--dy", `${dy}px`);
    sparkle.style.setProperty("--sparkle-color", `hsl(${hue} 100% 75%)`);

    document.body.appendChild(sparkle);

    sparkle.addEventListener("animationend", () => {
      sparkle.remove();
    });
  };

  window.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;

    glow.style.left = `${clientX}px`;
    glow.style.top = `${clientY}px`;
    glow.classList.add("visible");

    if (!sparkleTimeout) {
      createSparkle(clientX, clientY);
      sparkleTimeout = window.setTimeout(() => {
        sparkleTimeout = null;
      }, 24);
    }
  });

  window.addEventListener("mouseleave", () => {
    glow.classList.remove("visible");
  });
}
