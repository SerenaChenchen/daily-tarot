// State
const state = {
  theme: null,
  question: '',
  cardCount: 3,
  drawnCards: [],
  revealedCount: 0,
  positions: [],
};

const THEME_CONFIG = {
  career:  { label: '事業 · 學業', icon: '⚡', cards: 3, positions: ['過去', '現在', '未來'],         placeholder: '例：這份工作適合我嗎？' },
  romance: { label: '感情',         icon: '🌹', cards: 3, positions: ['過去', '現在', '未來'],         placeholder: '例：我們之間有未來嗎？' },
  yesno:   { label: 'YES or NO',    icon: '✨', cards: 1, positions: ['答案'],                          placeholder: '例：我應該接受這個機會嗎？' },
  daily:   { label: '每日運勢',     icon: '🌟', cards: 3, positions: ['晨間能量', '日間挑戰', '夜間反思'], placeholder: null },
};

// ── Navigation ──────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  target.classList.add('active');
  target.scrollTop = 0;
}

// ── Screen 1: Theme ──────────────────────────────────────────
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    state.theme = theme;
    const cfg = THEME_CONFIG[theme];
    state.cardCount = cfg.cards;
    state.positions = cfg.positions;

    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    const badge = document.getElementById('selected-theme-badge');
    badge.textContent = `${cfg.icon} ${cfg.label}`;

    const input = document.getElementById('question-input');
    if (cfg.placeholder) {
      input.placeholder = cfg.placeholder;
      document.querySelector('.question-container').classList.remove('no-input');
    } else {
      input.placeholder = '';
      document.querySelector('.question-container').classList.add('no-input');
    }
    input.value = '';
    document.getElementById('char-count').textContent = '0';

    showScreen('screen-question');
  });
});

document.getElementById('back-to-theme').addEventListener('click', () => showScreen('screen-theme'));

// ── Screen 2: Question ───────────────────────────────────────
const questionInput = document.getElementById('question-input');
questionInput.addEventListener('input', () => {
  document.getElementById('char-count').textContent = questionInput.value.length;
});

document.getElementById('start-draw-btn').addEventListener('click', () => {
  state.question = questionInput.value.trim();
  startDraw();
});

// ── Screen 3: Draw ───────────────────────────────────────────
function startDraw() {
  state.drawnCards = drawCards(state.cardCount);
  state.revealedCount = 0;

  document.getElementById('drawn-cards').innerHTML = '';
  document.getElementById('reveal-btn').classList.add('hidden');
  document.getElementById('get-reading-btn').classList.add('hidden');
  document.getElementById('draw-instruction').textContent = '正在洗牌中，請靜心冥想你的問題…';

  const deckStack = document.getElementById('deck-stack');
  deckStack.querySelectorAll('.card-back').forEach(c => c.classList.remove('shuffle-anim'));

  showScreen('screen-draw');

  // Shuffle animation
  let shuffles = 0;
  const topCard = document.getElementById('top-card');

  function doShuffle() {
    if (shuffles >= 5) {
      setTimeout(() => {
        document.getElementById('draw-instruction').textContent =
          state.cardCount === 1 ? '點擊翻牌，揭曉你的答案' : `點擊翻牌，依序揭曉 ${state.cardCount} 張牌`;
        document.getElementById('reveal-btn').classList.remove('hidden');
      }, 300);
      return;
    }
    topCard.classList.add('shuffle-anim');
    setTimeout(() => {
      topCard.classList.remove('shuffle-anim');
      shuffles++;
      setTimeout(doShuffle, 150);
    }, 300);
  }

  setTimeout(doShuffle, 400);
}

document.getElementById('reveal-btn').addEventListener('click', revealNextCard);

function revealNextCard() {
  if (state.revealedCount >= state.drawnCards.length) return;

  const card = state.drawnCards[state.revealedCount];
  const position = state.positions[state.revealedCount];
  const idx = state.revealedCount;
  state.revealedCount++;

  const container = document.getElementById('drawn-cards');
  const cardEl = document.createElement('div');
  cardEl.className = 'drawn-card flip-in';
  cardEl.setAttribute('aria-label', `${position}：${card.name}，${card.reversed ? '逆位' : '正位'}`);
  cardEl.innerHTML = `
    <div class="drawn-card-inner${card.reversed ? ' reversed' : ''}">
      <div class="drawn-card-symbol" style="background:${card.color}">${card.symbol}</div>
      <div class="drawn-card-name">${card.name}</div>
      <div class="drawn-card-position">${position}</div>
      <div class="drawn-card-orientation ${card.reversed ? 'reversed-badge' : 'upright-badge'}">
        ${card.reversed ? '逆位' : '正位'}
      </div>
    </div>
  `;
  container.appendChild(cardEl);

  // Animate
  requestAnimationFrame(() => {
    setTimeout(() => cardEl.classList.remove('flip-in'), 50);
  });

  if (state.revealedCount >= state.drawnCards.length) {
    document.getElementById('reveal-btn').classList.add('hidden');
    document.getElementById('get-reading-btn').classList.remove('hidden');
    document.getElementById('draw-instruction').textContent = '牌已揭曉，準備好獲取解讀了嗎？';
  } else {
    document.getElementById('draw-instruction').textContent =
      `已翻開 ${state.revealedCount}/${state.drawnCards.length} 張，繼續翻下一張`;
  }
}

document.getElementById('get-reading-btn').addEventListener('click', () => {
  buildResultCards();
  showScreen('screen-result');
  fetchReading();
});

document.getElementById('back-to-draw').addEventListener('click', () => {
  showScreen('screen-theme');
});

// ── Screen 4: Result ─────────────────────────────────────────
function buildResultCards() {
  const container = document.getElementById('result-cards');
  container.innerHTML = '';
  state.drawnCards.forEach((card, i) => {
    const position = state.positions[i];
    const el = document.createElement('div');
    el.className = 'result-card';
    el.setAttribute('aria-label', `${position}：${card.name}，${card.reversed ? '逆位' : '正位'}`);
    el.innerHTML = `
      <div class="result-card-symbol${card.reversed ? ' reversed' : ''}" style="background:${card.color}">
        ${card.symbol}
      </div>
      <div class="result-card-name">${card.name}</div>
      <div class="result-card-position">${position}</div>
      <span class="orientation-badge ${card.reversed ? 'reversed-badge' : 'upright-badge'}">
        ${card.reversed ? '逆位' : '正位'}
      </span>
    `;
    container.appendChild(el);
  });
}

async function fetchReading() {
  const readingEl = document.getElementById('reading-content');
  readingEl.innerHTML = `
    <div class="reading-loader">
      <div class="dots"><span></span><span></span><span></span></div>
      <p>正在解讀牌義…</p>
    </div>`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch('/api/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        theme: state.theme,
        question: state.question,
        cards: state.drawnCards.map(c => ({ name: c.name, reversed: c.reversed })),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error('API 錯誤');

    readingEl.innerHTML = '';
    const textEl = document.createElement('div');
    textEl.className = 'reading-text';
    readingEl.appendChild(textEl);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') break;
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) throw new Error(parsed.error);
          if (parsed.text) {
            fullText += parsed.text;
            textEl.innerHTML = formatReading(fullText);
          }
        } catch (e) {
          if (e.message !== 'Unexpected end of JSON input') throw e;
        }
      }
    }
    window._readingText = fullText;
  } catch (err) {
    const msg = err.name === 'AbortError' ? 'AI 解讀逾時（> 15 秒），請重試' : (err.message || 'AI 解讀失敗');
    readingEl.innerHTML = `
      <div class="reading-error">
        <p>${msg}</p>
        <button class="primary-btn" onclick="fetchReading()">重新解讀</button>
      </div>`;
  }
}

function formatReading(text) {
  return text
    .replace(/【([^】]+)】/g, '<strong class="section-title">【$1】</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}

// Copy
document.getElementById('copy-btn').addEventListener('click', async () => {
  const text = window._readingText || document.getElementById('reading-content').innerText;
  try {
    await navigator.clipboard.writeText(text);
    const btn = document.getElementById('copy-btn');
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>✅</span> 已複製！';
    setTimeout(() => { btn.innerHTML = orig; }, 2000);
  } catch {
    alert('複製失敗，請手動選取文字複製');
  }
});

// Redraw
document.getElementById('redraw-btn').addEventListener('click', () => {
  showScreen('screen-theme');
});

// ── Stars background ─────────────────────────────────────────
(function createStars() {
  const container = document.querySelector('.stars');
  if (!container) return;
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      width:${Math.random() * 2 + 1}px;
      height:${Math.random() * 2 + 1}px;
      animation-delay:${Math.random() * 3}s;
      animation-duration:${2 + Math.random() * 3}s;
    `;
    container.appendChild(star);
  }
})();
