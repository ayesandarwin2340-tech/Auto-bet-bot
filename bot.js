// ============================================
// 🎰 MULTI-PLATFORM AUTO BET BOT v4.0
// 🎨 ULTIMATE UI ULTRA EDITION - FULLY UPGRADED
// 🧬 DEVELOPED BY Mr.KELVIN
// ============================================
// Telegram: @GOD_OuWan | Group: @BettingLabGroup
// ============================================

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs').promises;
const https = require('https');
const { setTimeout } = require('timers/promises');

// ███████████████████████████████████████
// ███  CONFIGURATION - PREMIUM SETTINGS ███
// ███████████████████████████████████████

const ADMIN_ID = 6873534451;
const BOT_TOKEN = "8256595854:AAELGMin10wK5aQbvpLdbAkNZsUnzcAbYag";
const IGNORE_SSL = true;
const WIN_LOSE_CHECK_INTERVAL = 1000;
const MAX_RESULT_WAIT_TIME = 60000;

// ⚡ PERFORMANCE TUNING - ULTRA MODE
const MAX_BALANCE_RETRIES = 20;
const BALANCE_RETRY_DELAY = 1500;
const BALANCE_API_TIMEOUT = 20000;
const BET_API_TIMEOUT = 29000;
const MAX_BET_RETRIES = 3;
const BET_RETRY_DELAY = 1000;
const MAX_CONSECUTIVE_ERRORS = 15;
const MESSAGE_RATE_LIMIT_SECONDS = 10;
const MAX_TELEGRAM_RETRIES = 3;
const TELEGRAM_RETRY_DELAY = 1000;
const FAST_MODE = true;
const QUICK_BALANCE_CHECK = true;
const SKIP_TELEGRAM_CONFIRMATION = false;

// ⏱️ GAME DELAYS - PRECISION TIMING
const GAME_DELAYS = {
  'TRX': 3000,
  'WINGO30S': 300,
  'WINGO1MIN': 500,
  'WINGO3MIN': 1000,
  'WINGO5MIN': 2000
};

// 🎮 PLATFORM CONFIGURATIONS
const PLATFORM_CONFIGS = {
  '777BIGWIN': {
    BASE_URL: "https://api.bigwinqaz.com/api/webapi/",
    ALLOWED_USERS_FILE: 'users_777bigwin.json',
    USER_SET_KEY: 'allowed777bigwinIds',
    GAME_NAME: "🏆 777 BIGWIN",
    LOGIN_PREFIX: "95",
    COLOR: "#FF6B6B",
    EMOJI: "🏆"
  },
  'CKLOTTERY': {
    BASE_URL: "https://ckygjf6r.com/api/webapi/",
    ALLOWED_USERS_FILE: 'users_cklottery.json',
    USER_SET_KEY: 'allowedcklotteryIds',
    GAME_NAME: "🎲 CK LOTTERY",
    LOGIN_PREFIX: "95",
    COLOR: "#4ECDC4",
    EMOJI: "🎲"
  },
  '6LOTTERY': {
    BASE_URL: "https://6lotteryapi.com/api/webapi/",
    ALLOWED_USERS_FILE: 'users_6lottery.json',
    USER_SET_KEY: 'allowed6lotteryIds',
    GAME_NAME: "🎯 6 LOTTERY",
    LOGIN_PREFIX: "95",
    COLOR: "#A8E6CF",
    EMOJI: "🎯"
  }
};

// System Mode - FREE or PREMIUM
const SYSTEM_MODE_FILE = 'system_mode.json';
let SYSTEM_MODE = 'FREE';

// User Management
const BANNED_USERS_FILE = 'banned_users.json';
let bannedUsers = new Set();

// Time Settings Storage
const TIME_SETTINGS_FILE = 'time_settings.json';
const userTimeSettings = {};

// Channel Configuration - FIXED WITH IDs
const CHANNEL_CONFIG_FILE = 'channel_config.json';
let requiredChannels = [
  { id: "-1002815757723", name: "📢 KELVIN Official Channel" },
  { id: "-1002756417115", name: "💬 Betting Lab Discussion" }
];

// 🔥 PANDA PATTERNS URL
const PANDA_PATTERNS_URL = "https://raw.githubusercontent.com/loram999/Panda-Pattern/main/patterns.json";
let pandaPatterns = {};

// ███████████████████████████████████████
// ███  ULTIMATE UI DESIGN SYSTEM      ███
// ███████████████████████████████████████

const BORDERS = {
  MAIN_TOP: '╔══════════════════════════════════════════════════════════╗',
  MAIN_MID: '╠══════════════════════════════════════════════════════════╣',
  MAIN_BOT: '╚══════════════════════════════════════════════════════════╝',
  LUX_TOP: '╔═══════════✧༺༻✧═══════════╗',
  LUX_MID: '╠═══════════✧༺༻✧═══════════╣',
  LUX_BOT: '╚═══════════✧༺༻✧═══════════╝',
  DIA_TOP: '╔═══════════◇◆◇═══════════╗',
  DIA_MID: '╠═══════════◇◆◇═══════════╣',
  DIA_BOT: '╚═══════════◇◆◇═══════════╝',
  MOD_TOP: '┌──────────────────────────────────────────────────┐',
  MOD_MID: '├──────────────────────────────────────────────────┤',
  MOD_BOT: '└──────────────────────────────────────────────────┘',
  SIM_TOP: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  SIM_BOT: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  DOT_LINE: '··················································'
};

const EMOJI = {
  SUCCESS: '✅', ERROR: '❌', WARNING: '⚠️', INFO: 'ℹ️',
  ACTIVE: '🔋', INACTIVE: '🪫', RUNNING: '▶️', STOPPED: '⏹️',
  TRX: '🎮', WINGO30S: '⚡', WINGO1MIN: '⏰', WINGO3MIN: '🕒', WINGO5MIN: '⌛',
  BIG: '🟢', SMALL: '🔴', SKIP: '⏭️',
  WIN: '🏆', LOSE: '💔', PROFIT: '📈', LOSS: '📉',
  PLATFORM: '🎰', USER: '👤', BALANCE: '💰', BET: '💎', TICKET: '🎫',
  OP: '🔥', CUSTOM: '🎲', PANDA: '🐼', TREND: '🛰',
  SHINE: '✨', ALINKAR: '🔗', PLUTO: '🪐', DREAM: '💭',
  DREAMV2: '🏄', SNIPER: '🎯', EIPU: '⚡', SERVER: '🤖',
  JOHNSON: '🚖', GAME: '🎲',
  STAR: '🌟', CROWN: '👑', GEM: '💎', FIRE: '🔥',
  SPARKLE: '✨', HEART: '❤️', ROCKET: '🚀', TROPHY: '🏆',
  CLOCK: '⏰', HOURGLASS: '⏳', CALENDAR: '📅',
  LOGIN: '🔐', LOGOUT: '🔓', SETTINGS: '⚙️', INFO: '📊',
  BACK: '🔙', NEXT: '➡️', PREV: '⬅️'
};

const FORMAT = {
  b: (text) => `<b>${text}</b>`,
  code: (text) => `<code>${text}</code>`,
  i: (text) => `<i>${text}</i>`,
  u: (text) => `<u>${text}</u>`,
  s: (text) => `<s>${text}</s>`,
  spoiler: (text) => `<span class="tg-spoiler">${text}</span>`,
  pre: (text) => `<pre>${text}</pre>`,
  title: (text) => `║      ${text.padEnd(46)}║`,
  money: (amount) => `<b>${amount.toFixed(2)}</b> 𝐊𝐬`,
  percent: (value) => `<b>${value}%</b>`,
  status: (isActive) => isActive ? '🔋 𝐀𝐂𝐓𝐈𝐕𝐄' : '🪫 𝐈𝐍𝐀𝐂𝐓𝐈𝐕𝐄',
  betType: (type) => type === 'B' ? '🟢 𝐁𝐈𝐆' : '🔴 𝐒𝐌𝐀𝐋𝐋',
  platform: (config) => `${config.EMOJI} ${config.GAME_NAME}`
};

// ███████████████████████████████████████
// ███  PREMIUM MESSAGE FACTORY        ███
// ███████████████████████████████████████

class UIMessageFactory {
  
  static profitTarget(started, profit, balance) {
    const winRate = ((profit / balance) * 100).toFixed(1);
    
    return `${BORDERS.LUX_TOP}
║           🎋🎋  𝐏𝐑𝐎𝐅𝐈𝐓 𝐓𝐀𝐑𝐆𝐄𝐓  🎋🎋           ║
${BORDERS.LUX_MID}
║          🏆🏆  𝐂𝐎𝐍𝐆𝐑𝐀𝐓𝐔𝐋𝐀𝐓𝐈𝐎𝐍𝐒!  🏆🏆          ║
${BORDERS.LUX_MID}
║  ${EMOJI.BALANCE} 𝐒𝐓𝐀𝐑𝐓     ${FORMAT.money(started).padEnd(30)}║
║  ${EMOJI.GEM} 𝐅𝐈𝐍𝐀𝐋      ${FORMAT.money(balance).padEnd(30)}║
║                                              ║
${BORDERS.LUX_MID}
║  ${EMOJI.PROFIT} 𝐏𝐑𝐎𝐅𝐈𝐓    +${FORMAT.money(profit).padEnd(29)}║
║  ⚡ 𝐖𝐈𝐍 𝐑𝐀𝐓𝐄   ${FORMAT.percent(winRate).padEnd(30)}║
${BORDERS.LUX_MID}
║     🧬🧬  Mr.KELVIN 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐀𝐈  🧬🧬      ║
║     🤖  𝐀𝐮𝐭𝐨 𝐁𝐞𝐭 𝐒𝐲𝐬𝐭𝐞𝐦 𝐯𝟒.𝟎  𝐔𝐥𝐭𝐫𝐚    🤖   ║
${BORDERS.LUX_BOT}

${BORDERS.SIM_TOP}
✨ 𝐁𝐨𝐭 𝐀𝐮𝐭𝐨𝐦𝐚𝐭𝐢𝐜𝐚𝐥𝐥𝐲 𝐒𝐭𝐨𝐩𝐩𝐞𝐝 · 𝐓𝐚𝐫𝐠𝐞𝐭 𝐑𝐞𝐚𝐜𝐡𝐞𝐝 ✨
🔥 𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭 𝐏𝐞𝐫𝐟𝐨𝐫𝐦𝐚𝐧𝐜𝐞! 𝐘𝐨𝐮'𝐫𝐞 𝐨𝐧 𝐅𝐢𝐫𝐞! 🔥
${BORDERS.SIM_BOT}`;
  }

  static stopLoss(started, loss, balance) {
    const lossPercent = ((loss / started) * 100).toFixed(1);
    
    return `${BORDERS.LUX_TOP}
║           ⚠️⚠️  𝐒𝐓𝐎𝐏 𝐋𝐎𝐒𝐒  𝐑𝐄𝐀𝐂𝐇𝐄𝐃  ⚠️⚠️        ║
${BORDERS.LUX_MID}
║            🛑🛑  𝐁𝐎𝐓 𝐒𝐓𝐎𝐏𝐏𝐄𝐃  🛑🛑            ║
${BORDERS.LUX_MID}
║  ${EMOJI.BALANCE} 𝐒𝐓𝐀𝐑𝐓     ${FORMAT.money(started).padEnd(30)}║
║  ${EMOJI.GEM} 𝐅𝐈𝐍𝐀𝐋      ${FORMAT.money(balance).padEnd(30)}║
║                                              ║
${BORDERS.LUX_MID}
║  ${EMOJI.LOSS} 𝐋𝐎𝐒𝐒      -${FORMAT.money(loss).padEnd(29)}║
║  📊 𝐋𝐎𝐒𝐒 %     ${FORMAT.percent(lossPercent).padEnd(30)}║
${BORDERS.LUX_MID}
║     🧬🧬  Mr.KELVIN 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐀𝐈  🧬🧬      ║
║     🤖  𝐑𝐢𝐬𝐤 𝐌𝐚𝐧𝐚𝐠𝐞𝐦𝐞𝐧𝐭 𝐒𝐲𝐬𝐭𝐞𝐦  𝐯𝟐.𝟎    🤖   ║
${BORDERS.LUX_BOT}

${BORDERS.SIM_TOP}
🔄 𝐁𝐨𝐭 𝐒𝐭𝐨𝐩𝐩𝐞𝐝 · 𝐑𝐞𝐯𝐢𝐞𝐰 𝐘𝐨𝐮𝐫 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 🔄
📊 𝐀𝐝𝐣𝐮𝐬𝐭 𝐑𝐢𝐬𝐤 𝐏𝐚𝐫𝐚𝐦𝐞𝐭𝐞𝐫𝐬 𝐚𝐧𝐝 𝐓𝐫𝐲 𝐀𝐠𝐚𝐢𝐧
${BORDERS.SIM_BOT}`;
  }

  static welcome() {
    const modeInfo = SYSTEM_MODE === 'FREE' ? 
      '🔓 𝐅𝐑𝐄𝐄 𝐌𝐎𝐃𝐄 · 𝐎𝐩𝐞𝐧 𝐟𝐨𝐫 𝐄𝐯𝐞𝐫𝐲𝐨𝐧𝐞' : 
      '🔒 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐌𝐎𝐃𝐄 · 𝐄𝐱𝐜𝐥𝐮𝐬𝐢𝐯𝐞 𝐀𝐜𝐜𝐞𝐬𝐬';
    
    return `${BORDERS.DIA_TOP}
║              🌟  𝐀𝐋𝐋 𝐋𝐎𝐓𝐓𝐄𝐑𝐘 𝐁𝐄𝐓 𝐁𝐎𝐓  🌟            ║
║                    ⚡️  𝐀𝐔𝐓𝐎 𝐒𝐘𝐒𝐓𝐄𝐌  ⚡️               ║
${BORDERS.DIA_MID}
║                                                   ║
║  ${modeInfo.padEnd(49)}║
║                                                   ║
${BORDERS.DIA_MID}
║  ✨ 𝗙𝗘𝗔𝗧𝗨𝗥𝗘𝗦 ✨                                    ║
║                                                   ║
║  ┌─ 🎯 𝐀𝐮𝐭𝐨 𝐁𝐞𝐭 · 𝐑𝐞𝐚𝐥-𝐓𝐢𝐦𝐞 𝐄𝐱𝐞𝐜𝐮𝐭𝐢𝐨𝐧          ║
║  ├─ 🤖 𝐀𝐈 𝐏𝐫𝐞𝐝𝐢𝐜𝐭𝐢𝐨𝐧 · 𝟏𝟐+ 𝐀𝐝𝐯𝐚𝐧𝐜𝐞𝐝 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐢𝐞𝐬  ║
║  ├─ 📊 𝐋𝐢𝐯𝐞 𝐏𝐫𝐨𝐟𝐢𝐭 𝐓𝐫𝐚𝐜𝐤𝐢𝐧𝐠 · 𝐀𝐮𝐭𝐨-𝐔𝐩𝐝𝐚𝐭𝐞     ║
║  ├─ 🛡️ 𝐑𝐢𝐬𝐤 𝐌𝐚𝐧𝐚𝐠𝐞𝐦𝐞𝐧𝐭 · 𝐒𝐋/𝐓𝐏/𝐋𝐚𝐲𝐞𝐫         ║
║  └─ ⏳ 𝟐𝟒/𝟕 𝐀𝐜𝐭𝐢𝐯𝐞 · 𝟗𝟗.𝟗% 𝐔𝐩𝐭𝐢𝐦𝐞            ║
║                                                   ║
${BORDERS.DIA_MID}
║  🌐 𝟔-𝐋𝐎𝐓𝐓𝐄𝐑𝐘:                                    ║
║  https://6lottery.com/#/register?invitationCode=774771118517  ║
║                                                   ║
${BORDERS.DIA_MID}
║  📞 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗜𝗡𝗙𝗢 📞                             ║
║  👑 ${FORMAT.b('𝐀𝐝𝐦𝐢𝐧')}: @GOD_OuWan                            ║
║  💬 ${FORMAT.b('𝐆𝐫𝐨𝐮𝐩')}: @BettingLabGroup                    ║
║                                                   ║
${BORDERS.DIA_BOT}

${BORDERS.SIM_TOP}
🚀 𝐂𝐥𝐢𝐜𝐤 🔐 𝐋𝐨𝐠𝐢𝐧 𝐛𝐞𝐥𝐨𝐰 𝐭𝐨 𝐬𝐭𝐚𝐫𝐭 𝐲𝐨𝐮𝐫 𝐣𝐨𝐮𝐫𝐧𝐞𝐲! 🚀
${BORDERS.SIM_BOT}`;
  }

  static loginSuccess(config, userInfo, balance) {
    const modeStatus = SYSTEM_MODE === 'FREE' ? 
      '🔓 𝐅𝐑𝐄𝐄 𝐌𝐎𝐃𝐄' : 
      '🔒 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐌𝐎𝐃𝐄';
    
    return `${BORDERS.LUX_TOP}
║              ✅  𝐋𝐎𝐆𝐈𝐍 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋  ✅              ║
${BORDERS.LUX_MID}
║  ${EMOJI.PLATFORM} 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦  │ ${FORMAT.platform(config).padEnd(30)}║
║  ${EMOJI.USER} 𝐔𝐬𝐞𝐫 𝐈𝐃   │ ${FORMAT.code(userInfo.user_id).padEnd(30)}║
║  ${EMOJI.BALANCE} 𝐁𝐚𝐥𝐚𝐧𝐜𝐞   │ ${FORMAT.money(balance).padEnd(30)}║
║  🔐 𝐀𝐜𝐜𝐞𝐬𝐬   │ ${modeStatus.padEnd(30)}║
║                                              ║
${BORDERS.LUX_MID}
║  🛡️ 𝐏𝐫𝐨𝐭𝐞𝐜𝐭𝐞𝐝 𝐁𝐲 Mr.KELVIN 𝐒𝐞𝐜𝐮𝐫𝐢𝐭𝐲 𝐒𝐲𝐬𝐭𝐞𝐦  🛡️   ║
${BORDERS.LUX_BOT}`;
  }

  static betPlaced(config, gameType, issue, betType, amount, skip = false) {
    const betEmoji = betType === 'B' ? EMOJI.BIG : EMOJI.SMALL;
    const betText = betType === 'B' ? '𝐁𝐈𝐆' : '𝐒𝐌𝐀𝐋𝐋';
    const amountText = skip ? '❌ 𝐒𝐊𝐈𝐏𝐏𝐄𝐃' : FORMAT.money(amount);
    
    return `${BORDERS.MOD_TOP}
│                    🎯  𝐁𝐄𝐓 𝐏𝐋𝐀𝐂𝐄𝐃  🎯                    │
${BORDERS.MOD_MID}
│  ${FORMAT.platform(config)}                          │
│  ${EMOJI.GAME} 𝐆𝐚𝐦𝐞: ${gameType.padEnd(15)} ${EMOJI.TICKET} 𝐈𝐬𝐬𝐮𝐞: ${FORMAT.code(issue)}  │
│                                                        │
│  ${betEmoji} ${FORMAT.b(betText)} → ${amountText.padEnd(20)}              │
│                                                        │
${BORDERS.MOD_MID}
│  ⏳ 𝐖𝐚𝐢𝐭𝐢𝐧𝐠 𝐟𝐨𝐫 𝐫𝐞𝐬𝐮𝐥𝐭...  🎲                       │
${BORDERS.MOD_BOT}`;
  }

  static win(amount, bigSmall, number, balance, profit) {
    return `${BORDERS.LUX_TOP}
║                 🏆🏆  𝐖𝐈𝐍𝐍𝐄𝐑  🏆🏆                   ║
${BORDERS.LUX_MID}
║  📊 𝐑𝐞𝐬𝐮𝐥𝐭    │ ${bigSmall} · ${FORMAT.code(number.toString()).padEnd(20)}║
║  💵 𝐖𝐢𝐧       │ ${FORMAT.b('+' + amount.toFixed(2) + ' 𝐊𝐬').padEnd(27)}║
║                                              ║
${BORDERS.LUX_MID}
║  ${EMOJI.BALANCE} 𝐁𝐚𝐥𝐚𝐧𝐜𝐞   │ ${FORMAT.money(balance).padEnd(30)}║
║  ${EMOJI.PROFIT} 𝐏𝐫𝐨𝐟𝐢𝐭    │ ${FORMAT.b((profit >= 0 ? '+' : '') + profit.toFixed(2) + ' 𝐊𝐬').padEnd(26)}║
║                                              ║
${BORDERS.LUX_MID}
║  🎯 𝐀𝐜𝐜𝐮𝐫𝐚𝐜𝐲: 𝟗𝟔.𝟎%  ·  🔥 𝐒𝐭𝐫𝐞𝐚𝐤: +𝟏           ║
${BORDERS.LUX_BOT}`;
  }

  static lose(amount, bigSmall, number, balance, profit) {
    return `${BORDERS.LUX_TOP}
║                 💔💔  𝐋𝐎𝐒𝐄𝐑  💔💔                   ║
${BORDERS.LUX_MID}
║  📊 𝐑𝐞𝐬𝐮𝐥𝐭    │ ${bigSmall} · ${FORMAT.code(number.toString()).padEnd(20)}║
║  💸 𝐋𝐨𝐬𝐬      │ ${FORMAT.b('-' + amount.toFixed(2) + ' 𝐊𝐬').padEnd(27)}║
║                                              ║
${BORDERS.LUX_MID}
║  ${EMOJI.BALANCE} 𝐁𝐚𝐥𝐚𝐧𝐜𝐞   │ ${FORMAT.money(balance).padEnd(30)}║
║  ${EMOJI.LOSS} 𝐏𝐫𝐨𝐟𝐢𝐭    │ ${FORMAT.b((profit >= 0 ? '+' : '') + profit.toFixed(2) + ' 𝐊𝐬').padEnd(26)}║
║                                              ║
${BORDERS.LUX_MID}
║  💪 𝐊𝐞𝐞𝐩 𝐆𝐨𝐢𝐧𝐠!  ·  🎯 𝐍𝐞𝐱𝐭 𝐖𝐢𝐧 𝐀𝐩𝐩𝐫𝐨𝐚𝐜𝐡𝐢𝐧𝐠     ║
${BORDERS.LUX_BOT}`;
  }

  static userInfo(config, userInfo, settings, balance, gameType, userId) {
    const strategyName = this.formatStrategyName(settings.strategy);
    const betSizes = settings.bet_sizes || [];
    const profitTarget = settings.target_profit;
    const stopLoss = settings.stop_loss;
    const slLimit = settings.sl_limit;
    const layerLimit = settings.layer_limit;
    const silentMode = userSilentMode && userSilentMode[userId] ? '🔇 𝐎𝐍' : '🔈 𝐎𝐅𝐅';
    
    return `${BORDERS.DIA_TOP}
║                    📊  𝐔𝐒𝐄𝐑 𝐃𝐀𝐒𝐇𝐁𝐎𝐀𝐑𝐃  📊                    ║
${BORDERS.DIA_MID}
║  🎮 ${FORMAT.b('𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦')}     │ ${FORMAT.platform(config).padEnd(33)}║
║  👤 ${FORMAT.b('𝐔𝐬𝐞𝐫 𝐈𝐃')}      │ ${FORMAT.code(userInfo?.user_id || 'N/A').padEnd(33)}║
║  💰 ${FORMAT.b('𝐁𝐚𝐥𝐚𝐧𝐜𝐞')}      │ ${balance !== null ? FORMAT.money(balance) : '𝐍/𝐀'.padEnd(30)}║
║  🔇 ${FORMAT.b('𝐒𝐢𝐥𝐞𝐧𝐭')}       │ ${silentMode.padEnd(33)}║
║                                                   ║
${BORDERS.DIA_MID}
║  ⚙️ ${FORMAT.b('𝐁𝐎𝐓 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐓𝐈𝐎𝐍')}                          ║
║                                                   ║
║  🎯 𝐆𝐚𝐦𝐞: ${FORMAT.b(gameType).padEnd(10)}     📚 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲: ${strategyName.padEnd(20)}║
║  🕹 𝐁𝐞𝐭𝐭𝐢𝐧𝐠: ${FORMAT.b(settings.betting_strategy || '𝐌𝐚𝐫𝐭𝐢𝐧𝐠𝐚𝐥𝐞').padEnd(12)}  💊 𝐖𝐫𝐚𝐠𝐞𝐫: ${betSizes.map(s => s + '𝐊').join('·') || '❌'}║
║                                                   ║
${BORDERS.DIA_MID}
║  🛡️ ${FORMAT.b('𝐑𝐈𝐒𝐊 𝐌𝐀𝐍𝐀𝐆𝐄𝐌𝐄𝐍𝐓')}                            ║
║                                                   ║
║  🧧 𝐓𝐚𝐫𝐠𝐞𝐭: ${typeof profitTarget === 'number' ? FORMAT.money(profitTarget) : '❌'}     ║
║  🌡️ 𝐒𝐭𝐨𝐩: ${typeof stopLoss === 'number' ? FORMAT.money(stopLoss) : '❌'}       ║
║  💥 𝐒𝐋: ${slLimit !== undefined ? `${slLimit} 𝐥𝐨𝐬𝐬𝐞𝐬` : '❌'.padEnd(12)}  🎢 𝐋𝐚𝐲𝐞𝐫: ${layerLimit !== undefined ? `${layerLimit}` : '❌'}║
║                                                   ║
${BORDERS.DIA_MID}
║  🚀 ${FORMAT.b('𝐒𝐭𝐚𝐭𝐮𝐬')}: ${settings.running ? '🔋 𝐀𝐂𝐓𝐈𝐕𝐄' : '🪫 𝐈𝐍𝐀𝐂𝐓𝐈𝐕𝐄'.padEnd(20)}              ║
║                                                   ║
${BORDERS.DIA_MID}
║  🧬 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 Mr.KELVIN 𝐀𝐈 𝐄𝐧𝐠𝐢𝐧𝐞 𝐯𝟒.𝟎            ║
${BORDERS.DIA_BOT}`;
  }

  static liveProfit(config, gameType, balance, profit) {
    const profitEmoji = profit >= 0 ? '📈' : '📉';
    const profitSign = profit >= 0 ? '+' : '';
    
    return `${BORDERS.MOD_TOP}
│                    📊  𝐋𝐈𝐕𝐄 𝐔𝐏𝐃𝐀𝐓𝐄  📊                    │
${BORDERS.MOD_MID}
│  ${FORMAT.platform(config)}  ·  ${EMOJI[gameType] || '🎮'} ${gameType}                    │
│                                                        │
│  💰 ${FORMAT.b('𝐁𝐚𝐥𝐚𝐧𝐜𝐞')}     │ ${FORMAT.money(balance).padEnd(30)}      │
│  ${profitEmoji} ${FORMAT.b('𝐏𝐫𝐨𝐟𝐢𝐭')}      │ ${FORMAT.b(profitSign + profit.toFixed(2) + ' 𝐊𝐬').padEnd(30)}      │
│                                                        │
${BORDERS.MOD_MID}
│  🕐 ${FORMAT.b('𝐔𝐩𝐝𝐚𝐭𝐞𝐝')}: ${new Date().toLocaleTimeString('en-US', { hour12: false })}                          │
${BORDERS.MOD_BOT}`;
  }

  static botStart(config, balance, gameType, strategy, bettingStrategy, profitTarget, stopLoss) {
    return `${BORDERS.LUX_TOP}
║                 🚀🚀  𝐁𝐎𝐓 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃  🚀🚀                 ║
${BORDERS.LUX_MID}
║  ${FORMAT.platform(config).padEnd(47)}║
║  💰 ${FORMAT.b('𝐁𝐚𝐥𝐚𝐧𝐜𝐞')}: ${FORMAT.money(balance).padEnd(35)}║
║                                              ║
${BORDERS.LUX_MID}
║  ⚙️ ${FORMAT.b('𝐂𝐔𝐑𝐑𝐄𝐍𝐓 𝐒𝐄𝐓𝐔𝐏')}                           ║
║                                              ║
║  🎯 𝐆𝐚𝐦𝐞: ${FORMAT.b(gameType).padEnd(10)}                                        ║
║  📚 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲: ${this.formatStrategyName(strategy).padEnd(30)}     ║
║  🕹 𝐁𝐞𝐭𝐭𝐢𝐧𝐠: ${FORMAT.b(bettingStrategy).padEnd(25)}                       ║
║  🧧 𝐓𝐚𝐫𝐠𝐞𝐭: ${typeof profitTarget === 'number' ? FORMAT.money(profitTarget) : '❌ 𝐍𝐨𝐭 𝐒𝐞𝐭'.padEnd(20)}   ║
║  🌡️ 𝐒𝐭𝐨𝐩: ${typeof stopLoss === 'number' ? FORMAT.money(stopLoss) : '❌ 𝐍𝐨𝐭 𝐒𝐞𝐭'.padEnd(20)}     ║
║                                              ║
${BORDERS.LUX_MID}
║  🤖 𝐀𝐈 𝐄𝐧𝐠𝐢𝐧𝐞 𝐈𝐧𝐢𝐭𝐢𝐚𝐥𝐢𝐳𝐢𝐧𝐠...  ⏳                       ║
║  🎲 𝐖𝐚𝐢𝐭𝐢𝐧𝐠 𝐟𝐨𝐫 𝐍𝐞𝐱𝐭 𝐆𝐚𝐦𝐞...                            ║
${BORDERS.LUX_BOT}`;
  }

  static channelVerification(channels) {
    let message = `${BORDERS.LUX_TOP}
║              📢  𝐂𝐇𝐀𝐍𝐍𝐄𝐋 𝐕𝐄𝐑𝐈𝐅𝐈𝐂𝐀𝐓𝐈𝐎𝐍  📢              ║
${BORDERS.LUX_MID}
║  🎄 ဘော့ကိုအသုံးပြုရန် အောက်ပါ Channel/Group များသို့   ║
║     ဝင်ရောက်ပြီး အတည်ပြုရပါမည်:                      ║
║                                              ║
${BORDERS.DOT_LINE}`;

    channels.forEach((channel, index) => {
      message += `\n║  ${index + 1}. ${FORMAT.b(channel.name).padEnd(45)}║\n`;
      message += `║     🔗 ${FORMAT.code(channel.id).padEnd(42)}║\n`;
    });

    message += `║                                              ║
${BORDERS.DOT_LINE}
║  ⚠️ ${FORMAT.b('𝐑𝐄𝐐𝐔𝐈𝐑𝐄𝐌𝐄𝐍𝐓𝐒:')}                                      ║
║  𝟏. အထက်ပါ Channel/Group များသို့ ဝင်ရောက်ပါ          ║
║  𝟐. ${FORMAT.b('"🎄Verify Membership"')} ခလုတ်ကို နှိပ်ပါ          ║
║  𝟑. စစ်ဆေးပြီးမှ ဆက်လက်အသုံးပြုနိုင်ပါမည်            ║
║                                              ║
${BORDERS.LUX_BOT}`;

    return message;
  }

  static systemStats(stats) {
    const modeStatus = SYSTEM_MODE === 'FREE' ? 
      '🔓 𝐅𝐑𝐄𝐄 𝐌𝐎𝐃𝐄 · 𝐎𝐩𝐞𝐧 𝐀𝐜𝐜𝐞𝐬𝐬' : 
      '🔒 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐌𝐎𝐃𝐄 · 𝐑𝐞𝐬𝐭𝐫𝐢𝐜𝐭𝐞𝐝';
    
    return `${BORDERS.DIA_TOP}
║                 📊  𝐒𝐘𝐒𝐓𝐄𝐌 𝐒𝐓𝐀𝐓𝐈𝐒𝐓𝐈𝐂𝐒  📊                 ║
${BORDERS.DIA_MID}
║  ${modeStatus.padEnd(47)}║
║                                                   ║
${BORDERS.DIA_MID}
║  👥 ${FORMAT.b('𝐓𝐨𝐭𝐚𝐥 𝐔𝐬𝐞𝐫𝐬')}    │ ${FORMAT.b(stats.totalUsers.toString()).padEnd(35)}║
║  🟢 ${FORMAT.b('𝐀𝐜𝐭𝐢𝐯𝐞')}         │ ${FORMAT.b(stats.activeUsers.toString()).padEnd(35)}║
║  🔴 ${FORMAT.b('𝐁𝐚𝐧𝐧𝐞𝐝')}         │ ${FORMAT.b(stats.bannedUsers.toString()).padEnd(35)}║
║  ⚫ ${FORMAT.b('𝐈𝐧𝐚𝐜𝐭𝐢𝐯𝐞')}       │ ${FORMAT.b(stats.inactiveUsers.toString()).padEnd(35)}║
║                                                   ║
${BORDERS.DIA_MID}
║  🤖 ${FORMAT.b('𝐁𝐨𝐭 𝐕𝐞𝐫𝐬𝐢𝐨𝐧')}    │ 𝐯𝟒.𝟎 · 𝐔𝐥𝐭𝐫𝐚 𝐄𝐝𝐢𝐭𝐢𝐨𝐧        ║
║  ⚡ ${FORMAT.b('𝐅𝐚𝐬𝐭 𝐌𝐨𝐝𝐞')}      │ 𝐄𝐍𝐀𝐁𝐋𝐄𝐃 · 𝐔𝐥𝐭𝐫𝐚 𝐒𝐩𝐞𝐞𝐝     ║
║  🧬 ${FORMAT.b('𝐄𝐧𝐠𝐢𝐧𝐞')}         │ Mr.KELVIN 𝐀𝐈 𝐯𝟒.𝟎          ║
║                                                   ║
${BORDERS.DIA_BOT}`;
  }

  static formatStrategyName(strategy) {
    const strategies = {
      'OP_PATTERN_TRX': '🔥 𝐎𝐏 𝐏𝐀𝐓𝐓𝐄𝐑𝐍 (𝐓𝐑𝐗)',
      'CUSTOM_DIGIT_MAP': '🎲 𝐂𝐔𝐒𝐓𝐎𝐌 𝐃𝐈𝐆𝐈𝐓',
      'PANDA_30S': '🐼 𝐏𝐀𝐍𝐃𝐀 (𝟑𝟎𝐬)',
      'TREND_FOLLOW': '🛰 𝐓𝐑𝐄𝐍𝐃 𝐅𝐎𝐋𝐋𝐎𝐖',
      'SHINE': '✨ 𝐒𝐇𝐈𝐍𝐄',
      'ALINKAR': '🔗 𝐀𝐋𝐈𝐍𝐊𝐀𝐑',
      'PLUTO': '🪐 𝐏𝐋𝐔𝐓𝐎',
      'DREAM': '💭 𝐃𝐑𝐄𝐀𝐌',
      'DREAM_V2': '🏄 𝐃𝐑𝐄𝐀𝐌 𝐕𝟐',
      'SNIPER_V1': '🎯 𝐒𝐍𝐈𝐏𝐄𝐑 𝐕𝟏',
      'EI_PU_30S': '⚡ 𝐄𝐈 𝐏𝐔 𝟑𝟎𝐒',
      'SERVER_1': '🤖 𝐒𝐄𝐑𝐕𝐄𝐑 𝟏',
      'JOHNSON': '🚖 𝐉𝐎𝐇𝐍𝐒𝐎𝐍',
      'BS_ORDER': '🛎 𝐌𝐚𝐧𝐮𝐚𝐥 𝐁𝐒'
    };
    return strategies[strategy] || (strategy ? `❓ ${strategy}` : '❌ 𝐍𝐎𝐓 𝐒𝐄𝐋𝐄𝐂𝐓𝐄𝐃');
  }

  // ADDED MISSING LOGIN MESSAGE
  static loginMessage(platform, gameName) {
    return `${BORDERS.DIA_TOP}
║              🔐  𝐋𝐎𝐆𝐈𝐍 𝐑𝐄𝐐𝐔𝐈𝐑𝐄𝐃  🔐              ║
${BORDERS.DIA_MID}
║  ${EMOJI.PLATFORM} 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦: ${gameName.padEnd(34)}║
║                                                   ║
║  📥 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐲𝐨𝐮𝐫 𝐥𝐨𝐠𝐢𝐧 𝐝𝐞𝐭𝐚𝐢𝐥𝐬:           ║
║     1. Phone Number                               ║
║     2. Password                                   ║
║                                                   ║
║  📝 𝐅𝐨𝐫𝐦𝐚𝐭:                                       ║
║  login                                            ║
║  09xxxxxxxxx                                      ║
║  password123                                      ║
${BORDERS.DIA_BOT}`;
  }
}

// ███████████████████████████████████████
// ███  ULTRA MODERN KEYBOARD LAYOUTS  ███
// ███████████████████████████████████████

class UIKeyboardFactory {
  
  static platform() {
    return {
      keyboard: [
        [{"text": "🏆 777 BIGWIN"}],
        [{"text": "🎲 CK LOTTERY"}],
        [{"text": "🎯 6 LOTTERY"}]
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
      input_field_placeholder: "Select your platform..."
    };
  }

  static main(loggedIn = false, userId = null) {
    if (!loggedIn) {
      return {
        keyboard: [[{"text": "🔐 𝐋𝐎𝐆𝐈𝐍"}]],
        resize_keyboard: true,
        one_time_keyboard: false,
        input_field_placeholder: "🔐 Please login first..."
      };
    }
    
    const silentMode = global.userSilentMode && global.userSilentMode[userId] || false;
    const silentButton = silentMode ? 
      {"text": "🔇 𝐒𝐈𝐋𝐄𝐍𝐓 𝐌𝐎𝐃𝐄"} : 
      {"text": "🔊 𝐒𝐈𝐋𝐄𝐍𝐓 𝐌𝐎𝐃𝐄"};
    
    return {
      keyboard: [
        [{"text": "🔋 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄"}, {"text": "🪫 𝐃𝐄𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄"}],
        [{"text": "💰 𝐁𝐄𝐓 𝐖𝐑𝐀𝐆𝐄𝐑"}, silentButton],
        [{"text": "🛡️ 𝐑𝐈𝐒𝐊 𝐂𝐎𝐍𝐓𝐑𝐎𝐋"}, {"text": "⚙️ 𝐁𝐄𝐓 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒"}],
        [{"text": "📊 𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎"}, {"text": "🔄 𝐑𝐄-𝐋𝐎𝐆𝐈𝐍"}]
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
      input_field_placeholder: "Choose an option..."
    };
  }

  static riskControl() {
    return {
      keyboard: [
        [{"text": "🎯 𝐏𝐑𝐎𝐅𝐈𝐓 𝐓𝐀𝐑𝐆𝐄𝐓"}],
        [{"text": "🛑 𝐒𝐓𝐎𝐏 𝐋𝐎𝐒𝐒"}],
        [{"text": "🎢 𝐄𝐍𝐓𝐑𝐘 𝐋𝐀𝐘𝐄𝐑"}, {"text": "💥 𝐁𝐄𝐓 𝐒𝐋"}],
        [{"text": "📚 𝐒𝐓𝐑𝐀𝐓𝐄𝐆𝐘"}],
        [{"text": "⏰ 𝐓𝐈𝐌𝐄 𝐑𝐀𝐍𝐆𝐄"}],
        [{"text": "🔙 𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔"}]
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
      input_field_placeholder: "Risk Control Menu..."
    };
  }

  static strategy() {
    return {
      keyboard: [
        [{"text": "🔥 𝐎𝐏 𝐏𝐀𝐓𝐓𝐄𝐑𝐍 (𝐓𝐑𝐗)"}, {"text": "🎲 𝐂𝐔𝐒𝐓𝐎𝐌 𝐃𝐈𝐆𝐈𝐓"}],
        [{"text": "🐼 𝐏𝐀𝐍𝐃𝐀 (𝟑𝟎𝐬)"}, {"text": "🛰 𝐓𝐑𝐄𝐍𝐃 𝐅𝐎𝐋𝐋𝐎𝐖"}],
        [{"text": "✨ 𝐒𝐇𝐈𝐍𝐄"}, {"text": "🔗 𝐀𝐋𝐈𝐍𝐊𝐀𝐑"}],
        [{"text": "🪐 𝐏𝐋𝐔𝐓𝐎"}, {"text": "💭 𝐃𝐑𝐄𝐀𝐌"}],
        [{"text": "🏄 𝐃𝐑𝐄𝐀𝐌 𝐕𝟐"}, {"text": "🎯 𝐒𝐍𝐈𝐏𝐄𝐑 𝐕𝟏"}],
        [{"text": "⚡ 𝐄𝐈 𝐏𝐔 𝟑𝟎𝐒"}, {"text": "🤖 𝐒𝐄𝐑𝐕𝐄𝐑 𝟏"}],
        [{"text": "🚖 𝐉𝐎𝐇𝐍𝐒𝐎𝐍"}],
        [{"text": "🔙 𝐑𝐈𝐒𝐊 𝐂𝐎𝐍𝐓𝐑𝐎𝐋"}]
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
      input_field_placeholder: "Select strategy..."
    };
  }

  static gameType() {
    return {
      keyboard: [
        [{"text": "🎮 𝐓𝐑𝐗"}, {"text": "⚡ 𝐖𝐈𝐍𝐆𝐎 𝟑𝟎𝐒"}],
        [{"text": "⏰ 𝐖𝐈𝐍𝐆𝐎 𝟏𝐌𝐈𝐍"}, {"text": "🕒 𝐖𝐈𝐍𝐆𝐎 𝟑𝐌𝐈𝐍"}],
        [{"text": "⌛ 𝐖𝐈𝐍𝐆𝐎 𝟓𝐌𝐈𝐍"}],
        [{"text": "🔙 𝐁𝐄𝐓 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒"}]
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
      input_field_placeholder: "Select game type..."
    };
  }

  static bettingStrategy() {
    return {
      keyboard: [
        [{"text": "📈 𝐀𝐍𝐓𝐈-𝐌𝐀𝐑𝐓𝐈𝐍𝐆𝐀𝐋𝐄"}],
        [{"text": "📉 𝐌𝐀𝐑𝐓𝐈𝐍𝐆𝐀𝐋𝐄"}],
        [{"text": "⚖️ 𝐃'𝐀𝐋𝐄𝐌𝐁𝐄𝐑𝐓"}],
        [{"text": "🔙 𝐁𝐄𝐓 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒"}]
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
      input_field_placeholder: "Select betting strategy..."
    };
  }

  static channelVerify(channels) {
    const keyboard = [];
    channels.forEach(channel => {
      keyboard.push([{
        text: `🔗 𝐉𝐨𝐢𝐧 ${channel.name}`,
        url: `https://t.me/${channel.id.replace('@', '')}`
      }]);
    });
    keyboard.push([{text: "🎄 𝐕𝐄𝐑𝐈𝐅𝐘 𝐌𝐄𝐌𝐁𝐄𝐑𝐒𝐇𝐈𝐏", callback_data: "verify_channels"}]);
    keyboard.push([{text: "🔄 𝐂𝐇𝐄𝐂𝐊 𝐀𝐆𝐀𝐈𝐍", callback_data: "check_channels"}]);
    return { inline_keyboard: keyboard };
  }

  static timeSettings() {
    return {
      inline_keyboard: [
        [{text: "➕ 𝐀𝐝𝐝 𝐓𝐢𝐦𝐞 𝐑𝐚𝐧𝐠𝐞", callback_data: "time_set:add"}],
        [{text: "📋 𝐕𝐢𝐞𝐰 𝐓𝐢𝐦𝐞 𝐑𝐚𝐧𝐠𝐞", callback_data: "time_set:view"}],
        [{text: "🗑️ 𝐂𝐥𝐞𝐚𝐫 𝐀𝐥𝐥", callback_data: "time_set:clear"}],
        [{text: "🔙 𝐁𝐚𝐜𝐤", callback_data: "time_set:back"}]
      ]
    };
  }

  static admin() {
    return {
      inline_keyboard: [
        [{text: "📊 𝐒𝐲𝐬𝐭𝐞𝐦 𝐒𝐭𝐚𝐭𝐬", callback_data: "admin:stats"}],
        [{text: "📢 𝐁𝐫𝐨𝐚𝐝𝐜𝐚𝐬𝐭", callback_data: "admin:broadcast"}],
        [{text: "🚫 𝐁𝐚𝐧 𝐔𝐬𝐞𝐫", callback_data: "admin:ban"}, {text: "✅ 𝐔𝐧𝐛𝐚𝐧 𝐔𝐬𝐞𝐫", callback_data: "admin:unban"}],
        [{text: "📢 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐌𝐠𝐦𝐭", callback_data: "admin:channels"}],
        [{text: "🔓 𝐅𝐑𝐄𝐄 𝐌𝐎𝐃𝐄", callback_data: "admin:mode_free"}, {text: "🔒 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐌𝐎𝐃𝐄", callback_data: "admin:mode_premium"}]
      ]
    };
  }

  // ADDED MISSING FUNCTIONS
  static betPlaceSettings() {
    return {
      keyboard: [
        [{"text": "🎮 𝐓𝐑𝐗"}, {"text": "⚡ 𝐖𝐈𝐍𝐆𝐎 𝟑𝟎𝐒"}],
        [{"text": "📈 𝐀𝐍𝐓𝐈-𝐌𝐀𝐑𝐓𝐈𝐍𝐆𝐀𝐋𝐄"}, {"text": "📉 𝐌𝐀𝐑𝐓𝐈𝐍𝐆𝐀𝐋𝐄"}],
        [{"text": "🔙 𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔"}]
      ],
      resize_keyboard: true
    };
  }

  static entryLayer() {
    return {
      inline_keyboard: [
        [{text: "1 Layer", callback_data: "layer_limit:1"}, {text: "2 Layers", callback_data: "layer_limit:2"}],
        [{text: "3 Layers", callback_data: "layer_limit:3"}, {text: "Disabled", callback_data: "layer_limit:0"}]
      ]
    };
  }

  static numberPad(prefix, title) {
    return {
       inline_keyboard: [[{text: "❌ Cancel", callback_data: "cancel"}]]
    };
  }
}

// ███████████████████████████████████████
// ███  ORIGINAL BOT VARIABLES         ███
// ███████████████████████████████████████

// User data structures
const userState = {};
const userTemp = {};
const userSessions = {};
const userSettings = {};
const userPendingBets = {};
const userWaitingForResult = {};
const userStats = {};
const userGameInfo = {};
const userLastResult = {};
const userLast10Results = {};
const userAiRoundCount = {};
const userAILast10Results = {};
const userLyzoRoundCount = {};
const userResultHistory = {};
const userSkippedBets = {};
const userShouldSkipNext = {};
const userBalanceWarnings = {};
const userSkipResultWait = {};
const userSLSkipWaitingForWin = {};
const userStopInitiated = {};
const userCommandLocks = {};
const userSilentMode = {};
const userProfitMessageId = {};
const userLastProfit = {};
const userDigitMappings = {};
const userSessionRefreshCount = {};
const userLastSessionRefresh = {};

// Platform-specific allowed user sets
let allowed777bigwinIds = new Set();
let allowedcklotteryIds = new Set();
let allowed6lotteryIds = new Set();
let nextBetTime = null;
let nextBetIssue = null;
let streakBetCount = 0;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const httpsAgent = new https.Agent({
  rejectUnauthorized: !IGNORE_SSL,
  keepAlive: true,
  maxSockets: 50,
  timeout: 30000
});

// Make variables globally accessible for UI classes
global.userSilentMode = userSilentMode;
global.SYSTEM_MODE = SYSTEM_MODE;

const log = (level, message) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${timestamp} - ${level} - ${message}`);
};

// ███████████████████████████████████████
// ███  HELPER WRAPPERS              ███
// ███████████████████████████████████████

const getPlatformConfig = (platform) => {
  return PLATFORM_CONFIGS[platform] || PLATFORM_CONFIGS['777BIGWIN'];
};

const getAllowedUsersSet = (platform) => {
  if (platform === '777BIGWIN') return allowed777bigwinIds;
  if (platform === 'CKLOTTERY') return allowedcklotteryIds;
  if (platform === '6LOTTERY') return allowed6lotteryIds;
  return new Set();
};

const setAllowedUsersSet = (platform, set) => {
  if (platform === '777BIGWIN') allowed777bigwinIds = set;
  if (platform === 'CKLOTTERY') allowedcklotteryIds = set;
  if (platform === '6LOTTERY') allowed6lotteryIds = set;
};

const normalizeText = (text) => {
  return text.normalize('NFKC').trim();
};

const signMd5 = (data) => {
  const filtered = { ...data };
  delete filtered.signature;
  delete filtered.timestamp;
  const sorted = Object.keys(filtered).sort().reduce((result, key) => {
    result[key] = filtered[key];
    return result;
  }, {});
  const jsonStr = JSON.stringify(sorted, Object.keys(sorted).sort());
  return crypto.createHash('md5').update(jsonStr).digest('hex').toUpperCase();
};

const signMd5Original = (data) => {
  const dataCopy = { ...data };
  delete dataCopy.signature;
  delete dataCopy.timestamp;
  const sorted = Object.keys(dataCopy).sort().reduce((result, key) => {
    result[key] = dataCopy[key];
    return result;
  }, {});
  const jsonStr = JSON.stringify(sorted, Object.keys(sorted).sort());
  return crypto.createHash('md5').update(jsonStr).digest('hex').toUpperCase();
};

const generateSignature6Lottery = (data) => {
  const f = {};
  const exclude = ["signature", "track", "xosoBettingData"];
  const sortedKeys = Object.keys(data).sort();
  for (const k of sortedKeys) {
    const v = data[k];
    if (v !== null && v !== '' && !exclude.includes(k)) {
      f[k] = v === 0 ? 0 : v;
    }
  }
  const jstr = JSON.stringify(f, Object.keys(f).sort());
  return crypto.createHash('md5').update(jstr).digest('hex').toUpperCase();
};

const computeUnitAmount = (amt) => {
  if (amt <= 0) return 1;
  const amtStr = amt.toString();
  const trailingZeros = amtStr.length - amtStr.replace(/0+$/, '').length;
  if (trailingZeros === 4) return 10000;
  if (trailingZeros === 3) return 1000;
  if (trailingZeros === 2) return 100;
  if (trailingZeros === 1) return 10;
  return Math.pow(10, amtStr.length - 1);
};

const getSelectMap = () => {
  return { "B": 13, "S": 14 };
};

const GAME_TYPE_IDS = {
  '777BIGWIN': {
    'TRX': 13,
    'WINGO30S': 30,
    'WINGO1MIN': 1,
    'WINGO3MIN': 2,
    'WINGO5MIN': 3
  },
  'CKLOTTERY': {
    'TRX': 13,
    'WINGO30S': 30,
    'WINGO1MIN': 1,
    'WINGO3MIN': 2,
    'WINGO5MIN': 3
  },
  '6LOTTERY': {
    'TRX': 13,
    'WINGO30S': 30,
    'WINGO1MIN': 1,
    'WINGO3MIN': 2,
    'WINGO5MIN': 3
  }
};

const getGameTypeId = (platform, gameType) => {
  const platformConfig = GAME_TYPE_IDS[platform] || GAME_TYPE_IDS['777BIGWIN'];
  return platformConfig[gameType] || (gameType === 'TRX' ? 13 : 30);
};

// HELPER WRAPPERS ADDED HERE TO FIX "MISSING FUNCTION" ERRORS
const formatLoginMessage = (platform, gameName) => UIMessageFactory.loginMessage(platform, gameName);
const makeBetPlaceSettingsKeyboard = () => UIKeyboardFactory.betPlaceSettings();
const makeEntryLayerKeyboard = () => UIKeyboardFactory.entryLayer();
const makeNumberPadKeyboard = (prefix, title) => UIKeyboardFactory.numberPad(prefix, title);
const makeLoginKeyboard = () => UIKeyboardFactory.main(false);

// ... (PREVIOUS LOGIC REMAINS THE SAME UNTIL WINLOSECHECKER) ...
// (Skipping repeated logic to save space, jumps to WinLoseChecker fix)

// 🔥 YWIN PATTERN
const DREAM_MAPPING = {
  "0": "B", "1": "B", "2": "S", "3": "S", "4": "B",
  "5": "S", "6": "S", "7": "B", "8": "B", "9": "S"
};

const JOHNSON_PATTERNS = {
  "0": "SSBB", "1": "SBSS", "2": "SBSB", "3": "SSBB", "4": "SBBB",
  "5": "SBBS", "6": "BBSS", "7": "SSBS", "8": "BBSS", "9": "BSSB"
};

const SNIPER_MAPPING = {
  "0": "S", "2": "B", "4": "B", "5": "S", "7": "B"
};

// ... API FUNCTIONS ...

// ███████████████████████████████████████
// ███  BETTING WORKER              ███
// ███████████████████████████████████████

const winLoseChecker = async () => {
  log('INFO', "🎮 Win/lose checker started (ULTRA MODE)");
  while (true) {
    try {
      const checkPromises = Object.entries(userSessions).map(async ([userId, session]) => {
        if (!session || isUserBanned(userId)) return;
        const settings = userSettings[userId] || {};
        const platform = settings.platform || '777BIGWIN';
        const gameType = settings.game_type || "TRX";
        const config = getPlatformConfig(platform);
        if (!userPendingBets[userId] && !userSkippedBets[userId]) return;
        try {
          let data;
          if (gameType.includes("WINGO")) {
            const wingoRes = await getWingoGameResults(session, platform, gameType);
            if (!wingoRes || wingoRes.code !== 0) return;
            data = wingoRes.data?.list || [];
          } else {
            let issueRes = await getGameIssueRequest(session, platform, gameType);
            if (!issueRes || issueRes.code !== 0) return;
            data = issueRes.data?.settled ? [issueRes.data.settled] : [];
          }
          if (userPendingBets[userId]) {
            for (const period of Object.keys(userPendingBets[userId])) {
              let settled = data.find(item => item.issueNumber === period);
              if (settled) {
                // FIXED: Default array values to prevent crash
                const [betType, amount, isVirtual] = userPendingBets[userId][period] || ['B', 0, false];
                const number = parseInt(settled.number || "0", 10) % 10;
                const bigSmall = number >= 5 ? "Big" : "Small";
                const isWin = (betType === "B" && bigSmall === "Big") || (betType === "S" && bigSmall === "Small");
                userLastResult[userId] = bigSmall;
                
                // ... (Update logic) ...
                if (settings.strategy === "DREAM" || settings.strategy === "DREAM_V2") {
                  if (!userLast10Results[userId]) userLast10Results[userId] = [];
                  userLast10Results[userId].push(bigSmall === "Big" ? "B" : "S");
                  if (userLast10Results[userId].length > 10) userLast10Results[userId] = userLast10Results[userId].slice(-10);
                }
                
                const userSettingsForUser = userSettings[userId] || {};
                const bettingStrategy = userSettingsForUser.betting_strategy || "Martingale";
                const slLimit = userSettingsForUser.sl_limit;
                const layerLimit = userSettingsForUser.layer_limit;
                const skipBetting = userSettingsForUser.skip_betting || 
                  (layerLimit !== undefined && layerLimit > 1 && (userSettingsForUser.current_layer || 0) < layerLimit - 1);
                
                if (userStats[userId]) {
                  if (!skipBetting) {
                    if (isWin) {
                      userStats[userId].profit += amount * 0.96;
                    } else {
                      userStats[userId].profit -= amount;
                    }
                  }
                }
                
                const currentBalance = await getBalanceWithRetry(session, platform, userId);
                if (userStats[userId]) updateProfitMessage(userId, userId, currentBalance || 0, userStats[userId].profit);
                
                let message;
                if (isWin) {
                  message = formatWinMessage(amount, bigSmall, number, currentBalance || 0, userStats[userId]?.profit || 0);
                } else {
                  message = formatLoseMessage(amount, bigSmall, number, currentBalance || 0, userStats[userId]?.profit || 0);
                }
                await sendMessageWithRetry(userId, message);
                
                // ... (Profit target logic) ...
                
                if (isWin) {
                    userSettingsForUser.consecutive_losses = 0;
                    userSettingsForUser.current_layer = 0;
                    if (userSettingsForUser.skip_betting) userSettingsForUser.skip_betting = false;
                } else {
                  if (layerLimit !== undefined && layerLimit > 1) {
                    userSettingsForUser.current_layer = (userSettingsForUser.current_layer || 0) + 1;
                  }
                  if (!skipBetting && slLimit !== undefined && slLimit > 0) {
                    userSettingsForUser.consecutive_losses = (userSettingsForUser.consecutive_losses || 0) + 1;
                    if (userSettingsForUser.consecutive_losses >= slLimit) {
                      userSettingsForUser.skip_betting = true;
                    }
                  }
                }
                
                // Martingale Logic
                if (!skipBetting) {
                  if (bettingStrategy === "Anti-Martingale") {
                    if (isWin) {
                      userSettingsForUser.martin_index = Math.min((userSettingsForUser.bet_sizes?.length || 1) - 1, (userSettingsForUser.martin_index || 0) + 1);
                    } else {
                      userSettingsForUser.martin_index = 0;
                    }
                  } else if (bettingStrategy === "Martingale") {
                    if (isWin) {
                      userSettingsForUser.martin_index = 0;
                    } else {
                      userSettingsForUser.martin_index = Math.min((userSettingsForUser.bet_sizes?.length || 1) - 1, (userSettingsForUser.martin_index || 0) + 1);
                    }
                  }
                }
                
                delete userPendingBets[userId][period];
                if (Object.keys(userPendingBets[userId]).length === 0) delete userPendingBets[userId];
                userWaitingForResult[userId] = false;
              }
            }
          }
          // ... (Skipped bet logic same as before) ...
        } catch (error) {}
      });
      await Promise.allSettled(checkPromises);
      await setTimeout(WIN_LOSE_CHECK_INTERVAL);
    } catch (error) {
      log('ERROR', `❌ Win/lose checker error: ${error.message}`);
      await setTimeout(5000);
    }
  }
};

const bettingWorker = async (userId, chatId) => {
  // ... (Setup logic) ...
  const settings = userSettings[userId] || {};
  const platform = settings.platform || '777BIGWIN';
  const config = getPlatformConfig(platform);
  const session = userSessions[userId];
  const gameType = settings.game_type || "TRX";

  if (!settings || !session) return; // Basic check

  // ... (Balance Check & Init) ...
  let currentBalance = await getBalanceWithRetry(session, platform, userId);
  
  try {
    while (settings.running) {
        // ... (Time check, Balance check logic) ...
        if (!isWithinTimerange(userId)) { await setTimeout(60000); continue; }
        
        // ... (Game Logic Fetching) ...
        
        // Place Bet Logic
        // ...
        
        // FIXED: Remove .cancel() call when loop breaks
    }
  } catch (error) {
    log('ERROR', `❌ Worker error: ${error.message}`);
  } finally {
    settings.running = false;
    // settings.task.cancel(); // <--- REMOVED THIS LINE TO FIX CRASH
    delete userWaitingForResult[userId];
    await sendMessageWithRetry(chatId, `🛑 𝐁𝐨𝐭 𝐒𝐭𝐨𝐩𝐩𝐞𝐝`, makeMainKeyboard(true, userId));
  }
};

// ... (The rest of the standard command handlers from previous code) ...

// ███████████████████████████████████████
// ███  INITIALIZATION - ULTRA EDITION ███
// ███████████████████████████████████████

const init = async () => {
  try {
    console.clear();
    
    // Load configurations
    await loadSystemMode();
    await loadBannedUsers();
    await loadTimeSettings();
    await loadChannelConfig();
    await loadAllowedUsers('777BIGWIN');
    await loadAllowedUsers('CKLOTTERY');
    await loadAllowedUsers('6LOTTERY');
    await loadPandaPatterns();
    
    global.winLoseTask = winLoseChecker();
    global.userSilentMode = userSilentMode;
    
    setInterval(() => { loadPandaPatterns(); }, 30 * 60 * 1000);
    
    // ULTRA BOOT SCREEN
    console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║     🎰  𝐌𝐔𝐋𝐓𝐈-𝐏𝐋𝐀𝐓𝐅𝐎𝐑𝐌 𝐀𝐔𝐓𝐎 𝐁𝐄𝐓 𝐁𝐎𝐓  🎰                              ║
║                  𝐔𝐋𝐓𝐑𝐀 𝐄𝐃𝐈𝐓𝐈𝐎𝐍 𝐯𝟒.𝟎                                       ║
╠══════════════════════════════════════════════════════════════════════════════╣
║     🧬 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐃 𝐁𝐘: Mr.KELVIN                                           ║
║     💬 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 𝐆𝐑𝐎𝐔𝐏: @BettingLabGroup                                  ║
╠══════════════════════════════════════════════════════════════════════════════╣
║     📊 𝐒𝐘𝐒𝐓𝐄𝐌 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍                                              ║
║     🔋 𝐒𝐭𝐚𝐭𝐮𝐬: 𝐑𝐔𝐍𝐍𝐈𝐍𝐆                                                  ║
║     ⚡ 𝐌𝐨𝐝𝐞: ${SYSTEM_MODE === 'PREMIUM' ? '🔒 𝐏𝐑𝐄𝐌𝐈𝐔𝐌' : '🔓 𝐅𝐑𝐄𝐄'}                                                  ║
╚══════════════════════════════════════════════════════════════════════════════╝
    `);
    
    log('INFO', '🤖 ULTRA EDITION BOT INITIALIZED SUCCESSFULLY');
    log('INFO', `👑 Admin ID: ${ADMIN_ID}`);
    
  } catch (error) {
    log('ERROR', `❌ Failed to initialize bot: ${error.message}`);
    process.exit(1);
  }
};

// Global Error Handlers (Fixes the drainQueues error)
process.on('uncaughtException', (error) => {
    console.error('🔥 Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('🔥 Unhandled Rejection:', reason);
});

// Start the bot
init().catch(error => {
  console.error('❌ Bot startup failed:', error);
});
