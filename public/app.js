// app.js — CineQuotes frontend

const PERSONALITIES = [
  { key: 'gangster',    emoji: '🔫', name: 'The Gangster',    hint: "Streets made me. Born for the hustle.",        accent: 'acc-gangster'    },
  { key: 'pookie',      emoji: '🥺', name: 'The Pookie',      hint: "Love, feelings & soft hours only.",             accent: 'acc-pookie'      },
  { key: 'playboy',     emoji: '😎', name: 'The Playboy',     hint: "Charming, slick & always in style.",            accent: 'acc-playboy'     },
  { key: 'sigma',       emoji: '🐺', name: 'The Sigma',       hint: "Silent, independent, lone wolf energy.",        accent: 'acc-sigma'       },
  { key: 'genz',        emoji: '✨', name: 'The Gen-Z',       hint: "Slay, no cap, it's giving main character.",    accent: 'acc-genz'        },
  { key: 'hustler',     emoji: '💰', name: 'The Hustler',     hint: "Grind now. Sleep later. Always winning.",       accent: 'acc-hustler'     },
  { key: 'philosopher', emoji: '🧠', name: 'The Philosopher', hint: "Deep thoughts, existential vibes, big brain.", accent: 'acc-philosopher' },
];

const SAMPLE_QUOTES = [
  { personality: 'gangster',    accent: 'acc-gangster',    quote: "I'm gonna make him an offer he can't refuse.",                                          movie: 'The Godfather (1972)'                     },
  { personality: 'genz',        accent: 'acc-genz',        quote: "You're Kenough.",                                                                        movie: 'Barbie (2023)'                            },
  { personality: 'sigma',       accent: 'acc-sigma',       quote: "Don't let yourself get attached to anything you are not willing to walk out on in 30 seconds flat.", movie: 'Heat (1995)'             },
  { personality: 'pookie',      accent: 'acc-pookie',      quote: "If you're a bird, I'm a bird.",                                                          movie: 'The Notebook (2004)'                      },
  { personality: 'hustler',     accent: 'acc-hustler',     quote: "Get busy living or get busy dying.",                                                     movie: 'The Shawshank Redemption (1994)'          },
  { personality: 'playboy',     accent: 'acc-playboy',     quote: "The name's Bond. James Bond.",                                                           movie: 'Casino Royale (2006)'                     },
  { personality: 'philosopher', accent: 'acc-philosopher', quote: "What is real? How do you define real?",                                                  movie: 'The Matrix (1999)'                        },
  { personality: 'genz',        accent: 'acc-genz',        quote: "That's all it is, Miles. A leap of faith.",                                              movie: 'Spider-Man: Into the Spider-Verse (2018)' },
  { personality: 'hustler',     accent: 'acc-hustler',     quote: "A million dollars isn't cool. You know what's cool? A billion dollars.",                 movie: 'The Social Network (2010)'                },
];

const TEASER = {
  gangster:    `"I'm gonna make him an offer he can't refuse." — The Godfather`,
  pookie:      `"If you're a bird, I'm a bird." — The Notebook`,
  playboy:     `"The name's Bond. James Bond." — Casino Royale`,
  sigma:       `"Don't get attached to anything you aren't willing to walk out on in 30 seconds." — Heat`,
  genz:        `"You're Kenough." — Barbie (2023)`,
  hustler:     `"Get busy living or get busy dying." — The Shawshank Redemption`,
  philosopher: `"What is real? How do you define real?" — The Matrix`,
};

// ─── State ────────────────────────────────────────────────────────────────────
let selectedPersonality = null;
const $ = id => document.getElementById(id);

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildPersonalityGrid();
  buildVibesShowcase();
  buildSamplesGrid();
  fetchStats();
  bindEvents();
  setTimeout(setupScrollAnimations, 200);
});

async function fetchStats() {
  try {
    const d = await (await fetch('/api/stats')).json();
    $('sub-count').textContent = d.subscribers ?? 0;
  } catch { $('sub-count').textContent = '0'; }
}

// ─── Step navigation ──────────────────────────────────────────────────────────
function goToStep(n) {
  [1, 2, 3].forEach(i => {
    $(`step-${i}`)?.classList.toggle('hidden', i !== n);

    const dot = $(`step-dot-${i}`);
    if (dot) {
      dot.classList.remove('active', 'done');
      if (i < n)       dot.classList.add('done');
      else if (i === n) dot.classList.add('active');
    }

    const line = $(`step-line-${i}`);
    if (line) line.classList.toggle('active', i < n);
  });

  document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ─── Personality grid ─────────────────────────────────────────────────────────
function buildPersonalityGrid() {
  const grid = $('personality-grid');
  if (!grid) return;
  grid.innerHTML = '';
  PERSONALITIES.forEach(p => {
    const card = document.createElement('div');
    card.className   = 'p-card';
    card.dataset.key = p.key;
    card.innerHTML   = `<span class="p-card-emoji">${p.emoji}</span><div class="p-card-name">${p.name}</div><div class="p-card-hint">${p.hint}</div>`;
    card.addEventListener('click', () => {
      selectedPersonality = p.key;
      document.querySelectorAll('.p-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      card.style.transform = 'scale(1.04)';
      setTimeout(() => (card.style.transform = ''), 200);
      $('btn-step2').disabled = false;
    });
    grid.appendChild(card);
  });
}

function buildVibesShowcase() {
  const c = $('vibes-showcase');
  if (!c) return;
  c.innerHTML = PERSONALITIES.map(p =>
    `<div class="vibe-pill"><span class="ve">${p.emoji}</span><div><div class="vn">${p.name}</div><div class="vc">${p.hint}</div></div></div>`
  ).join('');
}

function buildSamplesGrid() {
  const g = $('samples-grid');
  if (!g) return;
  g.innerHTML = SAMPLE_QUOTES.map(q => {
    const p = PERSONALITIES.find(x => x.key === q.personality);
    return `<div class="sample-card">
      <span class="sample-personality ${q.accent}">${p ? p.emoji + ' ' + p.name : q.personality}</span>
      <p class="sample-quote">"${q.quote}"</p>
      <p class="sample-movie">${q.movie}</p>
    </div>`;
  }).join('');
}

// ─── Events ───────────────────────────────────────────────────────────────────
function bindEvents() {
  // Step 1 → 2
  $('btn-step1').addEventListener('click', () => {
    const nickname = $('nickname').value.trim();
    const phone    = $('phone').value.trim();
    clearError($('nickname')); clearError($('phone'));
    let ok = true;
    if (!nickname || nickname.length < 2)              { showError($('nickname'), 'Enter a nickname (min 2 chars)'); ok = false; }
    if (!/^\+?\d[\d\s\-()]{6,17}$/.test(phone.trim())){ showError($('phone'),    'Enter a valid number with country code, e.g. +917xxxxxxxxx'); ok = false; }
    if (ok) goToStep(2);
  });

  $('btn-back-1').addEventListener('click', () => goToStep(1));

  // Step 2 → submit
  $('btn-step2').addEventListener('click', handleSubscribe);

  $('btn-reset').addEventListener('click', () => {
    $('nickname').value = '';
    $('phone').value    = '';
    selectedPersonality = null;
    document.querySelectorAll('.p-card').forEach(c => c.classList.remove('selected'));
    $('btn-step2').disabled = true;
    goToStep(1);
  });

  [$('nickname'), $('phone')].forEach(el => el.addEventListener('input', () => clearError(el)));
}

// ─── Submit ───────────────────────────────────────────────────────────────────
async function handleSubscribe() {
  if (!selectedPersonality) return;

  const btn      = $('btn-step2');
  const nickname = $('nickname').value.trim();
  const phone    = '+' + $('phone').value.replace(/[^\d]/g, '');

  btn.classList.add('btn-loading');
  btn.disabled = true;

  try {
    const res  = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, nickname, personality: selectedPersonality }),
    });
    const data = await res.json();

    if (data.success) {
      $('success-title').textContent = `You're in, ${nickname}! 🎉`;
      $('success-msg').textContent   = data.message;
      $('preview-quote').textContent = TEASER[selectedPersonality] || '';
      goToStep(3);
      fetchStats();
      showToast(data.waReady ? '✅ Quote sent to WhatsApp!' : '✅ Subscribed! Set up WhatsApp in .env to start sending.', data.waReady ? 'success' : 'error', 4000);
    } else {
      showToast('❌ ' + (data.message || 'Something went wrong'), 'error');
      btn.disabled = false;
    }
  } catch {
    showToast('❌ Network error — is the server running?', 'error');
    btn.disabled = false;
  } finally {
    btn.classList.remove('btn-loading');
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function showError(el, msg) {
  el.classList.add('error');
  const parent = el.closest('.input-group') || el.parentElement;
  let err = parent.querySelector('.error-text');
  if (!err) { err = Object.assign(document.createElement('span'), { className: 'error-text' }); parent.appendChild(err); }
  err.textContent = msg;
}
function clearError(el) {
  el.classList.remove('error');
  const err = (el.closest('.input-group') || el.parentElement)?.querySelector('.error-text');
  if (err) err.textContent = '';
}

let toastTimer;
function showToast(msg, type = 'success', duration = 3500) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.className = `toast ${type}`;
  requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), duration);
}

function setupScrollAnimations() {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; io.unobserve(e.target); }
  }), { threshold: 0.1 });
  document.querySelectorAll('.sample-card, .how-card').forEach((el, i) => {
    el.style.cssText = `opacity:0;transform:translateY(28px);transition:opacity 0.5s ${i*0.07}s ease,transform 0.5s ${i*0.07}s ease`;
    io.observe(el);
  });
}
