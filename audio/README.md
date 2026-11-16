# 注音標準發音資料夾（`audio/`）

## 內建標準音檔來源與授權

本資料夾已內建 **全部 37 個注音符號標準教師發音檔（`ㄅ.wav` ～ `ㄥ.wav`）**：

- **資料來源**：中華民國教育部《國語注音符號手冊》  
  https://language.moe.gov.tw/001/Upload/files/site_content/M0001/juyin/html_ch/index.html
- **授權條款**：創用 CC－姓名標示－禁止改作 3.0 臺灣版（CC BY-ND 3.0 TW）  
  https://creativecommons.org/licenses/by-nd/3.0/tw/
- **使用須知**：本手冊原始 `.wav` 檔依授權「禁止改作」條款維持原檔未修改收錄。

---

## 三層發音優先順序

當點擊注音符號時，系統會依下列順序自動選擇音源：

1. **自訂極輕短拚讀錄音 `audio/<符號>.mp3`**（最高優先權，若未來您自行錄製 `ㄅ.mp3` 放入並列入 `manifest.json`，會優先蓋過 `.wav`）
2. **官方標準正音 `audio/<符號>.wav`**（目前已完整收錄 37 個符號）
3. **台灣繁中語音合成 `zh-TW SpeechSynthesis`**（僅當上述音檔無法讀取時自動降級使用）

## 若日後新增自訂 `.mp3` 更新流程

1. 將檔案命名為 `<符號>.mp3`（例如 `ㄅ.mp3`）放進此 `audio/` 資料夾。
2. 在本機開發伺服器可直接自動掃描生效；若部署於 GitHub Pages 等純靜態網站，請同步將檔名加入 `audio/manifest.json` 的 `files` 陣列即可。
