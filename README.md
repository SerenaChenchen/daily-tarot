# ✦ 星語塔羅 — Vercel 部署指南

## 專案結構

```
tarot-vercel/
├── api/
│   └── tarot.js        ← 後端：保護你的 API Key，代理 Anthropic API
├── public/
│   └── index.html      ← 前端：完整占卜介面
├── vercel.json         ← Vercel 路由設定
└── README.md
```

---

## 部署步驟（約 10 分鐘）

### 步驟 1：上傳到 GitHub

1. 登入 [github.com](https://github.com)，點右上角 **+** → **New repository**
2. 取個名字（例如 `tarot-app`），選 **Private**（保護你的程式碼）
3. 建立後點 **uploading an existing file**，把這個資料夾裡所有檔案拖進去
4. 點 **Commit changes**

### 步驟 2：部署到 Vercel

1. 登入 [vercel.com](https://vercel.com)（可直接用 GitHub 帳號登入）
2. 點 **Add New Project** → 選剛才建立的 GitHub repo
3. Framework Preset 選 **Other**
4. **Root Directory** 不用改，直接點 **Deploy**

### 步驟 3：設定你的 API Key（最重要！）

部署完成後：

1. 進入你的 Vercel 專案頁面
2. 點上方 **Settings** → 左側 **Environment Variables**
3. 新增一筆：
   - **Name**：`ANTHROPIC_API_KEY`
   - **Value**：你的 API Key（`sk-ant-api03-...`）
   - **Environment**：勾選 Production / Preview / Development 全部
4. 點 **Save**
5. 回到 **Deployments** → 點最新那筆右邊的 **⋯** → **Redeploy**

### 步驟 4：自訂網址

Vercel 預設給你的網址長這樣：`your-project.vercel.app`

**改子網域名稱：**
1. 進入專案 **Settings** → **Domains**
2. 點 **Edit** 修改 `your-project` 的部分，例如改成 `tarot-rena`
3. 網址就變成 `tarot-rena.vercel.app` ✦

**綁自己買的網域（選用）：**
1. 同樣在 Domains 頁面輸入你的網域（如 `tarot.yourdomain.com`）
2. 照 Vercel 的指示去你的網域商那邊加一筆 DNS 紀錄即可

---

## 費用說明

- **Vercel 免費方案**：每月 100GB 流量、100 小時 Function 執行時間，個人使用完全夠
- **Anthropic API**：按使用量計費，每次占卜約 $0.001–0.003 USD（claude-sonnet-4-6）

---

## 你的 Key 安全嗎？

✅ API Key 只存在 Vercel 的環境變數，不會出現在任何前端程式碼  
✅ 使用者打開瀏覽器「檢視原始碼」完全看不到你的 Key  
✅ 所有 Anthropic API 呼叫都透過你的後端 `/api/tarot` 路由進行  

---

有問題的話可以回去問 Claude 🙂
