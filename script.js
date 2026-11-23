// ВПИШИ СВОЮ ДАТУ: год, месяц (номер - 1), день, час, минута
const startDate = new Date(2025, 1 - 1, 27, 21, 30);

function updateTimer() {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0)   { hours += 24;  days--; }
  if (days < 0) {
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  const totalDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
  document.getElementById('totalDays').textContent = totalDays;
}
updateTimer();
setInterval(updateTimer, 1000);

// Плавное появление
const revealItems = document.querySelectorAll('.card');
revealItems.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealItems.forEach(el => observer.observe(el));

// Сердечки
const hearts = ['❤️', '💗', '💖', '💕'];
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  const duration = 6 + Math.random() * 6;
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = 14 + Math.random() * 22 + 'px';
  heart.style.animationDuration = duration + 's';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(createHeart, 700);
// ---------- Пароль и конфетти ----------

// ВПИШИ СВОЙ ПАРОЛЬ (регистр и пробелы по краям не важны)
const PASSWORD = '27.01.2025';

const lock = document.getElementById('lock');
const passInput = document.getElementById('passInput');
const passBtn = document.getElementById('passBtn');
const errorEl = document.getElementById('error');
const lockBox = document.querySelector('.lock-box');

document.body.classList.add('locked');
passInput.focus();

function checkPassword() {
  const entered = passInput.value.trim().toLowerCase();

  if (entered === PASSWORD.toLowerCase()) {
    lock.classList.add('hide');
    document.body.classList.remove('locked');
    launchConfetti();
  } else {
    errorEl.textContent = 'Неверно, попробуй ещё раз 💔';
    lockBox.classList.remove('shake');
    void lockBox.offsetWidth; // перезапуск анимации
    lockBox.classList.add('shake');
    passInput.select();
  }
}

passBtn.addEventListener('click', checkPassword);
passInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkPassword();
});

// Конфетти
function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#f093b0', '#c471ed', '#ffd166', '#06d6a0', '#ef476f', '#ffffff'];
  const pieces = [];

  for (let i = 0; i < 220; i++) {
    pieces.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 22,
      vy: Math.random() * -18 - 4,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.3
    });
  }

  const start = performance.now();

  function frame(now) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.vy += 0.35;      // гравитация
      p.vx *= 0.99;      // сопротивление воздуха
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });

    if (now - start < 4500) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(frame);
}
// ---------- Финал ----------

// ВПИШИ СВОЁ ПИСЬМО. Перенос строки: \n
const FINAL_MESSAGE =
  'Спасибо, что ты есть.\n' +
  'С тобой любой день становится лучше.\n\n' +
  'Я люблю тебя.\n' +
  'Давид';

const finaleHeart = document.getElementById('finaleHeart');
const finaleHint = document.getElementById('finaleHint');
const finaleText = document.getElementById('finaleText');
let finaleStarted = false;

finaleHeart.addEventListener('click', () => {
  if (finaleStarted) return;
  finaleStarted = true;

  finaleHeart.classList.add('gone');
  finaleHint.classList.add('gone');
  launchConfetti();

  let i = 0;
  const timer = setInterval(() => {
    finaleText.textContent += FINAL_MESSAGE[i];
    i++;
    if (i >= FINAL_MESSAGE.length) {
      clearInterval(timer);
      setTimeout(launchConfetti, 600); // второй залп в конце письма
    }
  }, 70);
});