// ---------- Fireflies (animated background) ----------
const fireflyContainer = document.getElementById('fireflies');
const fireflyCount = 22;

for (let i = 0; i < fireflyCount; i++) {
  const firefly = document.createElement('span');
  firefly.className = 'firefly';
  firefly.style.left = Math.random() * 100 + 'vw';
  firefly.style.top = Math.random() * 100 + 'vh';
  firefly.style.animationDuration = (4 + Math.random() * 5) + 's';
  firefly.style.animationDelay = (Math.random() * 5) + 's';
  fireflyContainer.appendChild(firefly);
}

// ---------- Elements ----------
const frog = document.getElementById('frog');
const bubble = document.getElementById('bubble');
const bubbleText = document.getElementById('bubble-text');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const footerNote = document.getElementById('footer-note');
const answers = document.getElementById('answers');

const STATE_CLASSES = ['state-worried', 'state-sad', 'state-crying', 'state-joy'];

let isResolved = false;
let dodgeCount = 0;

const dodgeStages = [
  { state: 'state-worried', text: 'Are you sure?' },
  { state: 'state-sad', text: "Please... don't say no." },
  { state: 'state-crying', text: "I'll be really sad, Ysabella..." }
];

function setFrogState(state) {
  frog.classList.remove(...STATE_CLASSES);
  if (state) frog.classList.add(state);
}

function setBubble(text) {
  bubbleText.textContent = text;
  bubble.classList.remove('shake');
  // trigger reflow so the shake animation can replay
  void bubble.offsetWidth;
  bubble.classList.add('shake');
}

// ---------- No button dodges away on hover/touch ----------
function moveNoButton() {
  const containerRect = answers.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(containerRect.width - btnRect.width, 0);
  const maxY = Math.max(containerRect.height - btnRect.height, 0);

  const randX = Math.random() * maxX - maxX / 2;
  const randY = Math.random() * maxY - maxY / 2;

  noBtn.style.position = 'relative';
  noBtn.style.transform = `translate(${randX}px, ${randY}px)`;
}

function handleNoInteraction(e) {
  if (isResolved) return;
  if (e) e.preventDefault();

  const stage = dodgeStages[Math.min(dodgeCount, dodgeStages.length - 1)];
  setFrogState(stage.state);
  setBubble(stage.text);
  moveNoButton();
  dodgeCount++;
}

noBtn.addEventListener('mouseenter', handleNoInteraction);
noBtn.addEventListener('touchstart', handleNoInteraction);

yesBtn.addEventListener('click', () => {
  isResolved = true;
  setFrogState('state-joy');
  setBubble("I love you too, Ysabella!");
  footerNote.textContent = "the frog is proud of you 🐸💚";
  footerNote.classList.add('visible');

  noBtn.style.transition = 'opacity 0.4s ease';
  noBtn.style.opacity = '0';
  noBtn.style.pointerEvents = 'none';
});