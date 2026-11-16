(() => {
  'use strict';

  const DATA = window.ZHUYIN_DATA;
  const STORAGE_KEY = 'zhuyin_island_state_v1';
  const QUIZ_LENGTH = 5;

  // ===== 應用程式狀態 =====
  const state = {
    mode: 'cards',
    group: 'all',
    currentSymbol: 'ㄅ',
    stars: 0,
    unlocked: false,
    audioUnlocked: false,
    availableMp3s: new Set(),
    voices: [],
    selectedVoice: null,
    crayonColor: DATA.CRAYON_COLORS[0].hex,
    showStrokeGuide: true,
    strokesHistory: [], // Array of { color, points: [{x,y}] normalized 0..1 }
    quizType: 'single',
    quizQuestions: [],
    quizIndex: 0,
    quizTransitioning: false,
    diagFilter: 'all',
    mathTargetA: 12,
    mathTargetB: 9,
    pendingUnlockAction: null
  };

  // ===== DOM 快取 =====
  const el = {
    starCount: document.getElementById('star-count'),
    audioUnlockBtn: document.getElementById('audio-unlock-btn'),
    audioUnlockLabel: document.getElementById('audio-unlock-label'),
    heroUnlockBtn: document.getElementById('hero-unlock-btn'),
    welcomeBanner: document.getElementById('welcome-banner'),
    openAudioPanelBtn: document.getElementById('open-audio-panel-btn'),
    trialLockToggle: document.getElementById('trial-lock-toggle'),
    lockToggleIcon: document.getElementById('lock-toggle-icon'),
    lockToggleLabel: document.getElementById('lock-toggle-label'),
    pwaInstallBtn: document.getElementById('pwa-install-btn'),
    openIosPwaBtn: document.getElementById('open-ios-pwa-btn'),
    srLive: document.getElementById('sr-live'),

    modeTabs: Array.from(document.querySelectorAll('.mode-tab')),
    panels: {
      cards: document.getElementById('view-cards'),
      write: document.getElementById('view-write'),
      quiz: document.getElementById('view-quiz')
    },

    // Cards mode
    groupFilterBar: document.querySelector('.group-filter-bar'),
    cardSubgroup: document.getElementById('card-subgroup'),
    cardAudioSource: document.getElementById('card-audio-source'),
    bigCardPlayBtn: document.getElementById('big-card-play-btn'),
    cardSymbol: document.getElementById('card-symbol'),
    cardIllustration: document.getElementById('card-illustration'),
    cardWordRuby: document.getElementById('card-word-ruby'),
    cardAltWord: document.getElementById('card-alt-word'),
    playWordBtn: document.getElementById('play-word-btn'),
    gotoWriteBtn: document.getElementById('goto-write-btn'),
    cardPrevBtn: document.getElementById('card-prev-btn'),
    cardNextBtn: document.getElementById('card-next-btn'),
    cardProgressText: document.getElementById('card-progress-text'),
    trialNotice: document.getElementById('trial-notice'),
    cardsSymbolGrid: document.getElementById('cards-symbol-grid'),

    // Write mode
    writeCurrentSymbol: document.getElementById('write-current-symbol'),
    writeTitle: document.getElementById('write-title'),
    writeStrokeHint: document.getElementById('write-stroke-hint'),
    writeSpeakBtn: document.getElementById('write-speak-btn'),
    toggleStrokeGuideBtn: document.getElementById('toggle-stroke-guide-btn'),
    canvasFrame: document.getElementById('canvas-frame'),
    guideCanvas: document.getElementById('write-guide-canvas'),
    drawCanvas: document.getElementById('write-draw-canvas'),
    writeStampOverlay: document.getElementById('write-stamp-overlay'),
    crayonPalette: document.getElementById('crayon-palette'),
    writeUndoBtn: document.getElementById('write-undo-btn'),
    writeClearBtn: document.getElementById('write-clear-btn'),
    writeFinishBtn: document.getElementById('write-finish-btn'),
    writePrevBtn: document.getElementById('write-prev-btn'),
    writeNextBtn: document.getElementById('write-next-btn'),
    writeSymbolGrid: document.getElementById('write-symbol-grid'),

    // Quiz mode
    quizTypePills: Array.from(document.querySelectorAll('.quiz-type-pill')),
    toneQuizLockIcon: document.getElementById('tone-quiz-lock-icon'),
    blendQuizLockIcon: document.getElementById('blend-quiz-lock-icon'),
    quizActiveBox: document.getElementById('quiz-active-box'),
    quizCompleteBox: document.getElementById('quiz-complete-box'),
    quizSteps: document.getElementById('quiz-steps'),
    quizStepLabel: document.getElementById('quiz-step-label'),
    quizPlayBtn: document.getElementById('quiz-play-btn'),
    quizPromptText: document.getElementById('quiz-prompt-text'),
    quizClueBox: document.getElementById('quiz-clue-box'),
    quizFeedback: document.getElementById('quiz-feedback'),
    quizOptionsGrid: document.getElementById('quiz-options-grid'),
    quizReplayBtn: document.getElementById('quiz-replay-btn'),
    quizBackCardsBtn: document.getElementById('quiz-back-cards-btn'),

    // Dialogs
    parentGateDialog: document.getElementById('parent-gate-dialog'),
    parentGateReason: document.getElementById('parent-gate-reason'),
    parentMathForm: document.getElementById('parent-math-form'),
    mathQuestionText: document.getElementById('math-question-text'),
    mathAnswerInput: document.getElementById('math-answer'),
    mathError: document.getElementById('math-error'),
    buyoutPanel: document.getElementById('buyout-panel'),
    unlockCodeForm: document.getElementById('unlock-code-form'),
    unlockCodeInput: document.getElementById('unlock-code-input'),
    unlockError: document.getElementById('unlock-error'),

    audioDiagDialog: document.getElementById('audio-diag-dialog'),
    ttsVoiceStatus: document.getElementById('tts-voice-status'),
    diagFilterBtns: Array.from(document.querySelectorAll('.diag-filter-btn')),
    rescanAudioBtn: document.getElementById('rescan-audio-btn'),
    audioDiagList: document.getElementById('audio-diag-list'),

    iosPwaDialog: document.getElementById('ios-pwa-dialog')
  };

  // ===== 工具與持久化 =====
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (typeof parsed.stars === 'number' && parsed.stars >= 0) state.stars = parsed.stars;
      if (typeof parsed.unlocked === 'boolean') state.unlocked = parsed.unlocked;
      if (typeof parsed.showStrokeGuide === 'boolean') state.showStrokeGuide = parsed.showStrokeGuide;
      if (typeof parsed.currentSymbol === 'string' && getSymbolData(parsed.currentSymbol)) {
        if (state.unlocked || getSymbolData(parsed.currentSymbol).isFree) {
          state.currentSymbol = parsed.currentSymbol;
        }
      }
    } catch (_) {
      // Safari 無痕模式等限制下優雅忽略
    }
  }

  function saveState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          stars: state.stars,
          unlocked: state.unlocked,
          showStrokeGuide: state.showStrokeGuide,
          currentSymbol: state.currentSymbol
        })
      );
    } catch (_) {
      // 忽略寫入失敗
    }
  }

  function announce(msg) {
    el.srLive.textContent = '';
    requestAnimationFrame(() => {
      el.srLive.textContent = msg;
    });
  }

  function getSymbolData(sym) {
    return DATA.SYMBOLS.find((item) => item.symbol === sym);
  }

  function isSymbolAccessible(symObj) {
    return Boolean(state.unlocked || symObj.isFree);
  }

  function getFilteredSymbols() {
    if (state.group === 'all') return DATA.SYMBOLS;
    return DATA.SYMBOLS.filter((item) => item.group === state.group);
  }

  function getAccessibleSymbols() {
    return DATA.SYMBOLS.filter(isSymbolAccessible);
  }

  // ===== 雙層音訊與 Web Audio 正向音效引擎 =====
  let audioCtx = null;
  let activeAudioEl = null;

  function ensureAudioContext() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!audioCtx) audioCtx = new Ctx();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playTone(freq, startTime, duration, type = 'triangle', peakGain = 0.16) {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  function playTapChime() {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    playTone(587.33, now, 0.12, 'sine', 0.11);
  }

  function playSuccessChime() {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      playTone(freq, now + idx * 0.075, 0.28, 'triangle', 0.15);
    });
  }

  function playVictoryFanfare() {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 659.25, 1046.5].forEach((freq, idx) => {
      playTone(freq, now + idx * 0.1, 0.36, 'triangle', 0.18);
    });
  }

  function playGentleTrySound() {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    playTone(349.23, now, 0.11, 'sine', 0.09);
    playTone(293.66, now + 0.09, 0.14, 'sine', 0.08);
  }

  function refreshVoices() {
    if (!('speechSynthesis' in window)) {
      el.ttsVoiceStatus.textContent = '此瀏覽器不支援 SpeechSynthesis，建議將錄製的 MP3 放入 audio/ 資料夾。';
      return;
    }
    const allVoices = window.speechSynthesis.getVoices() || [];
    state.voices = allVoices;
    const twVoices = allVoices.filter((v) => /zh[-_]?tw|taiwan/i.test(v.lang) || /mei[-_]?jia|繁體|臺灣|台灣/i.test(v.name));
    const preferred =
      twVoices.find((v) => /mei|google|國語|台灣|臺灣|hsiao|yun/i.test(v.name)) ||
      twVoices[0] ||
      allVoices.find((v) => /^zh/i.test(v.lang)) ||
      null;
    state.selectedVoice = preferred;

    if (preferred) {
      el.ttsVoiceStatus.textContent = `已偵測到語音引擎：「${preferred.name}」（${preferred.lang}）`;
    } else if (allVoices.length === 0) {
      el.ttsVoiceStatus.textContent = '尚未回報本機語音清單（或於無聲環境執行中），程式將自動嘗試 zh-TW 朗讀。';
    } else {
      el.ttsVoiceStatus.textContent = '未找到專屬 zh-TW 語音，將以語言標籤 zh-TW 嘗試朗讀。';
    }
  }

  async function scanAudioFolder() {
    if (!location.protocol.startsWith('http')) return;
    const found = new Set();

    // 1. 讀取靜態站台通用的 audio/manifest.json（GitHub Pages 等不開放目錄列舉也能正常偵測且零 404）
    try {
      const mRes = await fetch('./audio/manifest.json', { cache: 'no-store' });
      if (mRes.ok) {
        const mJson = await mRes.json();
        if (mJson && Array.isArray(mJson.files)) {
          mJson.files.forEach((f) => {
            if (typeof f === 'string' && f.endsWith('.mp3')) {
              found.add(f.slice(0, -4));
            }
          });
        }
      }
    } catch (_) {
      // 忽略清單解析失敗
    }

    // 2. 本機 / 區網開發伺服器自動掃描目錄列舉
    const isLocalHost =
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1' ||
      /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(location.hostname);
    if (isLocalHost) {
      try {
        const res = await fetch('./audio/', { cache: 'no-store' });
        if (res.ok) {
          const text = await res.text();
          const regex = /href="([^"]+?\.mp3)"/gi;
          let match;
          while ((match = regex.exec(text)) !== null) {
            try {
              const decoded = decodeURIComponent(match[1]).split('/').pop();
              if (decoded && decoded.endsWith('.mp3')) {
                found.add(decoded.slice(0, -4));
              }
            } catch (_) {
              // 忽略異常編碼檔名
            }
          }
        }
      } catch (_) {
        // 離線或靜態伺服器禁止目錄列舉時靜默跳過
      }
    }

    state.availableMp3s = found;
  }

  function unlockAudio(silent = false) {
    const ctx = ensureAudioContext();
    if (ctx) {
      try {
        const buf = ctx.createBuffer(1, 1, 22050);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.connect(ctx.destination);
        src.start(0);
      } catch (_) {}
    }

    if ('speechSynthesis' in window) {
      refreshVoices();
      try {
        window.speechSynthesis.cancel();
      } catch (_) {}
    }

    if (!state.audioUnlocked) {
      state.audioUnlocked = true;
      el.audioUnlockBtn.classList.add('is-awake');
      el.audioUnlockLabel.textContent = '已喚醒聲音 ✨';
      el.welcomeBanner.hidden = true;
      if (!silent) {
        playSuccessChime();
        speakSymbol(getSymbolData(state.currentSymbol), { delayMs: 260 });
      }
    }
  }

  function speakText(text, rate = 0.82) {
    unlockAudio(true);
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'zh-TW';
      if (state.selectedVoice) utt.voice = state.selectedVoice;
      utt.rate = rate;
      utt.pitch = 1.05;
      window.speechSynthesis.speak(utt);
    } catch (_) {
      // 無人介面或無 TTS 環境安全降級
    }
  }

  function speakSymbol(symObj, { delayMs = 0, forceTts = false } = {}) {
    if (!symObj) return 'tts';
    unlockAudio(true);

    if (activeAudioEl) {
      try {
        activeAudioEl.pause();
        activeAudioEl.currentTime = 0;
      } catch (_) {}
      activeAudioEl = null;
    }

    if (!forceTts && state.availableMp3s.has(symObj.symbol)) {
      const mp3Url = `./audio/${encodeURIComponent(symObj.symbol)}.mp3`;
      const audio = new Audio(mp3Url);
      activeAudioEl = audio;
      audio.play().catch(() => {
        speakText(symObj.ttsApprox, 0.78);
      });
      return 'mp3';
    }

    if (delayMs > 0) {
      setTimeout(() => speakText(symObj.ttsApprox, 0.78), delayMs);
    } else {
      speakText(symObj.ttsApprox, 0.78);
    }
    return 'tts';
  }

  // ===== 台灣直式注音排版元件產生器 =====
  function createRubyWordElement(rubyList) {
    const wrap = document.createElement('div');
    wrap.className = 'tw-ruby-word';

    rubyList.forEach((charObj) => {
      const charBox = document.createElement('span');
      charBox.className = 'tw-ruby-char';

      const han = document.createElement('span');
      han.className = 'tw-han';
      han.textContent = charObj.han;

      const col = document.createElement('span');
      col.className = 'tw-bopomofo-col';

      if (charObj.tone === '˙') {
        const dot = document.createElement('span');
        dot.className = 'tw-tone-light';
        dot.textContent = '˙';
        col.appendChild(dot);
      }

      const len = charObj.zhuyin.length;
      charObj.zhuyin.forEach((zh, idx) => {
        const isLast = idx === len - 1;
        const glyph = document.createElement('span');
        glyph.className = 'tw-zh-glyph';
        if (idx === charObj.focusIdx) glyph.classList.add('is-target');
        glyph.textContent = zh;

        if (isLast && (charObj.tone === 'ˊ' || charObj.tone === 'ˇ' || charObj.tone === 'ˋ')) {
          const lastWrap = document.createElement('span');
          lastWrap.className = 'tw-zh-last-wrap';
          lastWrap.appendChild(glyph);
          const toneSide = document.createElement('span');
          toneSide.className = 'tw-tone-side';
          toneSide.textContent = charObj.tone;
          lastWrap.appendChild(toneSide);
          col.appendChild(lastWrap);
        } else {
          col.appendChild(glyph);
        }
      });

      charBox.appendChild(han);
      charBox.appendChild(col);
      wrap.appendChild(charBox);
    });

    return wrap;
  }

  // ===== 繪本背景 SVG 小裝飾產生器 =====
  function buildStoryIllustration(symObj) {
    el.cardIllustration.replaceChildren();
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('class', 'illustration-svg-bg');
    svg.setAttribute('aria-hidden', 'true');

    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', '50');
    circle.setAttribute('cy', '50');
    circle.setAttribute('r', '42');
    circle.setAttribute('fill', symObj.group === 'initials' ? '#fff3d6' : symObj.group === 'single_medials' ? '#e7f5ea' : '#e7f2fc');
    svg.appendChild(circle);

    const sparkle = document.createElementNS(ns, 'circle');
    sparkle.setAttribute('cx', '80');
    sparkle.setAttribute('cy', '20');
    sparkle.setAttribute('r', '6');
    sparkle.setAttribute('fill', '#ffcf56');
    svg.appendChild(sparkle);

    const emojiSpan = document.createElement('span');
    emojiSpan.className = 'illustration-emoji';
    emojiSpan.textContent = symObj.emoji;

    el.cardIllustration.appendChild(svg);
    el.cardIllustration.appendChild(emojiSpan);
  }

  // ===== 原生 Dialog 管理與閉合清理 =====
  function openModal(dialogEl) {
    if (!dialogEl.open) {
      dialogEl.showModal();
    }
  }

  function setupDialogs() {
    document.querySelectorAll('dialog').forEach((dialogEl) => {
      dialogEl.addEventListener('close', () => {
        dialogEl.returnValue = '';
      });

      // Fallback: 支援不支援 closedby="any" 的瀏覽器（含 Safari）點擊背景關閉
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        let downOutside = false;
        dialogEl.addEventListener('pointerdown', (e) => {
          downOutside = e.target === dialogEl;
        });
        dialogEl.addEventListener('pointerup', (e) => {
          if (downOutside && e.target === dialogEl) {
            dialogEl.close('backdrop');
          }
          downOutside = false;
        });
      }
    });

    document.querySelectorAll('[data-close-dialog]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.closeDialog);
        if (target && target.open) target.close('cancel');
      });
    });
  }

  // ===== 家長驗證閘道與買斷解鎖流程 =====
  function generateMathChallenge() {
    state.mathTargetA = Math.floor(Math.random() * 12) + 8; // 8~19
    state.mathTargetB = Math.floor(Math.random() * 10) + 4; // 4~13
    el.mathQuestionText.textContent = `${state.mathTargetA} + ${state.mathTargetB} = ?`;
  }

  function clearFieldError(inputEl, errorEl) {
    inputEl.classList.remove('is-invalid');
    inputEl.setAttribute('aria-invalid', 'false');
    errorEl.textContent = '';
  }

  function setFieldError(inputEl, errorEl, msg) {
    inputEl.classList.add('is-invalid');
    inputEl.setAttribute('aria-invalid', 'true');
    errorEl.textContent = msg;
  }

  function openParentGate(reasonText, pendingAction = null) {
    state.pendingUnlockAction = pendingAction;
    el.parentGateReason.textContent = reasonText;
    generateMathChallenge();

    el.parentMathForm.hidden = false;
    el.buyoutPanel.hidden = true;
    el.mathAnswerInput.value = '';
    el.unlockCodeInput.value = '';
    clearFieldError(el.mathAnswerInput, el.mathError);
    clearFieldError(el.unlockCodeInput, el.unlockError);

    openModal(el.parentGateDialog);
    requestAnimationFrame(() => el.mathAnswerInput.focus());
  }

  function setupParentGateForms() {
    el.mathAnswerInput.addEventListener('input', () => {
      clearFieldError(el.mathAnswerInput, el.mathError);
    });

    el.unlockCodeInput.addEventListener('input', () => {
      clearFieldError(el.unlockCodeInput, el.unlockError);
    });

    el.parentMathForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const raw = el.mathAnswerInput.value.trim();
      const expected = state.mathTargetA + state.mathTargetB;
      const numericVal = Number(raw);

      if (!raw || !/^\d+$/.test(raw)) {
        setFieldError(el.mathAnswerInput, el.mathError, '請輸入數字答案，例如：' + expected);
        el.mathAnswerInput.focus();
        return;
      }

      if (numericVal !== expected) {
        setFieldError(
          el.mathAnswerInput,
          el.mathError,
          `算術答案不正確，再算一次 ${state.mathTargetA} + ${state.mathTargetB} 等於多少？`
        );
        el.mathAnswerInput.select();
        return;
      }

      clearFieldError(el.mathAnswerInput, el.mathError);
      el.parentMathForm.hidden = true;
      el.buyoutPanel.hidden = false;
      requestAnimationFrame(() => el.unlockCodeInput.focus());
    });

    el.unlockCodeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = el.unlockCodeInput.value.trim().toUpperCase();
      if (!code) {
        setFieldError(el.unlockCodeInput, el.unlockError, '請先輸入體驗解鎖碼（測試碼：DEMO2026）。');
        el.unlockCodeInput.focus();
        return;
      }

      if (code !== DATA.DEMO_UNLOCK_CODE) {
        setFieldError(el.unlockCodeInput, el.unlockError, '體驗碼不符！請輸入測試專用體驗碼：DEMO2026');
        el.unlockCodeInput.select();
        return;
      }

      clearFieldError(el.unlockCodeInput, el.unlockError);
      state.unlocked = true;
      saveState();
      el.parentGateDialog.close('unlocked');
      playVictoryFanfare();
      renderAll();

      if (typeof state.pendingUnlockAction === 'function') {
        const fn = state.pendingUnlockAction;
        state.pendingUnlockAction = null;
        fn();
      }
      announce('已成功解鎖全部 37 個注音符號與挑戰關卡！');
    });
  }

  // ===== 發音檢查面板（37 音測試與 MP3 需求報告） =====
  function getRiskLabel(risk) {
    if (risk === 'high') return { cls: 'risk-high', text: '🔴 高失真・優先補錄 MP3' };
    if (risk === 'medium') return { cls: 'risk-medium', text: '🟠 中度・建議補錄 MP3' };
    return { cls: 'risk-low', text: '🟢 低風險・TTS 較準' };
  }

  function renderAudioDiagPanel() {
    el.audioDiagList.replaceChildren();
    const list = DATA.SYMBOLS.filter((item) => {
      if (state.diagFilter === 'all') return true;
      return item.distortionRisk === state.diagFilter;
    });

    list.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'diag-row';

      const main = document.createElement('div');
      main.className = 'diag-row-main';

      const symBadge = document.createElement('div');
      symBadge.className = 'diag-sym';
      symBadge.textContent = item.symbol;

      const meta = document.createElement('div');
      meta.className = 'diag-meta';

      const tags = document.createElement('div');
      tags.className = 'diag-tags';

      const hasMp3 = state.availableMp3s.has(item.symbol);
      const sourceTag = document.createElement('span');
      sourceTag.className = 'risk-pill ' + (hasMp3 ? 'risk-low' : 'risk-medium');
      sourceTag.textContent = hasMp3 ? `🎵 已偵測 ${item.mp3Hint}` : `🗣️ TTS 模擬「${item.ttsApprox}」（未置入 MP3）`;

      const riskMeta = getRiskLabel(item.distortionRisk);
      const riskTag = document.createElement('span');
      riskTag.className = `risk-pill ${riskMeta.cls}`;
      riskTag.textContent = riskMeta.text;

      tags.appendChild(sourceTag);
      tags.appendChild(riskTag);

      const note = document.createElement('p');
      note.className = 'diag-note';
      note.textContent = `${item.subGroup} · 詞彙：${item.word} — ${item.ttsNote}`;

      meta.appendChild(tags);
      meta.appendChild(note);
      main.appendChild(symBadge);
      main.appendChild(meta);

      const actions = document.createElement('div');
      actions.className = 'diag-actions';
      const testBtn = document.createElement('button');
      testBtn.type = 'button';
      testBtn.className = 'kid-btn kid-btn-secondary';
      testBtn.textContent = '🔊 試聽';
      testBtn.addEventListener('click', () => {
        speakSymbol(item);
      });

      actions.appendChild(testBtn);
      row.appendChild(main);
      row.appendChild(actions);
      el.audioDiagList.appendChild(row);
    });
  }

  // ===== 模式切換與頁首狀態渲染 =====
  function switchMode(newMode) {
    state.mode = newMode;
    el.modeTabs.forEach((tab) => {
      const active = tab.dataset.mode === newMode;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    Object.entries(el.panels).forEach(([key, panel]) => {
      panel.hidden = key !== newMode;
    });

    if (newMode === 'write') {
      requestAnimationFrame(() => {
        resizeCanvasLayers();
        renderWriteView();
      });
    } else if (newMode === 'quiz' && state.quizQuestions.length === 0) {
      startQuizRound(state.quizType);
    }
  }

  function renderHeaderAndLocks() {
    el.starCount.textContent = String(state.stars);

    if (state.unlocked) {
      el.trialLockToggle.setAttribute('aria-pressed', 'false');
      el.lockToggleIcon.textContent = '🔓';
      el.lockToggleLabel.textContent = '完整版已解鎖（點擊重置鎖定）';
      el.trialNotice.textContent = '已解鎖全部 37 個注音符號與全關卡！盡情學習吧！';
      el.toneQuizLockIcon.textContent = '🎶';
      el.blendQuizLockIcon.textContent = '🧱';
    } else {
      el.trialLockToggle.setAttribute('aria-pressed', 'true');
      el.lockToggleIcon.textContent = '🔒';
      el.lockToggleLabel.textContent = `試玩鎖定中（前 ${DATA.FREE_COUNT} 音）`;
      el.trialNotice.textContent = `前 ${DATA.FREE_COUNT} 個聲母（ㄅ～ㄌ）免費試玩，點擊後方鎖定符號可測試家長閘道與 DEMO2026 解鎖`;
      el.toneQuizLockIcon.textContent = '🔒';
      el.blendQuizLockIcon.textContent = '🔒';
    }
  }

  // ===== 模式一：認讀卡片渲染 =====
  function renderGroupFilters() {
    el.groupFilterBar.replaceChildren();
    DATA.GROUPS.forEach((grp) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-pill' + (state.group === grp.id ? ' is-active' : '');
      btn.setAttribute('aria-pressed', state.group === grp.id ? 'true' : 'false');

      const labelSpan = document.createElement('span');
      labelSpan.textContent = grp.label;
      const countSpan = document.createElement('span');
      countSpan.className = 'filter-count';
      countSpan.textContent = grp.badge;

      btn.appendChild(labelSpan);
      btn.appendChild(countSpan);
      btn.addEventListener('click', () => {
        state.group = grp.id;
        const filtered = getFilteredSymbols();
        if (!filtered.some((s) => s.symbol === state.currentSymbol)) {
          const firstOpen = filtered.find(isSymbolAccessible);
          if (firstOpen) state.currentSymbol = firstOpen.symbol;
        }
        renderCardsView();
      });
      el.groupFilterBar.appendChild(btn);
    });
  }

  function selectSymbol(symObj, { speak = true } = {}) {
    if (!isSymbolAccessible(symObj)) {
      openParentGate(`「${symObj.symbol}」屬於完整版符號，請家長完成驗證後體驗一次買斷解鎖！`, () => {
        selectSymbol(symObj, { speak });
      });
      return;
    }

    state.currentSymbol = symObj.symbol;
    state.strokesHistory = [];
    el.writeStampOverlay.hidden = true;
    saveState();

    renderCardsView();
    if (state.mode === 'write') {
      renderWriteView();
      redrawDrawLayer();
    }

    if (speak) {
      playTapChime();
      speakSymbol(symObj);
    }
  }

  function renderSymbolGrid(container, list, compact = false) {
    container.replaceChildren();
    list.forEach((item) => {
      const accessible = isSymbolAccessible(item);
      const active = state.currentSymbol === item.symbol;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'symbol-tile' + (active ? ' is-active' : '') + (!accessible ? ' is-locked' : '');
      btn.setAttribute(
        'aria-label',
        accessible ? `${item.symbol}，${item.word}` : `${item.symbol}，已鎖定，需家長驗證解鎖`
      );
      if (active) btn.setAttribute('aria-current', 'true');

      const symSpan = document.createElement('span');
      symSpan.textContent = item.symbol;
      btn.appendChild(symSpan);

      const badge = document.createElement('span');
      badge.className = 'tile-badge ' + (accessible ? 'tile-free-badge' : 'tile-lock-badge');
      badge.textContent = accessible ? (compact ? '●' : item.word.slice(0, 2)) : '🔒 鎖定';
      btn.appendChild(badge);

      btn.addEventListener('click', () => {
        selectSymbol(item, { speak: true });
      });
      container.appendChild(btn);
    });
  }

  function renderCardsView() {
    renderGroupFilters();
    const symObj = getSymbolData(state.currentSymbol) || DATA.SYMBOLS[0];
    const hasMp3 = state.availableMp3s.has(symObj.symbol);

    el.cardSubgroup.textContent = symObj.subGroup;
    el.cardAudioSource.textContent = hasMp3
      ? `🎵 播放真人錄音 (${symObj.mp3Hint})`
      : `🗣️ 台灣語音模擬「${symObj.ttsApprox}」${symObj.distortionRisk === 'high' ? '・建議補錄 MP3' : ''}`;
    el.cardAudioSource.classList.toggle('meta-badge-mp3', hasMp3);

    el.cardSymbol.textContent = symObj.symbol;
    buildStoryIllustration(symObj);

    el.cardWordRuby.replaceChildren(createRubyWordElement(symObj.wordRuby));
    el.cardAltWord.textContent = `聯想詞彙：${symObj.word} ${symObj.emoji} ／ ${symObj.altWord} ${symObj.altEmoji}`;

    const idx = DATA.SYMBOLS.findIndex((s) => s.symbol === symObj.symbol);
    el.cardProgressText.textContent = `第 ${idx + 1} / ${DATA.SYMBOLS.length} 個符號`;

    const filtered = getFilteredSymbols();
    renderSymbolGrid(el.cardsSymbolGrid, filtered, false);
  }

  function stepSymbol(delta) {
    const list = DATA.SYMBOLS;
    const curIdx = list.findIndex((s) => s.symbol === state.currentSymbol);
    const nextIdx = (curIdx + delta + list.length) % list.length;
    selectSymbol(list[nextIdx], { speak: true });
  }

  // ===== 模式二：Retina Canvas 九宮格防捲動手寫板 =====
  let activePointerId = null;
  let currentStroke = null;
  let canvasLogicalSize = 360;

  function renderCrayonPalette() {
    el.crayonPalette.replaceChildren();
    DATA.CRAYON_COLORS.forEach((c) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'crayon-btn';
      btn.setAttribute('aria-pressed', state.crayonColor === c.hex ? 'true' : 'false');

      const dot = document.createElement('span');
      dot.className = 'crayon-dot';
      dot.style.setProperty('--crayon-hex', c.hex);

      const name = document.createElement('span');
      name.textContent = c.name;

      btn.appendChild(dot);
      btn.appendChild(name);
      btn.addEventListener('click', () => {
        state.crayonColor = c.hex;
        renderCrayonPalette();
      });
      el.crayonPalette.appendChild(btn);
    });
  }

  function resizeCanvasLayers() {
    const size = Math.max(240, Math.round(el.canvasFrame.clientWidth));
    if (!size) return;
    canvasLogicalSize = size;
    const dpr = Math.max(window.devicePixelRatio || 1, 2);

    [el.guideCanvas, el.drawCanvas].forEach((canvas) => {
      const targetW = Math.round(size * dpr);
      const targetH = Math.round(size * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });

    drawGuideLayer();
    redrawDrawLayer();
  }

  function drawArrowHead(ctx, fromX, fromY, toX, toY, size) {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - size * Math.cos(angle - Math.PI / 6), toY - size * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - size * Math.cos(angle + Math.PI / 6), toY - size * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  }

  function drawGuideLayer() {
    const ctx = el.guideCanvas.getContext('2d');
    const S = canvasLogicalSize;
    ctx.clearRect(0, 0, S, S);

    // 1. 護眼田字格與九宮格虛線
    ctx.save();
    ctx.strokeStyle = 'rgba(196, 98, 66, 0.28)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([7, 7]);

    // 十字田字中線
    ctx.beginPath();
    ctx.moveTo(S / 2, 12);
    ctx.lineTo(S / 2, S - 12);
    ctx.moveTo(12, S / 2);
    ctx.lineTo(S - 12, S / 2);
    ctx.stroke();

    // 細緻九宮格三等分輔助線
    ctx.strokeStyle = 'rgba(196, 98, 66, 0.14)';
    ctx.setLineDash([4, 6]);
    [S / 3, (S * 2) / 3].forEach((pos) => {
      ctx.beginPath();
      ctx.moveTo(pos, 14);
      ctx.lineTo(pos, S - 14);
      ctx.moveTo(14, pos);
      ctx.lineTo(S - 14, pos);
      ctx.stroke();
    });
    ctx.restore();

    // 2. 半透明標準注音描紅底字
    const symObj = getSymbolData(state.currentSymbol) || DATA.SYMBOLS[0];
    ctx.save();
    ctx.fillStyle = 'rgba(59, 42, 26, 0.15)';
    ctx.font = `700 ${Math.round(S * 0.64)}px "BiauKai", "DFKai-SB", "Kaiti TC", "TW-Kai", "PingFang TC", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(symObj.symbol, S / 2, S / 2 + S * 0.02);
    ctx.restore();

    // 3. 筆順編號與方向虛線箭頭
    if (state.showStrokeGuide && Array.isArray(symObj.strokes)) {
      const palette = ['#d94f2b', '#1e6b46', '#1e5f8a', '#9e4d96'];
      symObj.strokes.forEach((stroke, idx) => {
        const pts = stroke.points.map(([px, py]) => [(px / 100) * S, (py / 100) * S]);
        if (pts.length < 2) return;
        const color = palette[idx % palette.length];

        ctx.save();
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.62;
        ctx.lineWidth = Math.max(2.5, S * 0.008);
        ctx.setLineDash([6, 5]);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i][0], pts[i][1]);
        }
        ctx.stroke();

        ctx.setLineDash([]);
        const last = pts[pts.length - 1];
        const prev = pts[pts.length - 2];
        drawArrowHead(ctx, prev[0], prev[1], last[0], last[1], Math.max(9, S * 0.032));

        // 筆畫起筆編號圓牌
        ctx.globalAlpha = 0.92;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pts[0][0], pts[0][1], Math.max(10, S * 0.032), 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fffdf9';
        ctx.font = `800 ${Math.round(Math.max(11, S * 0.036))}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(idx + 1), pts[0][0], pts[0][1] + 0.5);
        ctx.restore();
      });
    }
  }

  function renderStrokePath(ctx, points, color, S) {
    if (!points || points.length === 0) return;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(10, S * 0.048);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (points.length === 1) {
      ctx.beginPath();
      ctx.arc(points[0].x * S, points[0].y * S, ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x * S, points[0].y * S);
    for (let i = 1; i < points.length - 1; i++) {
      const midX = ((points[i].x + points[i + 1].x) / 2) * S;
      const midY = ((points[i].y + points[i + 1].y) / 2) * S;
      ctx.quadraticCurveTo(points[i].x * S, points[i].y * S, midX, midY);
    }
    const last = points[points.length - 1];
    ctx.lineTo(last.x * S, last.y * S);
    ctx.stroke();
    ctx.restore();
  }

  function redrawDrawLayer() {
    const ctx = el.drawCanvas.getContext('2d');
    const S = canvasLogicalSize;
    ctx.clearRect(0, 0, S, S);
    state.strokesHistory.forEach((st) => {
      renderStrokePath(ctx, st.points, st.color, S);
    });
    if (currentStroke) {
      renderStrokePath(ctx, currentStroke.points, currentStroke.color, S);
    }
  }

  function getNormalizedPoint(clientX, clientY) {
    const rect = el.drawCanvas.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    return { x, y };
  }

  function setupCanvasEvents() {
    const canvas = el.drawCanvas;

    const ro = new ResizeObserver(() => resizeCanvasLayers());
    ro.observe(el.canvasFrame);

    // 雙重防護：touch-action: none + touchstart/touchmove preventDefault 徹底鎖死 iOS Safari 畫面捲動
    canvas.addEventListener(
      'touchstart',
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );
    canvas.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );

    canvas.addEventListener(
      'pointerdown',
      (e) => {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        e.preventDefault();
        if (activePointerId !== null) return;
        activePointerId = e.pointerId;
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch (_) {}
        el.writeStampOverlay.hidden = true;
        currentStroke = {
          color: state.crayonColor,
          points: [getNormalizedPoint(e.clientX, e.clientY)]
        };
        redrawDrawLayer();
      },
      { passive: false }
    );

    canvas.addEventListener(
      'pointermove',
      (e) => {
        if (e.pointerId !== activePointerId || !currentStroke) return;
        e.preventDefault();
        const pt = getNormalizedPoint(e.clientX, e.clientY);
        const last = currentStroke.points[currentStroke.points.length - 1];
        const dx = pt.x - last.x;
        const dy = pt.y - last.y;
        if (dx * dx + dy * dy > 0.000015) {
          currentStroke.points.push(pt);
          redrawDrawLayer();
        }
      },
      { passive: false }
    );

    const endStroke = (e) => {
      if (e.pointerId !== activePointerId) return;
      e.preventDefault();
      if (currentStroke) {
        state.strokesHistory.push(currentStroke);
        currentStroke = null;
      }
      activePointerId = null;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (_) {}
      redrawDrawLayer();
    };

    canvas.addEventListener('pointerup', endStroke, { passive: false });
    canvas.addEventListener('pointercancel', endStroke, { passive: false });
  }

  function renderWriteView() {
    const symObj = getSymbolData(state.currentSymbol) || DATA.SYMBOLS[0];
    el.writeCurrentSymbol.textContent = symObj.symbol;
    el.writeTitle.textContent = `描紅練寫：${symObj.symbol}（${symObj.word}）`;
    const hints = symObj.strokes.map((st, idx) => `${idx + 1}. ${st.hint}`).join(' ｜ ');
    el.writeStrokeHint.textContent = `共 ${symObj.strokes.length} 筆：${hints}`;

    el.toggleStrokeGuideBtn.setAttribute('aria-pressed', state.showStrokeGuide ? 'true' : 'false');
    el.toggleStrokeGuideBtn.querySelector('span:last-child').textContent = state.showStrokeGuide
      ? '筆順提示：開'
      : '筆順提示：關';

    renderCrayonPalette();
    renderSymbolGrid(el.writeSymbolGrid, DATA.SYMBOLS, true);
    drawGuideLayer();
  }

  // ===== 模式三：聽音拼積木小挑戰 =====
  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function generateSingleQuestions() {
    const pool = getAccessibleSymbols();
    const pickedTargets = shuffleArray(pool).slice(0, QUIZ_LENGTH);
    while (pickedTargets.length < QUIZ_LENGTH) {
      pickedTargets.push(pool[pickedTargets.length % pool.length]);
    }

    return pickedTargets.map((target, idx) => {
      const distractors = shuffleArray(pool.filter((s) => s.symbol !== target.symbol)).slice(0, 3);
      const options = shuffleArray([target, ...distractors]).map((s) => ({
        id: s.symbol,
        label: s.symbol
      }));

      return {
        id: `single-${idx}-${target.symbol}`,
        promptText: '聽一聽聲音，找到正確的注音積木！',
        speakFn: () => speakSymbol(target),
        clue: null,
        options,
        answerId: target.symbol
      };
    });
  }

  function startQuizRound(type, { autoSpeak = true } = {}) {
    state.quizType = type;
    state.quizIndex = 0;
    state.quizTransitioning = false;
    el.quizActiveBox.hidden = false;
    el.quizCompleteBox.hidden = true;

    el.quizTypePills.forEach((pill) => {
      const active = pill.dataset.quizType === type;
      pill.classList.toggle('is-active', active);
      pill.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (type === 'single') {
      state.quizQuestions = generateSingleQuestions();
    } else if (type === 'tone') {
      state.quizQuestions = shuffleArray(DATA.TONE_QUESTIONS).slice(0, QUIZ_LENGTH).map((q) => ({
        ...q,
        speakFn: () => speakText(q.speakText, 0.78),
        clue: null
      }));
    } else {
      state.quizQuestions = shuffleArray(DATA.BLENDING_QUESTIONS).slice(0, QUIZ_LENGTH).map((q) => ({
        ...q,
        speakFn: () => speakText(q.speakText, 0.78),
        clue: `${q.emoji} ${q.formula} ＝ ？`
      }));
    }

    renderQuizQuestion(autoSpeak);
  }

  function renderQuizQuestion(shouldSpeak = false) {
    const q = state.quizQuestions[state.quizIndex];
    if (!q) return;

    el.quizStepLabel.textContent = `第 ${state.quizIndex + 1} / ${QUIZ_LENGTH} 題`;
    el.quizSteps.replaceChildren();
    for (let i = 0; i < QUIZ_LENGTH; i++) {
      const dot = document.createElement('span');
      dot.className = 'quiz-step-dot';
      if (i < state.quizIndex) {
        dot.classList.add('is-done');
        dot.textContent = '★';
      } else if (i === state.quizIndex) {
        dot.classList.add('is-current');
        dot.textContent = String(i + 1);
      } else {
        dot.textContent = String(i + 1);
      }
      el.quizSteps.appendChild(dot);
    }

    el.quizPromptText.textContent = q.promptText;
    if (q.clue) {
      el.quizClueBox.hidden = false;
      el.quizClueBox.textContent = q.clue;
    } else {
      el.quizClueBox.hidden = true;
      el.quizClueBox.textContent = '';
    }

    el.quizFeedback.textContent = '';
    el.quizFeedback.className = 'quiz-feedback';

    el.quizOptionsGrid.replaceChildren();
    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option-block';
      btn.dataset.optionId = opt.id;

      if (opt.ruby) {
        btn.appendChild(createRubyWordElement([opt.ruby]));
      } else {
        btn.textContent = opt.label;
      }

      btn.addEventListener('click', () => handleQuizAnswer(btn, opt.id, q));
      el.quizOptionsGrid.appendChild(btn);
    });

    if (shouldSpeak && typeof q.speakFn === 'function') {
      q.speakFn();
    }
  }

  function handleQuizAnswer(btn, pickedId, q) {
    if (state.quizTransitioning) return;

    if (pickedId === q.answerId) {
      state.quizTransitioning = true;
      btn.classList.add('is-correct', 'animate-pop');
      el.quizFeedback.textContent = '🌟 答對了！好聰明！';
      el.quizFeedback.className = 'quiz-feedback is-good';
      playSuccessChime();
      announce('答對了！');

      setTimeout(() => {
        state.quizIndex += 1;
        state.quizTransitioning = false;
        if (state.quizIndex >= QUIZ_LENGTH) {
          state.stars += 1;
          saveState();
          renderHeaderAndLocks();
          el.quizActiveBox.hidden = true;
          el.quizCompleteBox.hidden = false;
          el.quizCompleteBox.classList.add('animate-pop');
          playVictoryFanfare();
          announce(`恭喜完成 5 題挑戰，目前累積 ${state.stars} 顆星星！`);
        } else {
          renderQuizQuestion(true);
        }
      }, 820);
    } else {
      btn.classList.remove('animate-wobble');
      void btn.offsetWidth; // 重新觸發柔和晃動提示
      btn.classList.add('is-gentle-wrong', 'animate-wobble');
      el.quizFeedback.textContent = '💛 差一點點唷，再聽一次選選看！';
      el.quizFeedback.className = 'quiz-feedback is-try';
      playGentleTrySound();
      announce('再聽一次選選看');
      if (typeof q.speakFn === 'function') {
        setTimeout(() => q.speakFn(), 260);
      }
    }
  }

  // ===== PWA 安裝提示與 Service Worker =====
  let deferredInstallPrompt = null;

  function setupPwa() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      el.pwaInstallBtn.hidden = false;
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      el.pwaInstallBtn.hidden = true;
    });

    el.pwaInstallBtn.addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      try {
        await deferredInstallPrompt.userChoice;
      } catch (_) {}
      deferredInstallPrompt = null;
      el.pwaInstallBtn.hidden = true;
    });

    const isSecureLocalOrHttps =
      location.protocol === 'https:' ||
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1';
    if ('serviceWorker' in navigator && isSecureLocalOrHttps) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  // ===== 事件綁定與總渲染 =====
  function renderAll() {
    renderHeaderAndLocks();
    renderCardsView();
    if (state.mode === 'write') {
      renderWriteView();
    }
    if (el.audioDiagDialog.open) {
      renderAudioDiagPanel();
    }
  }

  function setupListeners() {
    el.audioUnlockBtn.addEventListener('click', () => unlockAudio(false));
    el.heroUnlockBtn.addEventListener('click', () => unlockAudio(false));

    el.openAudioPanelBtn.addEventListener('click', async () => {
      await scanAudioFolder();
      refreshVoices();
      renderAudioDiagPanel();
      openModal(el.audioDiagDialog);
    });

    el.rescanAudioBtn.addEventListener('click', async () => {
      await scanAudioFolder();
      refreshVoices();
      renderAudioDiagPanel();
      renderCardsView();
    });

    el.diagFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        state.diagFilter = btn.dataset.diagFilter;
        el.diagFilterBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        renderAudioDiagPanel();
      });
    });

    el.trialLockToggle.addEventListener('click', () => {
      if (state.unlocked) {
        // 一鍵恢復鎖定狀態，方便測試者反覆驗證商業鎖定流程
        state.unlocked = false;
        const curObj = getSymbolData(state.currentSymbol);
        if (curObj && !curObj.isFree) {
          state.currentSymbol = 'ㄅ';
          state.strokesHistory = [];
        }
        if (state.quizType !== 'single') {
          state.quizType = 'single';
          state.quizQuestions = [];
        }
        saveState();
        renderAll();
        if (state.mode === 'quiz') startQuizRound('single', { autoSpeak: false });
        announce('已重新開啟試玩鎖定，現在僅開放前 8 個聲母。');
      } else {
        openParentGate('請家長完成算術驗證，即可檢視一次買斷方案或輸入測試碼 DEMO2026 解鎖完整版。');
      }
    });

    el.openIosPwaBtn.addEventListener('click', () => {
      openModal(el.iosPwaDialog);
    });

    el.modeTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        switchMode(tab.dataset.mode);
      });
    });

    // Mode 1 listeners
    el.bigCardPlayBtn.addEventListener('click', () => {
      const symObj = getSymbolData(state.currentSymbol);
      playTapChime();
      speakSymbol(symObj);
      el.bigCardPlayBtn.classList.remove('animate-pop');
      void el.bigCardPlayBtn.offsetWidth;
      el.bigCardPlayBtn.classList.add('animate-pop');
    });

    el.playWordBtn.addEventListener('click', () => {
      const symObj = getSymbolData(state.currentSymbol);
      if (symObj) speakText(symObj.wordSpeakText, 0.84);
    });

    el.gotoWriteBtn.addEventListener('click', () => {
      switchMode('write');
    });

    el.cardPrevBtn.addEventListener('click', () => stepSymbol(-1));
    el.cardNextBtn.addEventListener('click', () => stepSymbol(1));

    // Mode 2 listeners
    el.writeSpeakBtn.addEventListener('click', () => {
      speakSymbol(getSymbolData(state.currentSymbol));
    });

    el.toggleStrokeGuideBtn.addEventListener('click', () => {
      state.showStrokeGuide = !state.showStrokeGuide;
      saveState();
      renderWriteView();
    });

    el.writeUndoBtn.addEventListener('click', () => {
      if (state.strokesHistory.length > 0) {
        state.strokesHistory.pop();
        el.writeStampOverlay.hidden = true;
        redrawDrawLayer();
      }
    });

    el.writeClearBtn.addEventListener('click', () => {
      state.strokesHistory = [];
      currentStroke = null;
      el.writeStampOverlay.hidden = true;
      redrawDrawLayer();
    });

    el.writeFinishBtn.addEventListener('click', () => {
      el.writeStampOverlay.hidden = false;
      el.writeStampOverlay.classList.remove('animate-pop');
      void el.writeStampOverlay.offsetWidth;
      el.writeStampOverlay.classList.add('animate-pop');
      playSuccessChime();
      speakSymbol(getSymbolData(state.currentSymbol));
    });

    el.writePrevBtn.addEventListener('click', () => stepSymbol(-1));
    el.writeNextBtn.addEventListener('click', () => stepSymbol(1));

    // Mode 3 listeners
    el.quizTypePills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const t = pill.dataset.quizType;
        if (t !== 'single' && !state.unlocked) {
          openParentGate('「四聲調小偵探」與「結合韻拼一拼」為完整版關卡，請家長驗證後體驗！', () => {
            startQuizRound(t, { autoSpeak: true });
          });
          return;
        }
        startQuizRound(t, { autoSpeak: true });
      });
    });

    el.quizPlayBtn.addEventListener('click', () => {
      const q = state.quizQuestions[state.quizIndex];
      if (q && typeof q.speakFn === 'function') q.speakFn();
    });

    el.quizReplayBtn.addEventListener('click', () => {
      startQuizRound(state.quizType, { autoSpeak: true });
    });

    el.quizBackCardsBtn.addEventListener('click', () => {
      switchMode('cards');
    });
  }

  async function init() {
    loadState();
    setupDialogs();
    setupParentGateForms();
    setupCanvasEvents();
    setupPwa();
    setupListeners();

    if ('speechSynthesis' in window) {
      refreshVoices();
      window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
    }

    await scanAudioFolder();
    renderAll();
    resizeCanvasLayers();
  }

  init();
})();
