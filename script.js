// Efekt tła
const canvas = document.getElementById('fireCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const colors = ['#ff4500', '#ff6347', '#ff8c00', '#ffa500'];

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 10,
    radius: Math.random() * 3 + 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 1 + 0.5,
    drift: Math.random() * 1 - 0.5
  };
}

for (let i = 0; i < 150; i++) {
  particles.push(createParticle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.y -= p.speed;
    p.x += p.drift;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    if (p.y < -10) Object.assign(p, createParticle());
  });
  requestAnimationFrame(animate);
}

animate();

// Animacja wejścia dla kontenera
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const items = Array.from(container.children);

  items.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = "translateY(30px)";
  });

  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      item.style.opacity = 1;
      item.style.transform = "translateY(0)";
    }, index * 400);
  });

  const buttons = document.querySelectorAll(".button");
  buttons.forEach(button => {
    button.addEventListener("mouseenter", () => button.style.transform = "scale(1.05)");
    button.addEventListener("mouseleave", () => button.style.transform = "scale(1)");
  });
});

// Zmiana rozmiaru przy zmianie rozmiaru okna
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
