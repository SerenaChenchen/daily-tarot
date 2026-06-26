// 78-card Rider-Waite Tarot deck
const TAROT_DECK = [
  // Major Arcana (22)
  { id: 0,  name: '愚者',       suit: 'major', symbol: '🌟', color: '#f0e6ff' },
  { id: 1,  name: '魔術師',     suit: 'major', symbol: '⚡', color: '#ffe6f0' },
  { id: 2,  name: '女祭司',     suit: 'major', symbol: '🌙', color: '#e6f0ff' },
  { id: 3,  name: '女皇',       suit: 'major', symbol: '🌹', color: '#f0ffe6' },
  { id: 4,  name: '皇帝',       suit: 'major', symbol: '👑', color: '#fff0e6' },
  { id: 5,  name: '教皇',       suit: 'major', symbol: '🗝️', color: '#fef9e7' },
  { id: 6,  name: '戀人',       suit: 'major', symbol: '💫', color: '#ffe6e6' },
  { id: 7,  name: '戰車',       suit: 'major', symbol: '🌠', color: '#e6f7ff' },
  { id: 8,  name: '力量',       suit: 'major', symbol: '🦁', color: '#fff7e6' },
  { id: 9,  name: '隱者',       suit: 'major', symbol: '🕯️', color: '#f0f0f0' },
  { id: 10, name: '命運之輪',   suit: 'major', symbol: '☯️', color: '#f5e6ff' },
  { id: 11, name: '正義',       suit: 'major', symbol: '⚖️', color: '#e6ffe6' },
  { id: 12, name: '倒吊人',     suit: 'major', symbol: '💧', color: '#e6f0ff' },
  { id: 13, name: '死神',       suit: 'major', symbol: '🌑', color: '#e8e8e8' },
  { id: 14, name: '節制',       suit: 'major', symbol: '🌊', color: '#e6fff9' },
  { id: 15, name: '惡魔',       suit: 'major', symbol: '🔥', color: '#ffe6e6' },
  { id: 16, name: '塔',         suit: 'major', symbol: '⚡', color: '#fff3e6' },
  { id: 17, name: '星星',       suit: 'major', symbol: '⭐', color: '#e6f0ff' },
  { id: 18, name: '月亮',       suit: 'major', symbol: '🌕', color: '#f0e6ff' },
  { id: 19, name: '太陽',       suit: 'major', symbol: '☀️', color: '#fffde6' },
  { id: 20, name: '審判',       suit: 'major', symbol: '🎺', color: '#fff0e6' },
  { id: 21, name: '世界',       suit: 'major', symbol: '🌍', color: '#e6fff0' },

  // Wands (14)
  { id: 22, name: '權杖首牌',   suit: 'wands', symbol: '🔥', color: '#fff3e6' },
  { id: 23, name: '權杖二',     suit: 'wands', symbol: '🔥', color: '#fff3e6' },
  { id: 24, name: '權杖三',     suit: 'wands', symbol: '🔥', color: '#fff3e6' },
  { id: 25, name: '權杖四',     suit: 'wands', symbol: '🔥', color: '#fff3e6' },
  { id: 26, name: '權杖五',     suit: 'wands', symbol: '🔥', color: '#fff3e6' },
  { id: 27, name: '權杖六',     suit: 'wands', symbol: '🔥', color: '#fff3e6' },
  { id: 28, name: '權杖七',     suit: 'wands', symbol: '🔥', color: '#fff3e6' },
  { id: 29, name: '權杖八',     suit: 'wands', symbol: '🔥', color: '#fff3e6' },
  { id: 30, name: '權杖九',     suit: 'wands', symbol: '🔥', color: '#fff3e6' },
  { id: 31, name: '權杖十',     suit: 'wands', symbol: '🔥', color: '#fff3e6' },
  { id: 32, name: '權杖侍者',   suit: 'wands', symbol: '🔥', color: '#fff3e6' },
  { id: 33, name: '權杖騎士',   suit: 'wands', symbol: '🔥', color: '#fff3e6' },
  { id: 34, name: '權杖皇后',   suit: 'wands', symbol: '🔥', color: '#fff3e6' },
  { id: 35, name: '權杖國王',   suit: 'wands', symbol: '🔥', color: '#fff3e6' },

  // Cups (14)
  { id: 36, name: '聖杯首牌',   suit: 'cups', symbol: '💧', color: '#e6f0ff' },
  { id: 37, name: '聖杯二',     suit: 'cups', symbol: '💧', color: '#e6f0ff' },
  { id: 38, name: '聖杯三',     suit: 'cups', symbol: '💧', color: '#e6f0ff' },
  { id: 39, name: '聖杯四',     suit: 'cups', symbol: '💧', color: '#e6f0ff' },
  { id: 40, name: '聖杯五',     suit: 'cups', symbol: '💧', color: '#e6f0ff' },
  { id: 41, name: '聖杯六',     suit: 'cups', symbol: '💧', color: '#e6f0ff' },
  { id: 42, name: '聖杯七',     suit: 'cups', symbol: '💧', color: '#e6f0ff' },
  { id: 43, name: '聖杯八',     suit: 'cups', symbol: '💧', color: '#e6f0ff' },
  { id: 44, name: '聖杯九',     suit: 'cups', symbol: '💧', color: '#e6f0ff' },
  { id: 45, name: '聖杯十',     suit: 'cups', symbol: '💧', color: '#e6f0ff' },
  { id: 46, name: '聖杯侍者',   suit: 'cups', symbol: '💧', color: '#e6f0ff' },
  { id: 47, name: '聖杯騎士',   suit: 'cups', symbol: '💧', color: '#e6f0ff' },
  { id: 48, name: '聖杯皇后',   suit: 'cups', symbol: '💧', color: '#e6f0ff' },
  { id: 49, name: '聖杯國王',   suit: 'cups', symbol: '💧', color: '#e6f0ff' },

  // Swords (14)
  { id: 50, name: '寶劍首牌',   suit: 'swords', symbol: '💨', color: '#f0f0f0' },
  { id: 51, name: '寶劍二',     suit: 'swords', symbol: '💨', color: '#f0f0f0' },
  { id: 52, name: '寶劍三',     suit: 'swords', symbol: '💨', color: '#f0f0f0' },
  { id: 53, name: '寶劍四',     suit: 'swords', symbol: '💨', color: '#f0f0f0' },
  { id: 54, name: '寶劍五',     suit: 'swords', symbol: '💨', color: '#f0f0f0' },
  { id: 55, name: '寶劍六',     suit: 'swords', symbol: '💨', color: '#f0f0f0' },
  { id: 56, name: '寶劍七',     suit: 'swords', symbol: '💨', color: '#f0f0f0' },
  { id: 57, name: '寶劍八',     suit: 'swords', symbol: '💨', color: '#f0f0f0' },
  { id: 58, name: '寶劍九',     suit: 'swords', symbol: '💨', color: '#f0f0f0' },
  { id: 59, name: '寶劍十',     suit: 'swords', symbol: '💨', color: '#f0f0f0' },
  { id: 60, name: '寶劍侍者',   suit: 'swords', symbol: '💨', color: '#f0f0f0' },
  { id: 61, name: '寶劍騎士',   suit: 'swords', symbol: '💨', color: '#f0f0f0' },
  { id: 62, name: '寶劍皇后',   suit: 'swords', symbol: '💨', color: '#f0f0f0' },
  { id: 63, name: '寶劍國王',   suit: 'swords', symbol: '💨', color: '#f0f0f0' },

  // Pentacles (14)
  { id: 64, name: '星幣首牌',   suit: 'pentacles', symbol: '🌿', color: '#e6ffe6' },
  { id: 65, name: '星幣二',     suit: 'pentacles', symbol: '🌿', color: '#e6ffe6' },
  { id: 66, name: '星幣三',     suit: 'pentacles', symbol: '🌿', color: '#e6ffe6' },
  { id: 67, name: '星幣四',     suit: 'pentacles', symbol: '🌿', color: '#e6ffe6' },
  { id: 68, name: '星幣五',     suit: 'pentacles', symbol: '🌿', color: '#e6ffe6' },
  { id: 69, name: '星幣六',     suit: 'pentacles', symbol: '🌿', color: '#e6ffe6' },
  { id: 70, name: '星幣七',     suit: 'pentacles', symbol: '🌿', color: '#e6ffe6' },
  { id: 71, name: '星幣八',     suit: 'pentacles', symbol: '🌿', color: '#e6ffe6' },
  { id: 72, name: '星幣九',     suit: 'pentacles', symbol: '🌿', color: '#e6ffe6' },
  { id: 73, name: '星幣十',     suit: 'pentacles', symbol: '🌿', color: '#e6ffe6' },
  { id: 74, name: '星幣侍者',   suit: 'pentacles', symbol: '🌿', color: '#e6ffe6' },
  { id: 75, name: '星幣騎士',   suit: 'pentacles', symbol: '🌿', color: '#e6ffe6' },
  { id: 76, name: '星幣皇后',   suit: 'pentacles', symbol: '🌿', color: '#e6ffe6' },
  { id: 77, name: '星幣國王',   suit: 'pentacles', symbol: '🌿', color: '#e6ffe6' },
];

function drawCards(count) {
  const deck = [...TAROT_DECK];
  const drawn = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * deck.length);
    const card = { ...deck[idx], reversed: Math.random() < 0.5 };
    deck.splice(idx, 1);
    drawn.push(card);
  }
  return drawn;
}
