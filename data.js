/**
 * 台灣繁體中文注音符號教材資料庫（完整 37 符號 + 聲調結合韻挑戰 + 筆順座標）
 * 依中華民國教育部國語注音符號標準排列：
 * - 聲母 21 個（前 8 個 ㄅ~ㄌ 為免費試玩）
 * - 介音與單韻母 8 個（ㄧㄨㄩ + ㄚㄛㄜㄝ + ㄦ）
 * - 複韻母與鼻韻母 8 個（ㄞㄟㄠㄡ + ㄢㄣㄤㄥ）
 */

window.ZHUYIN_DATA = (() => {
  const GROUPS = [
    { id: 'all', label: '全部 37 音', badge: '37' },
    { id: 'initials', label: '聲母（ㄅ～ㄙ）', badge: '21' },
    { id: 'single_medials', label: '介音與單韻母（ㄧ～ㄦ）', badge: '8' },
    { id: 'compound_nasals', label: '複韻母與鼻韻母（ㄞ～ㄥ）', badge: '8' }
  ];

  // 兒童可愛蠟筆色票（低眩光、對比清楚）
  const CRAYON_COLORS = [
    { id: 'ink', name: '暖可可', hex: '#3d2e20', icon: '🤎' },
    { id: 'tangerine', name: '橘子紅', hex: '#d95326', icon: '🧡' },
    { id: 'forest', name: '森林綠', hex: '#26734d', icon: '💚' },
    { id: 'sky', name: '海洋藍', hex: '#2366a8', icon: '💙' }
  ];

  // 每字附標準台灣直式注音資料：{ han: '爸', zhuyin: ['ㄅ', 'ㄚ'], tone: 'ˋ', focusIdx: 0 }
  const SYMBOLS = [
    // ===== 1. 聲母（21 個，前 8 個免費）=====
    {
      symbol: 'ㄅ',
      group: 'initials',
      subGroup: '雙唇音',
      isFree: true,
      word: '爸爸',
      altWord: '包子',
      emoji: '👨',
      altEmoji: '🥟',
      wordSpeech: 'ㄅㄚˋ ㄅㄚ˙，爸爸；包子',
      wordSpeakText: '爸爸的ㄅ，包子的ㄅ',
      wordRuby: [
        { han: '爸', zhuyin: ['ㄅ', 'ㄚ'], tone: 'ˋ', focusIdx: 0 },
        { han: '爸', zhuyin: ['ㄅ', 'ㄚ'], tone: '˙', focusIdx: 0 }
      ],
      ttsApprox: '波',
      ttsNote: '呼音近似「波」輕短音，不含太長「ㄛ」尾音會更標準',
      distortionRisk: 'medium',
      mp3Hint: 'audio/ㄅ.mp3',
      strokes: [
        { points: [[43, 30], [34, 48], [67, 48], [58, 73], [46, 66]], hint: '斜下折橫再向下彎鉤（一筆）' }
      ]
    },
    {
      symbol: 'ㄆ',
      group: 'initials',
      subGroup: '雙唇音（送氣）',
      isFree: true,
      word: '葡萄',
      altWord: '泡泡',
      emoji: '🍇',
      altEmoji: '🫧',
      wordSpeakText: '葡萄的ㄆ，泡泡的ㄆ',
      wordRuby: [
        { han: '葡', zhuyin: ['ㄆ', 'ㄨ'], tone: 'ˊ', focusIdx: 0 },
        { han: '萄', zhuyin: ['ㄊ', 'ㄠ'], tone: 'ˊ', focusIdx: -1 }
      ],
      ttsApprox: '坡',
      ttsNote: '呼音近似「坡」送氣音；TTS 會連帶唸出完整「ㄛ」韻母',
      distortionRisk: 'medium',
      mp3Hint: 'audio/ㄆ.mp3',
      strokes: [
        { points: [[38, 34], [62, 33], [32, 68]], hint: '先寫橫撇' },
        { points: [[37, 42], [69, 72]], hint: '再寫右下長捺' }
      ]
    },
    {
      symbol: 'ㄇ',
      group: 'initials',
      subGroup: '雙唇鼻音',
      isFree: true,
      word: '媽媽',
      altWord: '貓咪',
      emoji: '👩',
      altEmoji: '🐱',
      wordSpeakText: '媽媽的ㄇ，貓咪的ㄇ',
      wordRuby: [
        { han: '媽', zhuyin: ['ㄇ', 'ㄚ'], tone: '', focusIdx: 0 },
        { han: '媽', zhuyin: ['ㄇ', 'ㄚ'], tone: '˙', focusIdx: 0 }
      ],
      ttsApprox: '摸',
      ttsNote: '近似「摸」第一聲；TTS 較穩定，補錄可縮短尾音',
      distortionRisk: 'medium',
      mp3Hint: 'audio/ㄇ.mp3',
      strokes: [
        { points: [[29, 34], [29, 74]], hint: '左邊先一豎' },
        { points: [[30, 34], [69, 34], [69, 74]], hint: '橫折再向下豎' }
      ]
    },
    {
      symbol: 'ㄈ',
      group: 'initials',
      subGroup: '唇齒音',
      isFree: true,
      word: '飛機',
      altWord: '風箏',
      emoji: '✈️',
      altEmoji: '🪁',
      wordSpeakText: '飛機的ㄈ，風箏的ㄈ',
      wordRuby: [
        { han: '飛', zhuyin: ['ㄈ', 'ㄟ'], tone: '', focusIdx: 0 },
        { han: '機', zhuyin: ['ㄐ', 'ㄧ'], tone: '', focusIdx: -1 }
      ],
      ttsApprox: '夫',
      ttsNote: '國語缺乏常用「ㄈㄛ」第一聲單字，暫以清純唇齒音「夫」替代（「佛」為二聲易誤導）',
      distortionRisk: 'medium',
      mp3Hint: 'audio/ㄈ.mp3',
      strokes: [
        { points: [[32, 33], [70, 33]], hint: '上方先一橫' },
        { points: [[33, 33], [33, 70], [72, 70]], hint: '左豎折向右橫' }
      ]
    },
    {
      symbol: 'ㄉ',
      group: 'initials',
      subGroup: '舌尖音',
      isFree: true,
      word: '大象',
      altWord: '蛋糕',
      emoji: '🐘',
      altEmoji: '🍰',
      wordSpeakText: '大象的ㄉ，蛋糕的ㄉ',
      wordRuby: [
        { han: '大', zhuyin: ['ㄉ', 'ㄚ'], tone: 'ˋ', focusIdx: 0 },
        { han: '象', zhuyin: ['ㄒ', 'ㄧ', 'ㄤ'], tone: 'ˋ', focusIdx: -1 }
      ],
      ttsApprox: '德',
      ttsNote: '近似輕短「ㄉㄜ」；常見字「德」為二聲，語調會略微上揚',
      distortionRisk: 'medium',
      mp3Hint: 'audio/ㄉ.mp3',
      strokes: [
        { points: [[36, 35], [70, 35], [60, 73], [48, 65]], hint: '先寫橫折鉤（刀的外框）' },
        { points: [[53, 24], [31, 69]], hint: '再斜撇下來' }
      ]
    },
    {
      symbol: 'ㄊ',
      group: 'initials',
      subGroup: '舌尖音（送氣）',
      isFree: true,
      word: '兔子',
      altWord: '太陽',
      emoji: '🐰',
      altEmoji: '☀️',
      wordSpeakText: '兔子的ㄊ，太陽的ㄊ',
      wordRuby: [
        { han: '兔', zhuyin: ['ㄊ', 'ㄨ'], tone: 'ˋ', focusIdx: 0 },
        { han: '子', zhuyin: ['ㄗ'], tone: '˙', focusIdx: -1 }
      ],
      ttsApprox: '特',
      ttsNote: '常用「特」為四聲字，TTS 唸出時語氣偏重下降，建議補錄輕短氣音',
      distortionRisk: 'medium',
      mp3Hint: 'audio/ㄊ.mp3',
      strokes: [
        { points: [[34, 42], [67, 40]], hint: '中間先寫一短橫' },
        { points: [[50, 24], [33, 68], [66, 61]], hint: '上撇下折向右' },
        { points: [[61, 52], [71, 72]], hint: '右下補一點' }
      ]
    },
    {
      symbol: 'ㄋ',
      group: 'initials',
      subGroup: '舌尖鼻音',
      isFree: true,
      word: '牛奶',
      altWord: '南瓜',
      emoji: '🥛',
      altEmoji: '🎃',
      wordSpeakText: '牛奶的ㄋ，南瓜的ㄋ',
      wordRuby: [
        { han: '牛', zhuyin: ['ㄋ', 'ㄧ', 'ㄡ'], tone: 'ˊ', focusIdx: 0 },
        { han: '奶', zhuyin: ['ㄋ', 'ㄞ'], tone: 'ˇ', focusIdx: 0 }
      ],
      ttsApprox: '呢',
      ttsNote: '「呢」在語音庫常唸成輕聲或二聲「ㄋㄧˊ」，純正一聲呼音需 MP3',
      distortionRisk: 'medium',
      mp3Hint: 'audio/ㄋ.mp3',
      strokes: [
        { points: [[36, 28], [64, 28], [40, 48], [66, 48], [58, 76], [46, 68]], hint: '橫折撇再橫折鉤（一筆完成）' }
      ]
    },
    {
      symbol: 'ㄌ',
      group: 'initials',
      subGroup: '舌尖邊音',
      isFree: true,
      word: '老虎',
      altWord: '梨子',
      emoji: '🐯',
      altEmoji: '🍐',
      wordSpeakText: '老虎的ㄌ，梨子的ㄌ',
      wordRuby: [
        { han: '老', zhuyin: ['ㄌ', 'ㄠ'], tone: 'ˇ', focusIdx: 0 },
        { han: '虎', zhuyin: ['ㄏ', 'ㄨ'], tone: 'ˇ', focusIdx: -1 }
      ],
      ttsApprox: '勒',
      ttsNote: '常用「勒」是四聲降調，真實呼音應輕平「ㄌㄜ」',
      distortionRisk: 'medium',
      mp3Hint: 'audio/ㄌ.mp3',
      strokes: [
        { points: [[34, 39], [68, 39], [57, 76], [45, 67]], hint: '先寫橫折鉤（力）' },
        { points: [[51, 22], [31, 67]], hint: '再從上方斜撇穿過' }
      ]
    },
    {
      symbol: 'ㄍ',
      group: 'initials',
      subGroup: '舌根音',
      isFree: false,
      word: '狗狗',
      altWord: '公主',
      emoji: '🐶',
      altEmoji: '👑',
      wordSpeakText: '狗狗的ㄍ，西瓜的ㄍ',
      wordRuby: [
        { han: '狗', zhuyin: ['ㄍ', 'ㄡ'], tone: 'ˇ', focusIdx: 0 },
        { han: '狗', zhuyin: ['ㄍ', 'ㄡ'], tone: 'ˇ', focusIdx: 0 }
      ],
      ttsApprox: '哥',
      ttsNote: '近似第一聲「哥」，TTS 唸法清楚，補錄純短聲母會更道地',
      distortionRisk: 'low',
      mp3Hint: 'audio/ㄍ.mp3',
      strokes: [
        { points: [[43, 26], [28, 48], [44, 73]], hint: '左邊先寫撇點折' },
        { points: [[66, 26], [52, 48], [68, 73]], hint: '右邊再寫撇點折' }
      ]
    },
    {
      symbol: 'ㄎ',
      group: 'initials',
      subGroup: '舌根音（送氣）',
      isFree: false,
      word: '恐龍',
      altWord: '餅乾',
      emoji: '🦕',
      altEmoji: '🍪',
      wordSpeakText: '恐龍的ㄎ，卡車的ㄎ',
      wordRuby: [
        { han: '恐', zhuyin: ['ㄎ', 'ㄨ', 'ㄥ'], tone: 'ˇ', focusIdx: 0 },
        { han: '龍', zhuyin: ['ㄌ', 'ㄨ', 'ㄥ'], tone: 'ˊ', focusIdx: -1 }
      ],
      ttsApprox: '科',
      ttsNote: '近似第一聲「科」，發音清楚',
      distortionRisk: 'low',
      mp3Hint: 'audio/ㄎ.mp3',
      strokes: [
        { points: [[33, 31], [68, 31]], hint: '上方一橫' },
        { points: [[50, 31], [42, 49], [65, 49], [56, 76], [44, 68]], hint: '豎折橫折鉤' }
      ]
    },
    {
      symbol: 'ㄏ',
      group: 'initials',
      subGroup: '舌根擦音',
      isFree: false,
      word: '河馬',
      altWord: '蝴蝶',
      emoji: '🦛',
      altEmoji: '🦋',
      wordSpeakText: '河馬的ㄏ，蝴蝶的ㄏ',
      wordRuby: [
        { han: '河', zhuyin: ['ㄏ', 'ㄜ'], tone: 'ˊ', focusIdx: 0 },
        { han: '馬', zhuyin: ['ㄇ', 'ㄚ'], tone: 'ˇ', focusIdx: -1 }
      ],
      ttsApprox: '喝',
      ttsNote: '近似第一聲「喝」，發音清楚',
      distortionRisk: 'low',
      mp3Hint: 'audio/ㄏ.mp3',
      strokes: [
        { points: [[35, 31], [69, 31]], hint: '先寫上方一橫' },
        { points: [[36, 31], [34, 58], [24, 76]], hint: '再向左下彎撇' }
      ]
    },
    {
      symbol: 'ㄐ',
      group: 'initials',
      subGroup: '舌面音',
      isFree: false,
      word: '積木',
      altWord: '小雞',
      emoji: '🧱',
      altEmoji: '🐥',
      wordSpeakText: '積木的ㄐ，小雞的ㄐ',
      wordRuby: [
        { han: '積', zhuyin: ['ㄐ', 'ㄧ'], tone: '', focusIdx: 0 },
        { han: '木', zhuyin: ['ㄇ', 'ㄨ'], tone: 'ˋ', focusIdx: -1 }
      ],
      ttsApprox: '雞',
      ttsNote: '高失真：TTS 必須夾帶「ㄧ」母音唸成完整「雞」，無法單獨發出輕短舌面聲母',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄐ.mp3',
      strokes: [
        { points: [[35, 28], [35, 61], [60, 55]], hint: '左邊豎提折' },
        { points: [[59, 22], [59, 78]], hint: '右邊直豎下來' }
      ]
    },
    {
      symbol: 'ㄑ',
      group: 'initials',
      subGroup: '舌面音（送氣）',
      isFree: false,
      word: '氣球',
      altWord: '企鵝',
      emoji: '🎈',
      altEmoji: '🐧',
      wordSpeakText: '氣球的ㄑ，企鵝的ㄑ',
      wordRuby: [
        { han: '氣', zhuyin: ['ㄑ', 'ㄧ'], tone: 'ˋ', focusIdx: 0 },
        { han: '球', zhuyin: ['ㄑ', 'ㄧ', 'ㄡ'], tone: 'ˊ', focusIdx: 0 }
      ],
      ttsApprox: '七',
      ttsNote: '高失真：TTS 夾帶完整「ㄧ」母音唸成「七」，建議補錄輕聲氣音',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄑ.mp3',
      strokes: [
        { points: [[62, 25], [36, 50], [64, 75]], hint: '右上向左中轉折再右下（一筆）' }
      ]
    },
    {
      symbol: 'ㄒ',
      group: 'initials',
      subGroup: '舌面擦音',
      isFree: false,
      word: '西瓜',
      altWord: '香蕉',
      emoji: '🍉',
      altEmoji: '🍌',
      wordSpeakText: '西瓜的ㄒ，香蕉的ㄒ',
      wordRuby: [
        { han: '西', zhuyin: ['ㄒ', 'ㄧ'], tone: '', focusIdx: 0 },
        { han: '瓜', zhuyin: ['ㄍ', 'ㄨ', 'ㄚ'], tone: '', focusIdx: -1 }
      ],
      ttsApprox: '西',
      ttsNote: '高失真：TTS 會夾帶完整「ㄧ」母音唸成「西」，純正呼音應更輕短',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄒ.mp3',
      strokes: [
        { points: [[26, 32], [74, 32]], hint: '上方一長橫' },
        { points: [[50, 32], [50, 76]], hint: '正中間一豎' }
      ]
    },
    {
      symbol: 'ㄓ',
      group: 'initials',
      subGroup: '捲舌音',
      isFree: false,
      word: '蜘蛛',
      altWord: '珍珠',
      emoji: '🕷️',
      altEmoji: '🧋',
      wordSpeakText: '蜘蛛的ㄓ，珍珠的ㄓ',
      wordRuby: [
        { han: '蜘', zhuyin: ['ㄓ'], tone: '', focusIdx: 0 },
        { han: '蛛', zhuyin: ['ㄓ', 'ㄨ'], tone: '', focusIdx: 0 }
      ],
      ttsApprox: '知',
      ttsNote: '高失真：捲舌純聲母常被 TTS 拉成重讀的「知」，補錄老師正音更自然',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄓ.mp3',
      strokes: [
        { points: [[50, 22], [50, 70]], hint: '正中間直豎' },
        { points: [[34, 35], [34, 53], [66, 51]], hint: '左邊豎折橫' },
        { points: [[66, 34], [66, 55]], hint: '右上短短一豎' },
        { points: [[26, 71], [74, 71]], hint: '最下方長橫' }
      ]
    },
    {
      symbol: 'ㄔ',
      group: 'initials',
      subGroup: '捲舌音（送氣）',
      isFree: false,
      word: '尺',
      altWord: '車車',
      emoji: '📏',
      altEmoji: '🚗',
      wordSpeakText: '尺的ㄔ，車子的ㄔ',
      wordRuby: [
        { han: '尺', zhuyin: ['ㄔ'], tone: 'ˇ', focusIdx: 0 }
      ],
      ttsApprox: '吃',
      ttsNote: '高失真：捲舌送氣音「ㄔ」靠「吃」模擬往往過重，優先推薦補錄 MP3',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄔ.mp3',
      strokes: [
        { points: [[58, 24], [36, 44]], hint: '上方一短撇' },
        { points: [[64, 42], [30, 66]], hint: '中間再一撇' },
        { points: [[51, 48], [51, 78]], hint: '向下寫直豎' }
      ]
    },
    {
      symbol: 'ㄕ',
      group: 'initials',
      subGroup: '捲舌擦音',
      isFree: false,
      word: '獅子',
      altWord: '石頭',
      emoji: '🦁',
      altEmoji: '🪨',
      wordSpeakText: '獅子的ㄕ，書包的ㄕ',
      wordRuby: [
        { han: '獅', zhuyin: ['ㄕ'], tone: '', focusIdx: 0 },
        { han: '子', zhuyin: ['ㄗ'], tone: '˙', focusIdx: -1 }
      ],
      ttsApprox: '詩',
      ttsNote: '高失真：TTS 唸「詩」易帶有生硬字腔，捲舌摩摖持續音適合預錄 MP3',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄕ.mp3',
      strokes: [
        { points: [[34, 27], [66, 27], [63, 46]], hint: '上頭橫折（尸頭）' },
        { points: [[34, 47], [63, 47]], hint: '中間補橫關口' },
        { points: [[35, 27], [32, 58], [24, 78]], hint: '左邊長撇下來' }
      ]
    },
    {
      symbol: 'ㄖ',
      group: 'initials',
      subGroup: '捲舌濁音',
      isFree: false,
      word: '太陽',
      altWord: '熱狗',
      emoji: '🌞',
      altEmoji: '🌭',
      wordSpeakText: '日出的ㄖ，熱狗的ㄖ',
      wordRuby: [
        { han: '日', zhuyin: ['ㄖ'], tone: 'ˋ', focusIdx: 0 },
        { han: '出', zhuyin: ['ㄔ', 'ㄨ'], tone: '', focusIdx: -1 }
      ],
      ttsApprox: '日',
      ttsNote: '極高失真：國語中「ㄖ」僅有四聲「日」可唸，無第一聲單字，TTS 唸成降調「ㄖˋ」務必補錄 MP3！',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄖ.mp3',
      strokes: [
        { points: [[34, 26], [34, 74]], hint: '左邊先一豎' },
        { points: [[34, 26], [66, 26], [66, 76]], hint: '橫折下來' },
        { points: [[35, 51], [65, 51]], hint: '中間補橫' },
        { points: [[35, 72], [65, 72]], hint: '底下封口橫' }
      ]
    },
    {
      symbol: 'ㄗ',
      group: 'initials',
      subGroup: '舌尖前音',
      isFree: false,
      word: '嘴巴',
      altWord: '積木',
      emoji: '👄',
      altEmoji: '🦓',
      wordSpeakText: '嘴巴的ㄗ，早安的ㄗ',
      wordRuby: [
        { han: '嘴', zhuyin: ['ㄗ', 'ㄨ', 'ㄟ'], tone: 'ˇ', focusIdx: 0 },
        { han: '巴', zhuyin: ['ㄅ', 'ㄚ'], tone: '', focusIdx: -1 }
      ],
      ttsApprox: '資',
      ttsNote: '高失真：純平舌清塞擦音，TTS「資」易聽起來像完整字詞',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄗ.mp3',
      strokes: [
        { points: [[30, 31], [68, 31], [64, 56], [54, 50]], hint: '先寫上橫再下折鉤' },
        { points: [[41, 31], [41, 77]], hint: '左內垂直往下（卩）' }
      ]
    },
    {
      symbol: 'ㄘ',
      group: 'initials',
      subGroup: '舌尖前音（送氣）',
      isFree: false,
      word: '草莓',
      altWord: '刺蝟',
      emoji: '🍓',
      altEmoji: '🦔',
      wordSpeakText: '草莓的ㄘ，刺蝟的ㄘ',
      wordRuby: [
        { han: '草', zhuyin: ['ㄘ', 'ㄠ'], tone: 'ˇ', focusIdx: 0 },
        { han: '莓', zhuyin: ['ㄇ', 'ㄟ'], tone: 'ˊ', focusIdx: -1 }
      ],
      ttsApprox: '疵',
      ttsNote: '極高失真：平舌一聲「疵」部分裝置會誤讀為四聲「ㄘˋ」或二聲「ㄘˊ」（雌），強烈建議錄製 MP3',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄘ.mp3',
      strokes: [
        { points: [[28, 39], [71, 39]], hint: '中間先一橫' },
        { points: [[52, 22], [45, 54], [64, 52], [50, 78]], hint: '豎折向右再撇下' }
      ]
    },
    {
      symbol: 'ㄙ',
      group: 'initials',
      subGroup: '舌尖前擦音',
      isFree: false,
      word: '雨傘',
      altWord: '松鼠',
      emoji: '☂️',
      altEmoji: '🐿️',
      wordSpeakText: '雨傘的ㄙ，松鼠的ㄙ',
      wordRuby: [
        { han: '雨', zhuyin: ['ㄩ'], tone: 'ˇ', focusIdx: -1 },
        { han: '傘', zhuyin: ['ㄙ', 'ㄢ'], tone: 'ˇ', focusIdx: 0 }
      ],
      ttsApprox: '思',
      ttsNote: '高失真：純平舌擦音「ㄙ」以「思」代替時母音殘留明顯',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄙ.mp3',
      strokes: [
        { points: [[50, 26], [32, 68], [66, 60]], hint: '左上斜下再折向右（ㄥ）' },
        { points: [[58, 48], [69, 73]], hint: '右下補一點' }
      ]
    },

    // ===== 2. 介音與單韻母（8 個）=====
    {
      symbol: 'ㄧ',
      group: 'single_medials',
      subGroup: '介音（結合韻頭）',
      isFree: false,
      word: '衣服',
      altWord: '櫻桃',
      emoji: '👕',
      altEmoji: '🍒',
      wordSpeakText: '衣服的ㄧ，櫻桃的ㄧ',
      wordRuby: [
        { han: '衣', zhuyin: ['ㄧ'], tone: '', focusIdx: 0 },
        { han: '服', zhuyin: ['ㄈ', 'ㄨ'], tone: 'ˊ', focusIdx: -1 }
      ],
      ttsApprox: '衣',
      ttsNote: '與「衣」完全同音，TTS 準確度高',
      distortionRisk: 'low',
      mp3Hint: 'audio/ㄧ.mp3',
      strokes: [
        { points: [[22, 50], [78, 50]], hint: '由左向右畫一平橫（一筆）' }
      ]
    },
    {
      symbol: 'ㄨ',
      group: 'single_medials',
      subGroup: '介音（結合韻頭）',
      isFree: false,
      word: '烏龜',
      altWord: '屋子',
      emoji: '🐢',
      altEmoji: '🏠',
      wordSpeakText: '烏龜的ㄨ，屋子的ㄨ',
      wordRuby: [
        { han: '烏', zhuyin: ['ㄨ'], tone: '', focusIdx: 0 },
        { han: '龜', zhuyin: ['ㄍ', 'ㄨ', 'ㄟ'], tone: '', focusIdx: -1 }
      ],
      ttsApprox: '烏',
      ttsNote: '與「烏」完全同音，TTS 準確度高',
      distortionRisk: 'low',
      mp3Hint: 'audio/ㄨ.mp3',
      strokes: [
        { points: [[64, 28], [32, 73]], hint: '先由右上向左下斜撇' },
        { points: [[36, 33], [67, 74]], hint: '再由左上向右下長捺' }
      ]
    },
    {
      symbol: 'ㄩ',
      group: 'single_medials',
      subGroup: '介音（撮口音）',
      isFree: false,
      word: '小魚',
      altWord: '玉米',
      emoji: '🐟',
      altEmoji: '🌽',
      wordSpeakText: '小魚的ㄩ，玉米的ㄩ',
      wordRuby: [
        { han: '小', zhuyin: ['ㄒ', 'ㄧ', 'ㄠ'], tone: 'ˇ', focusIdx: -1 },
        { han: '魚', zhuyin: ['ㄩ'], tone: 'ˊ', focusIdx: 0 }
      ],
      ttsApprox: '淤',
      ttsNote: '「淤」為標準第一聲單韻母，TTS 準確度高',
      distortionRisk: 'low',
      mp3Hint: 'audio/ㄩ.mp3',
      strokes: [
        { points: [[31, 31], [31, 69], [67, 67]], hint: '左邊先豎折向右' },
        { points: [[68, 26], [68, 74]], hint: '右邊再一豎（凵）' }
      ]
    },
    {
      symbol: 'ㄚ',
      group: 'single_medials',
      subGroup: '單韻母',
      isFree: false,
      word: '阿姨',
      altWord: '鴨子',
      emoji: '🦆',
      altEmoji: '🍉',
      wordSpeakText: '鴨子的ㄚ，阿姨的ㄚ',
      wordRuby: [
        { han: '鴨', zhuyin: ['ㄧ', 'ㄚ'], tone: '', focusIdx: 1 },
        { han: '子', zhuyin: ['ㄗ'], tone: '˙', focusIdx: -1 }
      ],
      ttsApprox: '啊',
      ttsNote: '開口呼「啊」，TTS 準確度高',
      distortionRisk: 'low',
      mp3Hint: 'audio/ㄚ.mp3',
      strokes: [
        { points: [[31, 33], [45, 50]], hint: '左上先一點' },
        { points: [[68, 31], [54, 50]], hint: '右上再短撇' },
        { points: [[50, 48], [50, 78]], hint: '中間直豎下去' }
      ]
    },
    {
      symbol: 'ㄛ',
      group: 'single_medials',
      subGroup: '單韻母（圓唇）',
      isFree: false,
      word: '公雞叫',
      altWord: '波浪',
      emoji: '🐓',
      altEmoji: '🌊',
      wordSpeakText: '喔喔叫的ㄛ，波浪的ㄛ',
      wordRuby: [
        { han: '喔', zhuyin: ['ㄛ'], tone: '', focusIdx: 0 },
        { han: '喔', zhuyin: ['ㄛ'], tone: '', focusIdx: 0 }
      ],
      ttsApprox: '喔',
      ttsNote: '高風險：部分 TTS 引擎常將單獨「喔」唸偏成「ㄨㄛ」或語氣詞「歐」，補錄單圓唇「ㄛ」較準',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄛ.mp3',
      strokes: [
        { points: [[34, 31], [65, 31]], hint: '上方先一橫' },
        { points: [[51, 31], [34, 52], [38, 69], [66, 69]], hint: '中豎下彎再向右平收' }
      ]
    },
    {
      symbol: 'ㄜ',
      group: 'single_medials',
      subGroup: '單韻母',
      isFree: false,
      word: '企鵝',
      altWord: '肚子餓',
      emoji: '🐧',
      altEmoji: '🍽️',
      wordSpeakText: '企鵝的ㄜ，肚子餓的ㄜ',
      wordRuby: [
        { han: '企', zhuyin: ['ㄑ', 'ㄧ'], tone: 'ˋ', focusIdx: -1 },
        { han: '鵝', zhuyin: ['ㄜ'], tone: 'ˊ', focusIdx: 0 }
      ],
      ttsApprox: '鵝',
      ttsNote: '極高失真：國語極少單獨第一聲「ㄜ」常用字，用「鵝」替代是二聲上揚，務必補錄 MP3！',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄜ.mp3',
      strokes: [
        { points: [[30, 45], [66, 42]], hint: '中間先橫過' },
        { points: [[46, 24], [45, 67], [68, 68], [71, 56]], hint: '豎彎向右往上小鉤' }
      ]
    },
    {
      symbol: 'ㄝ',
      group: 'single_medials',
      subGroup: '單韻母',
      isFree: false,
      word: '茄子',
      altWord: '蝴蝶',
      emoji: '🍆',
      altEmoji: '🦋',
      wordSpeakText: '茄子的ㄝ，蝴蝶的ㄝ',
      wordRuby: [
        { han: '茄', zhuyin: ['ㄑ', 'ㄧ', 'ㄝ'], tone: 'ˊ', focusIdx: 2 },
        { han: '子', zhuyin: ['ㄗ'], tone: '˙', focusIdx: -1 }
      ],
      ttsApprox: '耶',
      ttsNote: '極高失真：中文缺乏獨立平調「ㄝ」漢字，「耶」多出了「ㄧ」介音滑音，急需補錄純「ㄝ」MP3！',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄝ.mp3',
      strokes: [
        { points: [[26, 46], [73, 44]], hint: '先寫長橫（世的橫）' },
        { points: [[58, 28], [58, 56], [49, 51]], hint: '右邊短短豎鉤' },
        { points: [[39, 28], [39, 70], [70, 69]], hint: '左邊豎折向右長橫' }
      ]
    },
    {
      symbol: 'ㄦ',
      group: 'single_medials',
      subGroup: '捲舌單韻母',
      isFree: false,
      word: '耳朵',
      altWord: '兒童',
      emoji: '👂',
      altEmoji: '🧒',
      wordSpeakText: '耳朵的ㄦ，兒童的ㄦ',
      wordRuby: [
        { han: '耳', zhuyin: ['ㄦ'], tone: 'ˇ', focusIdx: 0 },
        { han: '朵', zhuyin: ['ㄉ', 'ㄨ', 'ㄛ'], tone: 'ˇ', focusIdx: -1 }
      ],
      ttsApprox: '兒',
      ttsNote: '使用常見「兒」（二聲），辨識度高但帶揚調，若補錄一聲平調「ㄦ」更教學一致',
      distortionRisk: 'medium',
      mp3Hint: 'audio/ㄦ.mp3',
      strokes: [
        { points: [[41, 28], [38, 58], [24, 74]], hint: '左邊先寫彎撇' },
        { points: [[57, 26], [57, 68], [73, 70]], hint: '右邊再豎彎向右' }
      ]
    },

    // ===== 3. 複韻母與鼻韻母（8 個）=====
    {
      symbol: 'ㄞ',
      group: 'compound_nasals',
      subGroup: '複韻母',
      isFree: false,
      word: '愛心',
      altWord: '白色',
      emoji: '❤️',
      altEmoji: '🤍',
      wordSpeakText: '愛心的ㄞ，白色的ㄞ',
      wordRuby: [
        { han: '愛', zhuyin: ['ㄞ'], tone: 'ˋ', focusIdx: 0 },
        { han: '心', zhuyin: ['ㄒ', 'ㄧ', 'ㄣ'], tone: '', focusIdx: -1 }
      ],
      ttsApprox: '哀',
      ttsNote: '與第一聲「哀」完全同音，TTS 清晰',
      distortionRisk: 'low',
      mp3Hint: 'audio/ㄞ.mp3',
      strokes: [
        { points: [[34, 30], [68, 30]], hint: '上方一橫' },
        { points: [[49, 31], [40, 46], [65, 46], [56, 75], [46, 68]], hint: '中豎折橫再下彎鉤' },
        { points: [[47, 47], [31, 73]], hint: '最後左下方斜撇' }
      ]
    },
    {
      symbol: 'ㄟ',
      group: 'compound_nasals',
      subGroup: '複韻母',
      isFree: false,
      word: '杯子',
      altWord: '飛機',
      emoji: '🥤',
      altEmoji: '✈️',
      wordSpeakText: '杯子的ㄟ，妹妹的ㄟ',
      wordRuby: [
        { han: '杯', zhuyin: ['ㄅ', 'ㄟ'], tone: '', focusIdx: 1 },
        { han: '子', zhuyin: ['ㄗ'], tone: '˙', focusIdx: -1 }
      ],
      ttsApprox: '欸',
      ttsNote: '極高失真：語助詞「欸 / 誒」在不同語音引擎常被唸成「ㄞˇ / ㄟˋ / ㄧ」，強烈建議補錄 MP3！',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄟ.mp3',
      strokes: [
        { points: [[35, 34], [51, 34], [56, 56], [74, 73]], hint: '短橫再平滑往右下撇開（一筆）' }
      ]
    },
    {
      symbol: 'ㄠ',
      group: 'compound_nasals',
      subGroup: '複韻母',
      isFree: false,
      word: '貓咪',
      altWord: '包包',
      emoji: '🐱',
      altEmoji: '🎒',
      wordSpeakText: '貓咪的ㄠ，高高的ㄠ',
      wordRuby: [
        { han: '貓', zhuyin: ['ㄇ', 'ㄠ'], tone: '', focusIdx: 1 },
        { han: '咪', zhuyin: ['ㄇ', 'ㄧ'], tone: '', focusIdx: -1 }
      ],
      ttsApprox: '凹',
      ttsNote: '「凹」是標準第一聲單韻，TTS 相當準確',
      distortionRisk: 'low',
      mp3Hint: 'audio/ㄠ.mp3',
      strokes: [
        { points: [[49, 22], [36, 44], [56, 42]], hint: '上方先寫撇折' },
        { points: [[58, 34], [34, 68], [65, 61]], hint: '中間再寫撇折' },
        { points: [[60, 51], [70, 72]], hint: '右下補一點（幺）' }
      ]
    },
    {
      symbol: 'ㄡ',
      group: 'compound_nasals',
      subGroup: '複韻母',
      isFree: false,
      word: '海鷗',
      altWord: '猴子',
      emoji: '🕊️',
      altEmoji: '🐒',
      wordSpeakText: '海鷗的ㄡ，猴子的ㄡ',
      wordRuby: [
        { han: '海', zhuyin: ['ㄏ', 'ㄞ'], tone: 'ˇ', focusIdx: -1 },
        { han: '鷗', zhuyin: ['ㄡ'], tone: '', focusIdx: 0 }
      ],
      ttsApprox: '歐',
      ttsNote: '與第一聲「歐」完全同音，TTS 清晰',
      distortionRisk: 'low',
      mp3Hint: 'audio/ㄡ.mp3',
      strokes: [
        { points: [[34, 32], [65, 31], [31, 72]], hint: '先寫橫撇（又）' },
        { points: [[36, 42], [70, 74]], hint: '再寫右下長捺' }
      ]
    },
    {
      symbol: 'ㄢ',
      group: 'compound_nasals',
      subGroup: '前鼻韻母',
      isFree: false,
      word: '高山',
      altWord: '麵包',
      emoji: '⛰️',
      altEmoji: '🥐',
      wordSpeakText: '高山的ㄢ，早安的ㄢ',
      wordRuby: [
        { han: '高', zhuyin: ['ㄍ', 'ㄠ'], tone: '', focusIdx: -1 },
        { han: '山', zhuyin: ['ㄕ', 'ㄢ'], tone: '', focusIdx: 1 }
      ],
      ttsApprox: '安',
      ttsNote: '與第一聲「安」完全同音，TTS 清晰',
      distortionRisk: 'low',
      mp3Hint: 'audio/ㄢ.mp3',
      strokes: [
        { points: [[35, 31], [63, 31], [40, 50], [67, 50], [56, 74]], hint: '上方一橫折斜撇再折鉤（一筆）' }
      ]
    },
    {
      symbol: 'ㄣ',
      group: 'compound_nasals',
      subGroup: '前鼻韻母',
      isFree: false,
      word: '門鈴',
      altWord: '森林',
      emoji: '🚪',
      altEmoji: '🌲',
      wordSpeakText: '大門的ㄣ，恩恩的ㄣ',
      wordRuby: [
        { han: '門', zhuyin: ['ㄇ', 'ㄣ'], tone: 'ˊ', focusIdx: 1 },
        { han: '鈴', zhuyin: ['ㄌ', 'ㄧ', 'ㄥ'], tone: 'ˊ', focusIdx: -1 }
      ],
      ttsApprox: '恩',
      ttsNote: '高失真：前後鼻音「ㄣ / ㄥ」在行動裝置小喇叭與 TTS 中容易混聽，補錄真人收鼻尖音更易辨別',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄣ.mp3',
      strokes: [
        { points: [[42, 27], [40, 49], [67, 47], [52, 75]], hint: '豎折橫再撇下鉤（一筆）' }
      ]
    },
    {
      symbol: 'ㄤ',
      group: 'compound_nasals',
      subGroup: '後鼻韻母',
      isFree: false,
      word: '糖果',
      altWord: '太陽',
      emoji: '🍬',
      altEmoji: '☀️',
      wordSpeakText: '糖果的ㄤ，幫忙的ㄤ',
      wordRuby: [
        { han: '糖', zhuyin: ['ㄊ', 'ㄤ'], tone: 'ˊ', focusIdx: 1 },
        { han: '果', zhuyin: ['ㄍ', 'ㄨ', 'ㄛ'], tone: 'ˇ', focusIdx: -1 }
      ],
      ttsApprox: '骯',
      ttsNote: '第一聲「骯」讀音清楚（若用「昂」則是二聲）；整體辨識度算高',
      distortionRisk: 'low',
      mp3Hint: 'audio/ㄤ.mp3',
      strokes: [
        { points: [[31, 41], [65, 40]], hint: '上方先一橫' },
        { points: [[51, 24], [46, 56], [26, 74]], hint: '中豎撇向左下' },
        { points: [[53, 48], [53, 71], [72, 71]], hint: '右下寫豎彎向右' }
      ]
    },
    {
      symbol: 'ㄥ',
      group: 'compound_nasals',
      subGroup: '後鼻韻母',
      isFree: false,
      word: '蜜蜂',
      altWord: '燈籠',
      emoji: '🐝',
      altEmoji: '🏮',
      wordSpeakText: '蜜蜂的ㄥ，燈籠的ㄥ',
      wordRuby: [
        { han: '蜜', zhuyin: ['ㄇ', 'ㄧ'], tone: 'ˋ', focusIdx: -1 },
        { han: '蜂', zhuyin: ['ㄈ', 'ㄥ'], tone: '', focusIdx: 1 }
      ],
      ttsApprox: '哼',
      ttsNote: '極高失真！國語沒有常用獨立零聲母「ㄥ」漢字，系統只能借「哼」替代（會聽見前面氣音「ㄏ」），為最高優先補錄 MP3！',
      distortionRisk: 'high',
      mp3Hint: 'audio/ㄥ.mp3',
      strokes: [
        { points: [[55, 25], [32, 68], [70, 63]], hint: '先斜撇再折向右橫（一筆）' }
      ]
    }
  ];

  // ===== 聽音拼積木小挑戰題庫 =====
  // type: 'single_free' (免費前 8 聲母認讀), 'tone_challenge' (聲調辨別), 'blending_challenge' (簡單結合韻拼讀)
  const TONE_QUESTIONS = [
    {
      id: 'tone-ma1',
      promptText: '聽一聽，哪一個是「媽 ㄇㄚ」（第一聲）？',
      speakText: '媽，媽媽的媽，第一聲',
      targetDisplay: 'ㄇㄚ',
      targetRuby: [{ han: '媽', zhuyin: ['ㄇ', 'ㄚ'], tone: '', focusIdx: -1 }],
      options: [
        { id: 'ma1', han: '媽', ruby: { han: '媽', zhuyin: ['ㄇ', 'ㄚ'], tone: '', focusIdx: -1 } },
        { id: 'ma2', han: '麻', ruby: { han: '麻', zhuyin: ['ㄇ', 'ㄚ'], tone: 'ˊ', focusIdx: -1 } },
        { id: 'ma3', han: '馬', ruby: { han: '馬', zhuyin: ['ㄇ', 'ㄚ'], tone: 'ˇ', focusIdx: -1 } },
        { id: 'ma4', han: '罵', ruby: { han: '罵', zhuyin: ['ㄇ', 'ㄚ'], tone: 'ˋ', focusIdx: -1 } }
      ],
      answerId: 'ma1'
    },
    {
      id: 'tone-ba4',
      promptText: '聽一聽，哪一個是「爸 ㄅㄚˋ」（第四聲，往下掉）？',
      speakText: '爸，爸爸的爸，第四聲',
      targetRuby: [{ han: '爸', zhuyin: ['ㄅ', 'ㄚ'], tone: 'ˋ', focusIdx: -1 }],
      options: [
        { id: 'ba1', han: '八', ruby: { han: '八', zhuyin: ['ㄅ', 'ㄚ'], tone: '', focusIdx: -1 } },
        { id: 'ba2', han: '拔', ruby: { han: '拔', zhuyin: ['ㄅ', 'ㄚ'], tone: 'ˊ', focusIdx: -1 } },
        { id: 'ba3', han: '把', ruby: { han: '把', zhuyin: ['ㄅ', 'ㄚ'], tone: 'ˇ', focusIdx: -1 } },
        { id: 'ba4', han: '爸', ruby: { han: '爸', zhuyin: ['ㄅ', 'ㄚ'], tone: 'ˋ', focusIdx: -1 } }
      ],
      answerId: 'ba4'
    },
    {
      id: 'tone-ma3',
      promptText: '聽一聽，哪一個是「馬 ㄇㄚˇ」（第三聲，勾起來）？',
      speakText: '馬，小馬的馬，第三聲',
      options: [
        { id: 'ma1', han: '媽', ruby: { han: '媽', zhuyin: ['ㄇ', 'ㄚ'], tone: '', focusIdx: -1 } },
        { id: 'ma2', han: '麻', ruby: { han: '麻', zhuyin: ['ㄇ', 'ㄚ'], tone: 'ˊ', focusIdx: -1 } },
        { id: 'ma3', han: '馬', ruby: { han: '馬', zhuyin: ['ㄇ', 'ㄚ'], tone: 'ˇ', focusIdx: -1 } },
        { id: 'ma4', han: '罵', ruby: { han: '罵', zhuyin: ['ㄇ', 'ㄚ'], tone: 'ˋ', focusIdx: -1 } }
      ],
      answerId: 'ma3'
    },
    {
      id: 'tone-tu4',
      promptText: '聽一聽，哪一個是「兔 ㄊㄨˋ」（第四聲）？',
      speakText: '兔，兔子的兔',
      options: [
        { id: 'tu1', han: '突', ruby: { han: '突', zhuyin: ['ㄊ', 'ㄨ'], tone: '', focusIdx: -1 } },
        { id: 'tu2', han: '圖', ruby: { han: '圖', zhuyin: ['ㄊ', 'ㄨ'], tone: 'ˊ', focusIdx: -1 } },
        { id: 'tu3', han: '土', ruby: { han: '土', zhuyin: ['ㄊ', 'ㄨ'], tone: 'ˇ', focusIdx: -1 } },
        { id: 'tu4', han: '兔', ruby: { han: '兔', zhuyin: ['ㄊ', 'ㄨ'], tone: 'ˋ', focusIdx: -1 } }
      ],
      answerId: 'tu4'
    },
    {
      id: 'tone-yu2',
      promptText: '聽一聽，哪一個是「魚 ㄩˊ」（第二聲，往上爬）？',
      speakText: '魚，小魚的魚，第二聲',
      options: [
        { id: 'yu1', han: '淤', ruby: { han: '淤', zhuyin: ['ㄩ'], tone: '', focusIdx: -1 } },
        { id: 'yu2', han: '魚', ruby: { han: '魚', zhuyin: ['ㄩ'], tone: 'ˊ', focusIdx: -1 } },
        { id: 'yu3', han: '雨', ruby: { han: '雨', zhuyin: ['ㄩ'], tone: 'ˇ', focusIdx: -1 } },
        { id: 'yu4', han: '玉', ruby: { han: '玉', zhuyin: ['ㄩ'], tone: 'ˋ', focusIdx: -1 } }
      ],
      answerId: 'yu2'
    },
    {
      id: 'tone-bo0',
      promptText: '聽一聽，「吧」唸起來輕輕短短的，上面有一顆小點（輕聲）是哪個？',
      speakText: '吧，好吧的吧，輕聲',
      options: [
        { id: 'ba1', han: '巴', ruby: { han: '巴', zhuyin: ['ㄅ', 'ㄚ'], tone: '', focusIdx: -1 } },
        { id: 'ba2', han: '拔', ruby: { han: '拔', zhuyin: ['ㄅ', 'ㄚ'], tone: 'ˊ', focusIdx: -1 } },
        { id: 'ba3', han: '把', ruby: { han: '把', zhuyin: ['ㄅ', 'ㄚ'], tone: 'ˇ', focusIdx: -1 } },
        { id: 'ba0', han: '吧', ruby: { han: '吧', zhuyin: ['ㄅ', 'ㄚ'], tone: '˙', focusIdx: -1 } }
      ],
      answerId: 'ba0'
    }
  ];

  const BLENDING_QUESTIONS = [
    {
      id: 'blend-bao',
      promptText: 'ㄅ ＋ ㄠ 可以拼出哪一個字？',
      speakText: 'ㄅ，ㄠ，拼起來是「包」，包子的包',
      formula: 'ㄅ ＋ ㄠ',
      emoji: '🥟',
      options: [
        { id: 'bao', han: '包', ruby: { han: '包', zhuyin: ['ㄅ', 'ㄠ'], tone: '', focusIdx: -1 } },
        { id: 'mao', han: '貓', ruby: { han: '貓', zhuyin: ['ㄇ', 'ㄠ'], tone: '', focusIdx: -1 } },
        { id: 'gao', han: '高', ruby: { han: '高', zhuyin: ['ㄍ', 'ㄠ'], tone: '', focusIdx: -1 } }
      ],
      answerId: 'bao'
    },
    {
      id: 'blend-gua',
      promptText: 'ㄍ ＋ ㄨㄚ（西瓜的瓜）是哪一塊積木？',
      speakText: 'ㄍ，ㄨㄚ，拼起來是「瓜」，西瓜的瓜',
      formula: 'ㄍ ＋ ㄨ ＋ ㄚ',
      emoji: '🍉',
      options: [
        { id: 'gua', han: '瓜', ruby: { han: '瓜', zhuyin: ['ㄍ', 'ㄨ', 'ㄚ'], tone: '', focusIdx: -1 } },
        { id: 'hua', han: '花', ruby: { han: '花', zhuyin: ['ㄏ', 'ㄨ', 'ㄚ'], tone: '', focusIdx: -1 } },
        { id: 'kua', han: '誇', ruby: { han: '誇', zhuyin: ['ㄎ', 'ㄨ', 'ㄚ'], tone: '', focusIdx: -1 } }
      ],
      answerId: 'gua'
    },
    {
      id: 'blend-fei',
      promptText: 'ㄈ ＋ ㄟ 可以拼出哪一個字？',
      speakText: 'ㄈ，ㄟ，拼起來是「飛」，飛機的飛',
      formula: 'ㄈ ＋ ㄟ',
      emoji: '✈️',
      options: [
        { id: 'bei', han: '杯', ruby: { han: '杯', zhuyin: ['ㄅ', 'ㄟ'], tone: '', focusIdx: -1 } },
        { id: 'fei', han: '飛', ruby: { han: '飛', zhuyin: ['ㄈ', 'ㄟ'], tone: '', focusIdx: -1 } },
        { id: 'hei', han: '黑', ruby: { han: '黑', zhuyin: ['ㄏ', 'ㄟ'], tone: '', focusIdx: -1 } }
      ],
      answerId: 'fei'
    },
    {
      id: 'blend-xiang',
      promptText: 'ㄒ ＋ ㄧㄤ（大象的象，四聲）怎麼拼？',
      speakText: 'ㄒ，ㄧㄤ，四聲，大象的象',
      formula: 'ㄒ ＋ ㄧ ＋ ㄤˋ',
      emoji: '🐘',
      options: [
        { id: 'xiang', han: '象', ruby: { han: '象', zhuyin: ['ㄒ', 'ㄧ', 'ㄤ'], tone: 'ˋ', focusIdx: -1 } },
        { id: 'jiang', han: '醬', ruby: { han: '醬', zhuyin: ['ㄐ', 'ㄧ', 'ㄤ'], tone: 'ˋ', focusIdx: -1 } },
        { id: 'qiang', han: '搶', ruby: { han: '搶', zhuyin: ['ㄑ', 'ㄧ', 'ㄤ'], tone: 'ˇ', focusIdx: -1 } }
      ],
      answerId: 'xiang'
    },
    {
      id: 'blend-niu',
      promptText: 'ㄋ ＋ ㄧㄡˊ（牛奶的牛，二聲）是哪一個？',
      speakText: 'ㄋ，ㄧㄡ，二聲，牛奶的牛',
      formula: 'ㄋ ＋ ㄧ ＋ ㄡˊ',
      emoji: '🐄',
      options: [
        { id: 'niu', han: '牛', ruby: { han: '牛', zhuyin: ['ㄋ', 'ㄧ', 'ㄡ'], tone: 'ˊ', focusIdx: -1 } },
        { id: 'liu', han: '流', ruby: { han: '流', zhuyin: ['ㄌ', 'ㄧ', 'ㄡ'], tone: 'ˊ', focusIdx: -1 } },
        { id: 'qiu', han: '球', ruby: { han: '球', zhuyin: ['ㄑ', 'ㄧ', 'ㄡ'], tone: 'ˊ', focusIdx: -1 } }
      ],
      answerId: 'niu'
    },
    {
      id: 'blend-feng',
      promptText: 'ㄈ ＋ ㄥ（蜜蜂的蜂）是哪一塊積木？',
      speakText: 'ㄈ，ㄥ，蜜蜂的蜂',
      formula: 'ㄈ ＋ ㄥ',
      emoji: '🐝',
      options: [
        { id: 'deng', han: '燈', ruby: { han: '燈', zhuyin: ['ㄉ', 'ㄥ'], tone: '', focusIdx: -1 } },
        { id: 'feng', han: '蜂', ruby: { han: '蜂', zhuyin: ['ㄈ', 'ㄥ'], tone: '', focusIdx: -1 } },
        { id: 'meng', han: '夢', ruby: { han: '夢', zhuyin: ['ㄇ', 'ㄥ'], tone: 'ˋ', focusIdx: -1 } }
      ],
      answerId: 'feng'
    }
  ];

  return {
    GROUPS,
    CRAYON_COLORS,
    SYMBOLS,
    TONE_QUESTIONS,
    BLENDING_QUESTIONS,
    FREE_COUNT: SYMBOLS.filter((s) => s.isFree).length,
    DEMO_UNLOCK_CODE: 'DEMO2026'
  };
})();
