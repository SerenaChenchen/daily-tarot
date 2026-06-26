const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const THEME_PROMPTS = {
  career: {
    name: '事業／學業',
    spread: ['過去', '現在', '未來'],
    style: '從職涯發展與個人潛力的角度出發，給予務實且鼓勵性的建議。重點放在行動方向與心態調整，而非預言結果。'
  },
  study: {
    name: '學業',
    spread: ['基礎', '挑戰', '突破'],
    style: '聚焦於學習歷程、心態與方法，給予具體可操作的學習建議，鼓勵自我成長。'
  },
  romance: {
    name: '感情',
    spread: ['過去', '現在', '未來'],
    style: '以溫柔中立的視角探索感情能量，幫助提問者理清內心感受與需求，而非預測對方行為。強調自我了解與情感成熟。'
  },
  yesno: {
    name: 'YES or NO',
    spread: ['答案'],
    style: '給出明確的傾向（YES 或 NO），並用 2-3 句話說明牌義如何支持這個答案。語氣簡潔有力。'
  },
  daily: {
    name: '每日運勢',
    spread: ['晨間能量', '日間挑戰', '夜間反思'],
    style: '以溫暖輕盈的語調描述今日能量流動，提供一個啟發性的生活視角與小行動建議。像是來自宇宙的每日訊息。'
  }
};

app.post('/api/read', async (req, res) => {
  const { theme, question, cards } = req.body;
  if (!theme || !cards || cards.length === 0) {
    return res.status(400).json({ error: '缺少必要參數' });
  }

  const themeConfig = THEME_PROMPTS[theme];
  if (!themeConfig) return res.status(400).json({ error: '無效的主題' });

  const cardDescriptions = cards.map((card, i) => {
    const position = themeConfig.spread[i] || `第 ${i + 1} 張`;
    const orientation = card.reversed ? '逆位' : '正位';
    return `【${position}】${card.name}（${orientation}）`;
  }).join('\n');

  const questionPart = question ? `提問者的問題：「${question}」` : '提問者選擇不輸入具體問題，請給予開放式的引導解讀。';

  const prompt = `你是一位溫暖、直覺、有洞見的塔羅解讀師。你的語調像是一位睿智的朋友，而非算命師。你不預言命運，而是幫助提問者從塔羅牌的象徵中找到自己內心的答案。

主題：${themeConfig.name}
解讀風格：${themeConfig.style}

${questionPart}

抽到的牌：
${cardDescriptions}

請依照以下格式提供解讀（使用繁體中文）：

${cards.map((card, i) => {
  const position = themeConfig.spread[i] || `第 ${i + 1} 張`;
  return `【${position} — ${card.name}${card.reversed ? '（逆位）' : '（正位）'}】
（2-3 句針對此牌在此位置的個人化解讀）`;
}).join('\n\n')}

【整體綜合解讀】
（4-6 句結合所有牌的整體訊息${question ? '，並直接回應提問者的問題' : ''}，最後給出一個具體的行動建議或今日關鍵詞）

注意：
- 不要說「我是 AI」或「我無法確定」
- 不要使用「命運」「注定」等宿命論語彙
- 保持溫暖、直覺、鼓勵自我探索的語調
- 總字數控制在 200-350 字之間`;

  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'AI 解讀失敗，請稍後再試' });
    } else {
      res.write(`data: ${JSON.stringify({ error: 'AI 解讀失敗，請稍後再試' })}\n\n`);
      res.end();
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
