/* ===== CORAZONES ===== */
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = Array.from({ length: 50 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 20 + 22,
  speed: Math.random() * 1 + 0.6,
  color: `rgba(200,30,30,0.7)`
}));

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => {
    ctx.fillStyle = h.color;
    ctx.font = `${h.size}px Arial`;
    ctx.fillText("❤", h.x, h.y);
    h.y += h.speed;
    if (h.y > canvas.height) h.y = -10;
  });
  requestAnimationFrame(drawHearts);
}
drawHearts();

/* ===== CIELO ===== */
const skyCanvas = document.getElementById("skyCanvas");
const skyCtx = skyCanvas.getContext("2d");
let clouds = [
  { x: 400, y: 110, size: 1.2, speed: 0.18, type: 1 },
  { x: 650, y: 170, size: 0.9, speed: 0.12, type: 2 }
];


let sunRotation = 0;
let butterfly = {
  x: 100,
  y: 300,
  speed: 0.4,
  wing: 0
};



function resizeSky() {
  skyCanvas.width = window.innerWidth;
  skyCanvas.height = window.innerHeight;
}
resizeSky();

function drawSkyScene() {

  // ===== CIELO CON DEGRADADO =====
  const gradient = skyCtx.createLinearGradient(0, 0, 0, skyCanvas.height);
  gradient.addColorStop(0, "#6EC6FF");
  gradient.addColorStop(1, "#BFE9FF");

  skyCtx.fillStyle = gradient;
  skyCtx.fillRect(0, 0, skyCanvas.width, skyCanvas.height);

  // ===== SOL CON RAYOS =====
  drawSun();

  // ===== NUBES =====
  clouds.forEach(cloud => {
    drawCloud(cloud);
    cloud.x += cloud.speed;

    // Reaparecer al salir
    if (cloud.x > skyCanvas.width + 100) {
      cloud.x = -150;
    }
  });

// ===== CÉSPED ONDULADO =====
skyCtx.beginPath();
skyCtx.moveTo(0, skyCanvas.height - 120);

for (let x = 0; x <= skyCanvas.width; x += 20) {
  let y = skyCanvas.height - 120 +
          Math.sin(x * 0.02 + Date.now() * 0.002) * 6;
  skyCtx.lineTo(x, y);
}

skyCtx.lineTo(skyCanvas.width, skyCanvas.height);
skyCtx.lineTo(0, skyCanvas.height);
skyCtx.closePath();

skyCtx.fillStyle = "#4CAF50";
skyCtx.fill();

// 🌸 FLORES (JUSTO AQUÍ)
drawFlower(200, skyCanvas.height - 90);
drawFlower(350, skyCanvas.height - 80);
drawFlower(500, skyCanvas.height - 95);
function drawFlower(x, y) {

  // Tallo
  skyCtx.strokeStyle = "#2E7D32";
  skyCtx.lineWidth = 3;
  skyCtx.beginPath();
  skyCtx.moveTo(x, y);
  skyCtx.lineTo(x, y + 30);
  skyCtx.stroke();

  // Centro
  skyCtx.beginPath();
  skyCtx.arc(x, y, 6, 0, Math.PI * 2);
  skyCtx.fillStyle = "#FFD54F";
  skyCtx.fill();

  // Pétalos
  skyCtx.fillStyle = "#FF69B4";

  for (let i = 0; i < 5; i++) {
    let angle = (Math.PI * 2 / 5) * i;
    let px = x + Math.cos(angle) * 12;
    let py = y + Math.sin(angle) * 12;

    skyCtx.beginPath();
    skyCtx.arc(px, py, 6, 0, Math.PI * 2);
    skyCtx.fill();
  }
}



// 🦋 MARIPOSA
drawButterfly();
function drawButterfly() {

  skyCtx.save();
  skyCtx.translate(butterfly.x, butterfly.y);

  butterfly.wing += 0.1;
  let flap = Math.sin(butterfly.wing) * 10;

  // Ala izquierda
  skyCtx.beginPath();
  skyCtx.ellipse(-10, 0, 15, 20, flap * 0.02, 0, Math.PI * 2);
  skyCtx.fillStyle = "#BA68C8";
  skyCtx.fill();

  // Ala derecha
  skyCtx.beginPath();
  skyCtx.ellipse(10, 0, 15, 20, -flap * 0.02, 0, Math.PI * 2);
  skyCtx.fill();

  // Cuerpo
  skyCtx.fillStyle = "#5D4037";
  skyCtx.fillRect(-2, -10, 4, 20);

  skyCtx.restore();

  butterfly.x += butterfly.speed;

  if (butterfly.x > skyCanvas.width + 20) {
    butterfly.x = -20;
  }
}



// 🔁 LOOP
requestAnimationFrame(drawSkyScene);
}

function drawCloud(cloud) {

  skyCtx.save();
  skyCtx.translate(cloud.x, cloud.y);
  skyCtx.scale(cloud.size, cloud.size);

  skyCtx.fillStyle = "white";
  skyCtx.shadowColor = "rgba(0,0,0,0.1)";
  skyCtx.shadowBlur = 10;
  skyCtx.shadowOffsetY = 4;
  skyCtx.beginPath();

  if (cloud.type === 1) {
    // Nube más redonda y suave
    skyCtx.arc(0, 20, 25, 0, Math.PI * 2);
    skyCtx.arc(30, 10, 35, 0, Math.PI * 2);
    skyCtx.arc(70, 20, 25, 0, Math.PI * 2);
  } else {
    // Nube más alargada tipo viento
    skyCtx.arc(0, 25, 20, 0, Math.PI * 2);
    skyCtx.arc(25, 10, 30, 0, Math.PI * 2);
    skyCtx.arc(60, 15, 25, 0, Math.PI * 2);
    skyCtx.arc(90, 25, 20, 0, Math.PI * 2);
  }

  skyCtx.fill();
  skyCtx.restore();
}



window.addEventListener("resize", () => {
  resizeSky();
  drawSkyScene();
});

/* ===== CONTROL ===== */
const startScreen = document.getElementById("startScreen");
const scene = document.getElementById("scene");
const girl = document.querySelector(".girl");
const boy = document.querySelector(".boy");

// ===== TIEMPOS =====
const WALK_DURATION = 4000;
const FADE_DURATION = 1500;
const LEAN_DELAY = 500;


let started = false;

window.addEventListener("keydown", () => {
  if (started) return;
  started = true;

  startScreen.classList.add("fade-out");

  setTimeout(() => {
    startScreen.style.display = "none";
   scene.classList.add("active");
    drawSkyScene();

    // CAMINAN
    girl.classList.add("walk-girl");
    boy.classList.add("walk-boy");

    // Cuando terminan de caminar
    setTimeout(() => {

      // Se inclinan ligeramente
      girl.classList.add("lean");
      boy.classList.add("lean");

      // Se sonrojan
      girl.classList.add("blushing");
      boy.classList.add("blushing");

      // Levantan brazos
      girl.classList.add("holding");
      boy.classList.add("holding");

      // Esperamos un poquito antes de la nube
      setTimeout(() => {

        startKissExplosion();

        // 🎆 Después del beso → fuegos
        setTimeout(() => {
          startFireworksTransition();
        }, 2500);

      }, 600);



    }, WALK_DURATION);

 }, FADE_DURATION);

});

function startKissExplosion() {
  const container = document.getElementById("kissContainer");

  container.style.position = "absolute";
  container.style.top = "35%";
  container.style.left = "50%";
  container.style.transform = "translateX(-50%)";
  container.style.zIndex = "3";
  container.style.pointerEvents = "none";

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const kiss = document.createElement("div");
      kiss.innerText = "💋";
      kiss.style.position = "absolute";
      kiss.style.fontSize = "22px";
      kiss.style.left = (Math.random() * 400 - 200) + "px";
      kiss.style.animation = "floatKiss 2.5s ease-out forwards";

      container.appendChild(kiss);

      setTimeout(() => kiss.remove(), 2500);

    }, i * 80);
  }
}

function drawSun() {

  const sunX = skyCanvas.width - 120;
  const sunY = 100;

  skyCtx.save();
  skyCtx.translate(sunX, sunY);
  skyCtx.rotate(sunRotation);

  // Rayos
  for (let i = 0; i < 12; i++) {
    skyCtx.rotate(Math.PI / 6);
    skyCtx.beginPath();
    skyCtx.moveTo(60, 0);
    skyCtx.lineTo(80, 0);
    skyCtx.strokeStyle = "#FFD700";
    skyCtx.lineWidth = 4;
    skyCtx.stroke();
  }

  skyCtx.restore();

  // Círculo central
  skyCtx.beginPath();
  skyCtx.arc(sunX, sunY, 50, 0, Math.PI * 2);
  skyCtx.fillStyle = "#FFD700";
  skyCtx.fill();

  sunRotation += 0.002; // velocidad suave
}
/* ===== TRANSICIÓN FUEGOS ARTIFICIALES ===== */

const fireworksCanvas = document.getElementById("fireworksCanvas");
const fwCtx = fireworksCanvas.getContext("2d");

fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

let fireworks = [];

function startFireworksTransition() {

  setTimeout(() => {

    const scene2 = document.getElementById("scene");
    const scene3 = document.getElementById("scene3");

    // Ocultamos escena 2
    scene2.classList.remove("active");
    scene2.classList.add("hidden");

    // Mostramos escena 3
    scene3.classList.remove("hidden");
    scene3.classList.add("active");

    // 🔥 AQUÍ arrancan los volcanes
    volcanoInterval = setInterval(createVolcanoExplosion, 600);

  }, 3000);

}


function createExplosion(x, y) {
  for (let i = 0; i < 40; i++) {
    fireworks.push({
      x: x,
      y: y,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 4 + 2,
      radius: 3,
      alpha: 1
    });
  }
}

function animateFireworks() {
  fwCtx.fillStyle = "rgba(0,0,0,0.2)";
  fwCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

  fireworks.forEach((p, index) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= 0.02;

    fwCtx.beginPath();
    fwCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    fwCtx.fillStyle = `rgba(255,${Math.random()*255},0,${p.alpha})`;
    fwCtx.fill();

    if (p.alpha <= 0) {
      fireworks.splice(index, 1);
    }
  });

  if (fireworks.length > 0) {
    requestAnimationFrame(animateFireworks);
  }
}
/* ===== ESCENA 3 BOTONES ===== */

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

// FUNCIÓN EMOJIS
function spawnEmoji(emoji) {
  const e = document.createElement("div");
  e.innerText = emoji;
  e.style.position = "fixed";
  e.style.left = Math.random() * window.innerWidth + "px";
  e.style.top = Math.random() * window.innerHeight + "px";
  e.style.fontSize = "30px";
  e.style.zIndex = "30";
  e.style.pointerEvents = "none";
  e.style.animation = "floatEmoji 1.5s ease-out forwards";

  document.body.appendChild(e);

  setTimeout(() => e.remove(), 1500);
}

// EXPLOSIÓN DE CORAZONES
function heartExplosion() {
  for (let i = 0; i < 15; i++) {

    const heart = document.createElement("div");
    heart.innerText = "💘";
    heart.style.position = "fixed";
    heart.style.left = window.innerWidth / 2 + "px";
    heart.style.top = window.innerHeight / 2 + "px";
    heart.style.fontSize = "25px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "25";

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 200;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    heart.animate([
      { transform: "translate(0,0)", opacity: 1 },
      { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
    ], {
      duration: 1000,
      easing: "ease-out"
    });

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
  }
}

// BOTÓN NO HUYE
noBtn.addEventListener("mouseenter", () => {

  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 50);

  noBtn.style.position = "fixed";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  spawnEmoji("😂");
  spawnEmoji("⚠️");
  heartExplosion();
});

// BOTÓN SÍ → ESCENA 4
yesBtn.addEventListener("click", () => {

  clearInterval(volcanoInterval);

  const paper = document.createElement("div");
  paper.classList.add("paper-transition");
  document.body.appendChild(paper);

  setTimeout(() => {

    const scene3 = document.getElementById("scene3");
    const scene4 = document.getElementById("scene4");

    scene3.classList.remove("active");
    scene3.classList.add("hidden");

    scene4.classList.remove("hidden");
    scene4.classList.add("active");
    setTimeout(() => {
      animateLetter();
    }, 100);


  }, 1100);
});

let heartInterval;

function spawnHeartExplosion() {
  for (let i = 0; i < 6; i++) {

    const heart = document.createElement("div");
    heart.innerText = "💘";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = Math.random() * window.innerHeight + "px";
    heart.style.fontSize = "24px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1";
    heart.style.animation = "floatEmoji 2s ease-out forwards";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
  }
}


let volcanoInterval;
function createVolcanoExplosion() {

  const box = document.querySelector(".valentine-box");
  const boxRect = box.getBoundingClientRect();

  let x, y;
  let insideBox = true;

  while (insideBox) {

    x = Math.random() * window.innerWidth;
    y = Math.random() * window.innerHeight;

    insideBox =
      x > boxRect.left &&
      x < boxRect.right &&
      y > boxRect.top &&
      y < boxRect.bottom;
  }

  for (let i = 0; i < 8; i++) {

    const heart = document.createElement("div");
    heart.innerHTML = "💘";

    heart.style.position = "absolute";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.fontSize = "24px";
    heart.style.pointerEvents = "none";
    heart.style.animation = "volcanoPop 1s ease-out forwards";

    document.getElementById("scene3").appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
}


/* ===== ROSAS CAYENDO ESCENA 4 ===== */

function createRose() {

  const scene4 = document.getElementById("scene4");
  if (!scene4.classList.contains("active")) return;

  const rose = document.createElement("div");
  rose.innerHTML = "🌹";

  rose.style.position = "fixed";
  rose.style.left = Math.random() * window.innerWidth + "px";
  rose.style.top = "-30px";
  rose.style.fontSize = "24px";
  rose.style.animation = "fallRose 6s linear forwards";
  rose.style.pointerEvents = "none";

  document.body.appendChild(rose);

  setTimeout(() => rose.remove(), 6000);
}

setInterval(createRose, 300);
/* ===== ACTIVAR ANIMACIÓN CARTA AL ENTRAR ESCENA 4 ===== */
function animateLetter() {
  const envelope = document.querySelector(".envelope");
  if (!envelope) return;

  console.log("SE ESTA EJECUTANDO animateLetter");

  envelope.classList.add("open");
}

