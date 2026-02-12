// ============================================
// 🎰 MULTI-PLATFORM AUTO BET BOT v4.0
// 🎨 ULTIMATE UI ULTRA EDITION - FULLY UPGRADED
// 🧬 DEVELOPED BY DEV MICK
// ============================================
// Telegram: @GOD_OuWan | Group: 
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

// Channel Configuration
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

/**
 * 🎨 ========== PREMIUM BORDER COLLECTION ==========
 */
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

/**
 * 🎨 ========== PREMIUM EMOJI COLLECTION ==========
 */
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

/**
 * 🎨 ========== PREMIUM TEXT FORMATTERS ==========
 */
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
║     🧬🧬  𝐃𝐄𝐕·𝐌𝐈𝐂𝐊 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐀𝐈  🧬🧬      ║
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
║  👑 ${FORMAT.b('𝐀𝐝𝐦𝐢𝐧')}: @zinko158                            ║
║  💬 ${FORMAT.b('𝐆𝐫𝐨𝐮𝐩')}: https://t.me/+KT3SAWDdC-MxNjJl                 ║
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
║  🛡️ 𝐏𝐫𝐨𝐭𝐞𝐜𝐭𝐞𝐝 𝐁𝐲 𝐃𝐄𝐕·𝐌𝐈𝐂𝐊 𝐒𝐞𝐜𝐮𝐫𝐢𝐭𝐲 𝐒𝐲𝐬𝐭𝐞𝐦  🛡️   ║
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
║  🧬 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐃𝐄𝐕·𝐌𝐈𝐂𝐊 𝐀𝐈 𝐄𝐧𝐠𝐢𝐧𝐞 𝐯𝟒.𝟎            ║
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
║  🧬 ${FORMAT.b('𝐄𝐧𝐠𝐢𝐧𝐞')}         │ 𝐃𝐄𝐕·𝐌𝐈𝐂𝐊 𝐀𝐈 𝐯𝟒.𝟎          ║
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
// ███  HELPER FUNCTIONS              ███
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

// 🔥 YWIN PATTERN
const DREAM_MAPPING = {
  "0": "B", "1": "B", "2": "S", "3": "S", "4": "B",
  "5": "S", "6": "S", "7": "B", "8": "B", "9": "S"
};

// 🔥 OP PATTERN
const OP_PATTERN_TRX = "BSBSBBSSBBBSSSBSBS";

// 🔥 DEFAULT DIGIT MAPPING
const DEFAULT_DIGIT_MAPPING = {
  '0': 'B', '1': 'B', '2': 'S', '3': 'S', '4': 'B',
  '5': 'S', '6': 'S', '7': 'B', '8': 'B', '9': 'S',
  'DEFAULT': 'B'
};

const JOHNSON_PATTERNS = {
  "0": "SSBB", "1": "SBSS", "2": "SBSB", "3": "SSBB", "4": "SBBB",
  "5": "SBBS", "6": "BBSS", "7": "SSBS", "8": "BBSS", "9": "BSSB"
};

const SNIPER_MAPPING = {
  "0": "S", "2": "B", "4": "B", "5": "S", "7": "B"
};

// ███████████████████████████████████████
// ███  API FUNCTIONS                 ███
// ███████████████████████████████████████

const loginRequest = async (platform, phone, password) => {
  const config = getPlatformConfig(platform);
  let session;
  if (platform === '6LOTTERY') {
    session = axios.create({
      httpsAgent,
      timeout: 20000,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Ar-Origin": "https://6win598.com",
        "Origin": "https://6win598.com",
        "Referer": "https://6win598.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:142.0) Gecko/20100101 Firefox/142.0",
        "Accept-Language": "en-US,en;q=0.5",
      }
    });
  } else {
    session = axios.create({
      httpsAgent,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 10; Mobile Build/QP1A.190711.020)",
        "Connection": "Keep-Alive",
        "Accept-Encoding": "gzip"
      }
    });
  }
  
  const body = {
    phonetype: platform === '6LOTTERY' ? 1 : -1,
    language: platform === '6LOTTERY' ? 7 : 0,
    logintype: "mobile",
    random: "9078efc98754430e92e51da59eb2563c",
    username: config.LOGIN_PREFIX + phone,
    pwd: password
  };
  
  if (platform === '6LOTTERY') {
    body.deviceId = "5dcab3e06db88a206975e91ea6ac7c87";
    body.packId = "";
    body.signature = generateSignature6Lottery(body).toUpperCase();
  } else {
    body.signature = signMd5Original(body).toUpperCase();
  }
  
  body.timestamp = Math.floor(Date.now() / 1000);
  
  try {
    const response = await session.post(config.BASE_URL + "Login", body, { timeout: 20000 });
    const res = response.data;
    if (res.code === 0 && res.data) {
      const tokenHeader = res.data.tokenHeader || "Bearer ";
      const token = res.data.token || "";
      if (platform === '6LOTTERY') {
        session.defaults.headers.common.Authorization = `${tokenHeader}${token}`;
        session.defaults.headers.common["Ar-Origin"] = "https://6win598.com";
        session.defaults.headers.common["Origin"] = "https://6win598.com";
        session.defaults.headers.common["Referer"] = "https://6win598.com/";
      } else {
        session.defaults.headers.common.Authorization = `${tokenHeader}${token}`;
      }
      log('INFO', `🎄${config.GAME_NAME} Login successful for user ${phone}`);
      return [res, session];
    }
    log('ERROR', `❌ ${config.GAME_NAME} Login failed: ${res.msg || 'Unknown error'}`);
    return [res, null];
  } catch (error) {
    log('ERROR', `❌ ${config.GAME_NAME} Login error: ${error.message}`);
    return [{ error: error.message, code: -1 }, null];
  }
};

const getUserInfo = async (session, platform, userId) => {
  const config = getPlatformConfig(platform);
  const body = {
    language: platform === '6LOTTERY' ? 7 : 0,
    random: "9078efc98754430e92e51da59eb2563c"
  };
  if (platform === '6LOTTERY') {
    body.signature = generateSignature6Lottery(body).toUpperCase();
  } else {
    body.signature = signMd5Original(body).toUpperCase();
  }
  body.timestamp = Math.floor(Date.now() / 1000);
  try {
    const response = await session.post(config.BASE_URL + "GetUserInfo", body, { timeout: 15000 });
    const res = response.data;
    if (res.code === 0 && res.data) {
      const info = {
        user_id: res.data.userId,
        username: res.data.userName,
        nickname: res.data.nickName,
        balance: res.data.amount,
        photo: res.data.userPhoto,
        login_date: res.data.userLoginDate,
        withdraw_count: res.data.withdrawCount,
        is_allow_withdraw: res.data.isAllowWithdraw === 1
      };
      userGameInfo[userId] = info;
      return info;
    }
  } catch (error) {
    log('ERROR', `❌ Get user info error for ${config.GAME_NAME}: ${error.message}`);
  }
  return null;
};

const getGameIssueRequest = async (session, platform, gameType = "TRX") => {
  const config = getPlatformConfig(platform);
  const typeId = getGameTypeId(platform, gameType);
  let language, random, endpoint;
  if (gameType === "TRX") {
    language = 0;
    random = "b05034ba4a2642009350ee863f29e2e9";
    endpoint = "GetTrxGameIssue";
  } else {
    language = 7;
    if (platform === '6LOTTERY') {
      random = "6958cae52e234eb1967082c9b5a9c4ce";
    } else {
      random = "7d76f361dc5d4d8c98098ae3d48ef7af";
    }
    endpoint = "GetGameIssue";
  }
  const body = {
    typeID: typeId,
    language: language,
    random: random
  };
  if (platform === '6LOTTERY') {
    body.signature = generateSignature6Lottery(body).toUpperCase();
  } else {
    body.signature = signMd5(body).toUpperCase();
  }
  body.timestamp = Math.floor(Date.now() / 1000);
  try {
    const response = await session.post(config.BASE_URL + endpoint, body, { timeout: 15000 });
    return response.data;
  } catch (error) {
    log('ERROR', `${gameType} game issue error for ${config.GAME_NAME}: ${error.message}`);
    return { error: error.message, code: -1 };
  }
};

const getWingoGameResults = async (session, platform, gameType = "WINGO30S") => {
  const config = getPlatformConfig(platform);
  const typeId = getGameTypeId(platform, gameType);
  const body = {
    "pageSize": 10,
    "typeId": typeId,
    "language": 7,
    "random": "6958cae52e234eb1967082c9b5a9c4ce",
    "signature": "88A0DADB43645500E64ADFFED763027E",
    "timestamp": Math.floor(Date.now() / 1000)
  };
  try {
    const response = await session.post(config.BASE_URL + "GetNoaverageEmerdList", body, { timeout: 15000 });
    return response.data;
  } catch (error) {
    log('ERROR', `🧨 ERROR getting ${gameType} results for ${config.GAME_NAME}: ${error.message}`);
    return { error: error.message, code: -1 };
  }
};

const placeBetRequest = async (session, platform, issueNumber, selectType, unitAmount, betCount, gameType, userId) => {
  const config = getPlatformConfig(platform);
  const typeId = getGameTypeId(platform, gameType);
  let language, random, endpoint;
  if (gameType === "TRX") {
    language = 0;
    random = "9078efc98754430e92e51da59eb2563c";
    endpoint = "GameTrxBetting";
  } else {
    language = 7;
    random = platform === '6LOTTERY' ? "9078efc98754430e92e51da59eb2563c" : "f9ec46840a374a65bb2abad44dfc4dc3";
    endpoint = "GameBetting";
  }
  const betBody = {
    typeId: typeId,
    issuenumber: issueNumber,
    language: language,
    gameType: 2,
    amount: unitAmount,
    betCount: betCount,
    selectType: selectType,
    random: random
  };
  if (platform === '6LOTTERY') {
    betBody.signature = generateSignature6Lottery(betBody).toUpperCase();
  } else {
    betBody.signature = signMd5Original(betBody).toUpperCase();
  }
  betBody.timestamp = Math.floor(Date.now() / 1000);
  for (let attempt = 0; attempt < MAX_BET_RETRIES; attempt++) {
    try {
      const response = await session.post(config.BASE_URL + endpoint, betBody, { timeout: BET_API_TIMEOUT });
      return response.data;
    } catch (error) {
      log('ERROR', `❌ Bet error for user ${userId}, attempt ${attempt + 1}: ${error.message}`);
      if (attempt < MAX_BET_RETRIES - 1) {
        await setTimeout(BET_RETRY_DELAY);
        continue;
      }
      return { error: error.message, code: -1 };
    }
  }
  return { error: "Failed after retries", code: -1 };
};

const getGameHistory = async (session, platform) => {
  const config = getPlatformConfig(platform);
  const body = {
    "pageSize": 10,
    "typeId": platform === '6LOTTERY' ? 1 : 30,
    "language": 7,
    "random": "f15bdcc4e6a04f82828b2f7a7b4c6e5a"
  };
  if (platform === '6LOTTERY') {
    body.signature = generateSignature6Lottery(body).toUpperCase();
  } else {
    body.signature = signMd5Original(body).toUpperCase();
  }
  body.timestamp = Math.floor(Date.now() / 1000);
  try {
    const response = await session.post(config.BASE_URL + "GetNoaverageEmerdList", body, { timeout: 15000 });
    const data = response.data?.list || [];
    return data.filter(item => item && item.number !== undefined && item.number !== null);
  } catch (error) {
    log('ERROR', `🧨 ERROR fetching game history for ${config.GAME_NAME}: ${error.message}`);
    return [];
  }
};

// ███████████████████████████████████████
// ███  BALANCE & SESSION FUNCTIONS   ███
// ███████████████████████████████████████

const getBalance = async (session, platform, userId) => {
  const config = getPlatformConfig(platform);
  const body = {
    language: platform === '6LOTTERY' ? 7 : 0,
    random: "9078efc6f3794bf49f257d07937d1a29"
  };
  if (platform === '6LOTTERY') {
    body.signature = generateSignature6Lottery(body).toUpperCase();
  } else {
    body.signature = signMd5Original(body).toUpperCase();
  }
  body.timestamp = Math.floor(Date.now() / 1000);
  const axiosInstance = axios.create({
    httpsAgent,
    timeout: BALANCE_API_TIMEOUT,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      ...(session.defaults.headers.common.Authorization ? 
        { Authorization: session.defaults.headers.common.Authorization } : {})
    }
  });
  try {
    const response = await axiosInstance.post(config.BASE_URL + "GetBalance", body);
    const res = response.data;
    if (res.code === 0 && res.data) {
      const amount = res.data.Amount || res.data.amount || res.data.balance;
      if (amount !== undefined) {
        const balanceAmount = parseFloat(amount);
        if (userGameInfo[userId]) {
          userGameInfo[userId].balance = balanceAmount;
        }
        if (!userStats[userId]) {
          userStats[userId] = { start_balance: balanceAmount, profit: 0.0 };
        }
        return balanceAmount;
      }
    }
  } catch (error) {
    log('ERROR', `❌ Balance check error for user ${userId}: ${error.message}`);
  }
  return null;
};

const getBalanceWithRetry = async (session, platform, userId, retryCount = 0) => {
  if (retryCount >= MAX_BALANCE_RETRIES) {
    log('ERROR', `❌ Max balance retries reached for user ${userId}`);
    return null;
  }
  const balance = await getBalance(session, platform, userId);
  if (balance !== null) return balance;
  if (retryCount < MAX_BALANCE_RETRIES - 1) {
    await setTimeout(BALANCE_RETRY_DELAY);
    return await getBalanceWithRetry(session, platform, userId, retryCount + 1);
  }
  return null;
};

const refreshUserSession = async (userId) => {
  try {
    const settings = userSettings[userId];
    const platform = settings?.platform;
    const temp = userTemp[userId];
    if (!platform || !temp || !temp.password) return null;
    const username = userGameInfo[userId]?.username?.replace(PLATFORM_CONFIGS[platform].LOGIN_PREFIX, "") || "";
    if (!username) return null;
    log('INFO', `🔄 Refreshing session for user ${userId} (${platform})`);
    const [res, newSession] = await loginRequest(platform, username, temp.password);
    if (newSession) {
      userSessions[userId] = newSession;
      userSessionRefreshCount[userId] = (userSessionRefreshCount[userId] || 0) + 1;
      userLastSessionRefresh[userId] = Date.now();
      return newSession;
    }
    return null;
  } catch (error) {
    log('ERROR', `🧨 ERROR refreshing session for ${userId}: ${error.message}`);
    return null;
  }
};

// ███████████████████████████████████████
// ███  STRATEGY FUNCTIONS           ███
// ███████████████████████████████████████

const loadPandaPatterns = async () => {
  try {
    log('INFO', `🐼 Loading Panda patterns from GitHub...`);
    const response = await axios.get(PANDA_PATTERNS_URL, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    if (response.data) {
      if (typeof response.data === 'string') {
        pandaPatterns = JSON.parse(response.data);
      } else {
        pandaPatterns = response.data;
      }
      log('INFO', `✅ Successfully loaded ${Object.keys(pandaPatterns).length} Panda patterns`);
      return true;
    }
  } catch (error) {
    log('ERROR', `❌ Failed to load Panda patterns: ${error.message}`);
    try {
      const data = await fs.readFile('patterns.json', 'utf8');
      pandaPatterns = JSON.parse(data);
      log('INFO', `📂 Loaded ${Object.keys(pandaPatterns).length} patterns from local file`);
      return true;
    } catch (localError) {
      log('ERROR', `🧨 Failed to load local patterns: ${localError.message}`);
      pandaPatterns = {};
      return false;
    }
  }
};

const getOpPatternPrediction = async (userId, platform, gameType = "TRX") => {
  try {
    const OP_PATTERN = "BSBSBBSSBBBSSSBSBS";
    let patternIndex = userSettings[userId]?.op_pattern_index || 0;
    const betType = OP_PATTERN[patternIndex];
    patternIndex = (patternIndex + 1) % OP_PATTERN.length;
    userSettings[userId].op_pattern_index = patternIndex;
    return { result: betType, percent: "100.0" };
  } catch (error) {
    log('ERROR', `🧨 ERROR in OP PATTERN prediction: ${error.message}`);
    return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "50.0" };
  }
};

const getCustomDigitPrediction = async (userId, platform, gameType = "TRX") => {
  try {
    const session = userSessions[userId];
    const mapping = userDigitMappings[userId] || userSettings[userId]?.digit_mapping || {};
    if (!mapping || Object.keys(mapping).length === 0) {
      return { result: 'B', percent: "N/A", shouldSkip: true };
    }
    const issueRes = await getGameIssueRequest(session, platform, gameType);
    if (!issueRes || issueRes.code !== 0) {
      return { result: 'B', percent: "N/A", shouldSkip: true };
    }
    const data = issueRes.data || {};
    let currentIssue = gameType === "TRX" ? data.predraw?.issueNumber : data.issueNumber;
    if (!currentIssue) {
      return { result: 'B', percent: "N/A", shouldSkip: true };
    }
    const lastDigit = String(currentIssue).slice(-1);
    const betType = mapping[lastDigit];
    if (!betType) {
      return { result: 'B', percent: "N/A", shouldSkip: true };
    }
    return { result: betType, percent: "100.0", shouldSkip: false };
  } catch (error) {
    log('ERROR', `🧨 ERROR in Custom Digit prediction: ${error.message}`);
    return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "50.0", shouldSkip: true };
  }
};

const getPandaPrediction = async (userId, platform, gameType = "WINGO30S") => {
  try {
    if (Object.keys(pandaPatterns).length === 0) {
      await loadPandaPatterns();
      if (Object.keys(pandaPatterns).length === 0) {
        return { result: 'B', percent: "0", shouldSkip: true };
      }
    }
    const session = userSessions[userId];
    if (!session) return { result: 'B', percent: "0", shouldSkip: true };
    let lastResults = [];
    if (gameType.includes("WINGO")) {
      const wingoRes = await getWingoGameResults(session, platform, gameType);
      if (wingoRes?.code === 0 && wingoRes.data?.list) {
        const list = wingoRes.data.list;
        for (let i = 0; i < Math.min(10, list.length); i++) {
          const item = list[i];
          if (item && item.number !== undefined) {
            const num = parseInt(item.number.toString(), 10) % 10;
            lastResults.push(num >= 5 ? "B" : "S");
          }
        }
      }
    }
    if (lastResults.length < 10) return { result: 'B', percent: "0", shouldSkip: true };
    const currentPattern = lastResults.join('');
    if (pandaPatterns[currentPattern]) {
      const prediction = pandaPatterns[currentPattern];
      return { result: prediction, percent: "98.5", shouldSkip: false };
    }
    return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "50.0", shouldSkip: false };
  } catch (error) {
    log('ERROR', `🧨 PANDA prediction error: ${error.message}`);
    return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "0", shouldSkip: true };
  }
};

const getDreamPrediction = async (userId, platform, gameType = "TRX") => {
  try {
    const session = userSessions[userId];
    const issueRes = await getGameIssueRequest(session, platform, gameType);
    if (!issueRes || issueRes.code !== 0) {
      return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "50.0" };
    }
    const data = issueRes.data || {};
    let currentIssue = gameType === "TRX" ? data.predraw?.issueNumber : data.issueNumber;
    if (!currentIssue) {
      return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "50.0" };
    }
    const lastDigit = String(currentIssue).slice(-1);
    const prediction = DREAM_MAPPING[lastDigit] || (Math.random() < 0.5 ? 'B' : 'S');
    return { result: prediction, percent: "N/A" };
  } catch (error) {
    log('ERROR', `🧨 ERROR getting Dream prediction: ${error.message}`);
    return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "50.0" };
  }
};

const getSniperPrediction = async (userId, platform, gameType = "TRX") => {
  try {
    const session = userSessions[userId];
    const issueRes = await getGameIssueRequest(session, platform, gameType);
    if (!issueRes || issueRes.code !== 0) {
      return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "50.0", shouldSkip: false };
    }
    const data = issueRes.data || {};
    let currentIssue = gameType === "TRX" ? data.predraw?.issueNumber : data.issueNumber;
    if (!currentIssue) {
      return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "50.0", shouldSkip: false };
    }
    const lastDigit = String(currentIssue).slice(-1);
    const prediction = SNIPER_MAPPING[lastDigit];
    if (prediction) {
      return { result: prediction, percent: "N/A", shouldSkip: false };
    } else {
      return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "N/A", shouldSkip: true };
    }
  } catch (error) {
    log('ERROR', `🧨 ERROR getting Sniper prediction: ${error.message}`);
    return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "50.0", shouldSkip: false };
  }
};

const getEiPu30sPrediction = async (userId, platform, gameType = "TRX") => {
  try {
    const session = userSessions[userId];
    const issueRes = await getGameIssueRequest(session, platform, gameType);
    if (!issueRes || issueRes.code !== 0 || !issueRes.data?.settled) {
      return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "50.0" };
    }
    const lastResult = issueRes.data.settled;
    if (!lastResult || lastResult.number === undefined || lastResult.number === null) {
      return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "50.0" };
    }
    const lastNumber = parseInt(lastResult.number);
    let prediction;
    if ([1, 3, 6, 7, 9].includes(lastNumber)) {
      prediction = "B";
    } else if ([0, 2, 4, 5, 8].includes(lastNumber)) {
      prediction = "S";
    } else {
      prediction = Math.random() < 0.5 ? 'B' : 'S';
    }
    return { result: prediction, percent: "N/A" };
  } catch (error) {
    log('ERROR', `🧨 ERROR getting EI PU 30S prediction: ${error.message}`);
    return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "50.0" };
  }
};

const getServer1Prediction = async (userId, platform, gameType = "TRX") => {
  try {
    if (!userAILast10Results[userId]) userAILast10Results[userId] = [];
    if (!userAiRoundCount[userId]) userAiRoundCount[userId] = 0;
    userAiRoundCount[userId]++;
    if (userAiRoundCount[userId] <= 10) {
      const ch = Math.random() < 0.5 ? "B" : "S";
      return { result: ch, percent: "N/A" };
    } else if (userAILast10Results[userId].length < 5) {
      const ch = Math.random() < 0.5 ? "B" : "S";
      return { result: ch, percent: "N/A" };
    } else {
      const lastResults = userAILast10Results[userId].slice(-5);
      const counts = { B: 0, S: 0 };
      for (const result of lastResults) counts[result]++;
      let ch;
      if (counts.B > counts.S) ch = 'B';
      else if (counts.S > counts.B) ch = 'S';
      else ch = Math.random() < 0.5 ? "B" : "S";
      return { result: ch, percent: "N/A" };
    }
  } catch (error) {
    log('ERROR', `🧨 ERROR getting Server 1 prediction: ${error.message}`);
    return { result: Math.random() < 0.5 ? 'B' : 'S', percent: "50.0" };
  }
};

const getJHSONPrediction = async (userId, platform) => {
  try {
    if (!userSettings[userId].jhson_state) {
      userSettings[userId].jhson_state = {
        current_pattern: "",
        current_index: 0,
        last_result_number: null,
        pattern_history: []
      };
      const session = userSessions[userId];
      let lastResultNumber = 0;
      try {
        const gameHistory = await getGameHistory(session, platform);
        if (gameHistory.length > 0) {
          const lastResult = gameHistory[0];
          if (lastResult && lastResult.number !== undefined) {
            lastResultNumber = parseInt(lastResult.number) % 10;
          }
        }
      } catch (error) {}
      userSettings[userId].jhson_state.last_result_number = lastResultNumber;
      userSettings[userId].jhson_state.current_pattern = JOHNSON_PATTERNS[lastResultNumber.toString()] || JOHNSON_PATTERNS["0"];
      userSettings[userId].jhson_state.current_index = 0;
    }
    const jhsonState = userSettings[userId].jhson_state;
    const prediction = jhsonState.current_pattern[jhsonState.current_index];
    return { result: prediction, percent: 'N/A' };
  } catch (error) {
    log('ERROR', `🧨 ERROR getting JOHNSON prediction: ${error}`);
    return { result: Math.random() < 0.5 ? 'B' : 'S', percent: '50.0' };
  }
};

const updateJHSONState = (userId, isWin, resultNumber) => {
  try {
    if (!userSettings[userId].jhson_state) return;
    const jhsonState = userSettings[userId].jhson_state;
    if (isWin) {
      const newPattern = JOHNSON_PATTERNS[resultNumber.toString()] || JOHNSON_PATTERNS["0"];
      jhsonState.current_pattern = newPattern;
      jhsonState.current_index = 0;
      jhsonState.last_result_number = resultNumber;
      jhsonState.pattern_history.push({
        number: resultNumber,
        pattern: newPattern,
        timestamp: Date.now()
      });
      if (jhsonState.pattern_history.length > 10) {
        jhsonState.pattern_history = jhsonState.pattern_history.slice(-10);
      }
    } else {
      jhsonState.current_index = (jhsonState.current_index + 1) % jhsonState.current_pattern.length;
    }
  } catch (error) {
    log('ERROR', `🧨 ERROR updating JOHNSON state: ${error}`);
  }
};

// ███████████████████████████████████████
// ███  UI WRAPPER FUNCTIONS         ███
// ███████████████████████████████████████

const createProfitTargetMessage = (startedAmount, totalProfit, finalBalance) => {
  return UIMessageFactory.profitTarget(startedAmount, totalProfit, finalBalance);
};

const createStopLossMessage = (startedAmount, totalProfit, finalBalance) => {
  return UIMessageFactory.stopLoss(startedAmount, totalProfit, finalBalance);
};

const formatWelcomeMessage = () => {
  return UIMessageFactory.welcome();
};

const formatLoginSuccess = (config, userInfo, balance) => {
  return UIMessageFactory.loginSuccess(config, userInfo, balance);
};

const formatBetMessage = (config, gameType, currentIssue, ch, amount, skipBetting) => {
  return UIMessageFactory.betPlaced(config, gameType, currentIssue, ch, amount, skipBetting);
};

const formatWinMessage = (amount, bigSmall, number, balance, profit) => {
  return UIMessageFactory.win(amount, bigSmall, number, balance, profit);
};

const formatLoseMessage = (amount, bigSmall, number, balance, profit) => {
  return UIMessageFactory.lose(amount, bigSmall, number, balance, profit);
};

const formatInfoMessage = (config, userInfo, settings, currentBalance, gameType, userId) => {
  return UIMessageFactory.userInfo(config, userInfo, settings, currentBalance, gameType, userId);
};

const formatUserStats = () => {
  const stats = getUserStatistics();
  return UIMessageFactory.systemStats(stats);
};

const createChannelJoinMessage = () => {
  return UIMessageFactory.channelVerification(requiredChannels);
};

// ███████████████████████████████████████
// ███  KEYBOARD WRAPPER FUNCTIONS   ███
// ███████████████████████████████████████

const makePlatformKeyboard = () => UIKeyboardFactory.platform();
const makeMainKeyboard = (loggedIn, userId) => UIKeyboardFactory.main(loggedIn, userId);
const makeRiskControlKeyboard = () => UIKeyboardFactory.riskControl();
const makeRiskControlStrategyKeyboard = () => UIKeyboardFactory.strategy();
const makeGameTypeKeyboard = () => UIKeyboardFactory.gameType();
const makeBettingStrategyKeyboard = () => UIKeyboardFactory.bettingStrategy();
const makeChannelVerifyKeyboard = () => UIKeyboardFactory.channelVerify(requiredChannels);
const makeTimeSetKeyboard = () => UIKeyboardFactory.timeSettings();
const makeAdminKeyboard = () => UIKeyboardFactory.admin();

// ███████████████████████████████████████
// ███  SYSTEM FUNCTIONS            ███
// ███████████████████████████████████████

const loadSystemMode = async () => {
  try {
    const data = await fs.readFile(SYSTEM_MODE_FILE, 'utf8');
    const parsed = JSON.parse(data);
    SYSTEM_MODE = parsed.mode || 'FREE';
    global.SYSTEM_MODE = SYSTEM_MODE;
    log('INFO', `📊 System Mode Loaded: ${SYSTEM_MODE} MODE`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      log('WARNING', `${SYSTEM_MODE_FILE} not found. Starting in FREE MODE`);
      SYSTEM_MODE = 'FREE';
      global.SYSTEM_MODE = SYSTEM_MODE;
      await saveSystemMode('FREE');
    } else {
      log('ERROR', `🧨 ERROR loading system mode: ${error.message}`);
      SYSTEM_MODE = 'FREE';
      global.SYSTEM_MODE = SYSTEM_MODE;
    }
  }
};

const saveSystemMode = async (mode) => {
  try {
    SYSTEM_MODE = mode;
    global.SYSTEM_MODE = SYSTEM_MODE;
    await fs.writeFile(SYSTEM_MODE_FILE, JSON.stringify({ mode: SYSTEM_MODE }, null, 2));
    log('INFO', `💾 System Mode Saved: ${SYSTEM_MODE} MODE`);
  } catch (error) {
    log('ERROR', `🧨 ERROR saving system mode: ${error.message}`);
  }
};

const loadBannedUsers = async () => {
  try {
    const data = await fs.readFile(BANNED_USERS_FILE, 'utf8');
    const parsed = JSON.parse(data);
    bannedUsers = new Set(parsed.banned_ids || []);
    log('INFO', `📂 Loaded ${bannedUsers.size} banned users`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      log('WARNING', `${BANNED_USERS_FILE} not found. Starting fresh`);
      bannedUsers = new Set();
      await saveBannedUsers();
    } else {
      log('ERROR', `🧨 ERROR loading ${BANNED_USERS_FILE}: ${error.message}`);
      bannedUsers = new Set();
    }
  }
};

const saveBannedUsers = async () => {
  try {
    await fs.writeFile(BANNED_USERS_FILE, JSON.stringify({ banned_ids: Array.from(bannedUsers) }, null, 2));
    log('INFO', `💾 Saved ${bannedUsers.size} banned users`);
  } catch (error) {
    log('ERROR', `🧨 ERROR saving banned users: ${error.message}`);
  }
};

const loadTimeSettings = async () => {
  try {
    const data = await fs.readFile(TIME_SETTINGS_FILE, 'utf8');
    const parsed = JSON.parse(data);
    for (const [userId, settings] of Object.entries(parsed)) {
      userTimeSettings[userId] = settings;
    }
    log('INFO', `📂 Loaded time settings for ${Object.keys(userTimeSettings).length} users`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      log('WARNING', `${TIME_SETTINGS_FILE} not found. Starting fresh`);
      await saveTimeSettings();
    } else {
      log('ERROR', `🧨 ERROR loading time settings: ${error.message}`);
    }
  }
};

const saveTimeSettings = async () => {
  try {
    await fs.writeFile(TIME_SETTINGS_FILE, JSON.stringify(userTimeSettings, null, 2));
    log('INFO', `💾 Saved time settings for ${Object.keys(userTimeSettings).length} users`);
  } catch (error) {
    log('ERROR', `🧨 ERROR saving time settings: ${error.message}`);
  }
};

const loadChannelConfig = async () => {
  try {
    const data = await fs.readFile(CHANNEL_CONFIG_FILE, 'utf8');
    const parsed = JSON.parse(data);
    requiredChannels = parsed.channels || requiredChannels;
    log('INFO', `📢 Loaded ${requiredChannels.length} required channels from config`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      log('WARNING', `${CHANNEL_CONFIG_FILE} not found. Using default channels`);
      await saveChannelConfig();
    } else {
      log('ERROR', `🧨 ERROR loading channel config: ${error.message}`);
    }
  }
};

const saveChannelConfig = async () => {
  try {
    await fs.writeFile(CHANNEL_CONFIG_FILE, JSON.stringify({ channels: requiredChannels }, null, 2));
    log('INFO', `💾 Saved ${requiredChannels.length} channels to config`);
  } catch (error) {
    log('ERROR', `🧨 ERROR saving channel config: ${error.message}`);
  }
};

const loadAllowedUsers = async (platform) => {
  const config = getPlatformConfig(platform);
  try {
    const data = await fs.readFile(config.ALLOWED_USERS_FILE, 'utf8');
    const parsed = JSON.parse(data);
    setAllowedUsersSet(platform, new Set(parsed.allowed_ids || []));
    log('INFO', `📂 Loaded ${getAllowedUsersSet(platform).size} users for ${config.GAME_NAME}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      log('WARNING', `${config.ALLOWED_USERS_FILE} not found. Starting fresh`);
      setAllowedUsersSet(platform, new Set());
      await saveAllowedUsers(platform);
    } else {
      log('ERROR', `🧨 ERROR loading ${config.ALLOWED_USERS_FILE}: ${error.message}`);
      setAllowedUsersSet(platform, new Set());
    }
  }
};

const saveAllowedUsers = async (platform) => {
  const config = getPlatformConfig(platform);
  try {
    await fs.writeFile(config.ALLOWED_USERS_FILE, JSON.stringify({ allowed_ids: Array.from(getAllowedUsersSet(platform)) }, null, 2));
    log('INFO', `💾 Saved ${getAllowedUsersSet(platform).size} users for ${config.GAME_NAME}`);
  } catch (error) {
    log('ERROR', `🧨 ERROR saving user list for ${platform}: ${error.message}`);
  }
};

const banUser = async (userId, username = '') => {
  bannedUsers.add(userId);
  await saveBannedUsers();
  if (userSettings[userId]?.running) {
    userSettings[userId].running = false;
    if (userSettings[userId].task) {
      if (typeof userSettings[userId].task === 'object' && typeof userSettings[userId].task.cancel === 'function') {
        userSettings[userId].task.cancel();
      }
      userSettings[userId].task = null;
    }
  }
  log('INFO', `🚫 User ${userId} (${username}) has been banned`);
};

const unbanUser = async (userId) => {
  bannedUsers.delete(userId);
  await saveBannedUsers();
  log('INFO', `🎄 User ${userId} has been unbanned`);
};

const isUserBanned = (userId) => {
  return bannedUsers.has(userId);
};

const getUserStatistics = () => {
  const totalUsers = Object.keys(userSessions).length;
  const activeUsers = Object.values(userSettings).filter(s => s.running).length;
  const bannedCount = bannedUsers.size;
  const inactiveUsers = totalUsers - activeUsers;
  return { totalUsers, activeUsers, bannedUsers: bannedCount, inactiveUsers };
};

const checkChannelMembership = async (userId) => {
  const results = [];
  for (const channel of requiredChannels) {
    try {
      const member = await bot.getChatMember(channel.id, userId);
      const isMember = member.status !== 'left' && member.status !== 'kicked';
      results.push({ channel, isMember });
    } catch (error) {
      log('ERROR', `🧨 ERROR checking channel ${channel.id}: ${error.message}`);
      results.push({ channel, isMember: false });
    }
  }
  return results;
};

const checkUserAuthorization = (platform, gameUserId) => {
  const allowedSet = getAllowedUsersSet(platform);
  if (SYSTEM_MODE === 'FREE') return true;
  if (SYSTEM_MODE === 'PREMIUM') return allowedSet.has(gameUserId);
  return true;
};

const checkUserLoggedIn = (userId) => {
  return !!(userSessions[userId] && userSettings[userId]?.platform);
};

const sendMessageWithRetry = async (chatId, text, replyMarkup = null, disableNotification = false) => {
  const silentMode = userSilentMode[chatId] || false;
  if (silentMode) {
    const silentKeywords = ["🏆 WIN", "⛔ LOSE", "🟢 WIN", "🔴 LOSE", "🎮", "BET:"];
    const isSilentMessage = silentKeywords.some(keyword => text.includes(keyword));
    if (isSilentMessage && !userSettings[chatId]?.running) {
      return true;
    }
  }
  for (let attempt = 0; attempt < MAX_TELEGRAM_RETRIES; attempt++) {
    try {
      await bot.sendMessage(chatId, text, { 
        reply_markup: replyMarkup,
        parse_mode: 'HTML',
        disable_notification: silentMode || disableNotification
      });
      return true;
    } catch (error) {
      log('ERROR', `❌ Failed to send message to ${chatId}, attempt ${attempt + 1}/${MAX_TELEGRAM_RETRIES}: ${error.message}`);
      if (attempt < MAX_TELEGRAM_RETRIES - 1) {
        await setTimeout(TELEGRAM_RETRY_DELAY);
        continue;
      }
      return false;
    }
  }
  return false;
};

const broadcastMessage = async (message, adminId) => {
  const allUsers = Object.keys(userSessions);
  let successCount = 0;
  let failCount = 0;
  for (const userId of allUsers) {
    try {
      await sendMessageWithRetry(userId, `📢 𝐁𝐫𝐨𝐚𝐝𝐜𝐚𝐬𝐭 𝐌𝐞𝐬𝐬𝐚𝐠𝐞:\n\n${message}`);
      successCount++;
    } catch (error) {
      log('ERROR', `❌ Failed to broadcast to user ${userId}: ${error.message}`);
      failCount++;
    }
    await setTimeout(100);
  }
  const report = `${BORDERS.SIM_TOP}
📢 𝐁𝐫𝐨𝐚𝐝𝐜𝐚𝐬𝐭 𝐑𝐞𝐩𝐨𝐫𝐭
${BORDERS.SIM_MID}
✅ 𝐒𝐞𝐧𝐭: ${successCount} 𝐮𝐬𝐞𝐫𝐬
❌ 𝐅𝐚𝐢𝐥𝐞𝐝: ${failCount} 𝐮𝐬𝐞𝐫𝐬
📊 𝐓𝐨𝐭𝐚𝐥: ${allUsers.length} 𝐮𝐬𝐞𝐫𝐬
${BORDERS.SIM_BOT}`;
  await sendMessageWithRetry(adminId, report);
};

const parseTime = (timeStr) => {
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*([ap]m)?/i);
  if (!match) return null;
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3] ? match[3].toLowerCase() : '';
  if (period === 'pm' && hours < 12) hours += 12;
  if (period === 'am' && hours === 12) hours = 0;
  return { hours, minutes };
};

const formatTime = (hours, minutes) => {
  const period = hours >= 12 ? 'p.m.' : 'a.m.';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')}${period}`;
};

const isWithinTimerange = (userId) => {
  const timerange = userTimeSettings[userId]?.range || [];
  if (timerange.length === 0) return true;
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  for (const range of timerange) {
    const start = parseTime(range.start);
    const end = parseTime(range.end);
    if (!start || !end) continue;
    const currentTime = currentHour * 60 + currentMinute;
    const startTime = start.hours * 60 + start.minutes;
    const endTime = end.hours * 60 + end.minutes;
    if (startTime <= endTime) {
      if (currentTime >= startTime && currentTime <= endTime) return true;
    } else {
      if (currentTime >= startTime || currentTime <= endTime) return true;
    }
  }
  return false;
};

const addTimerange = (userId, startTime, endTime) => {
  if (!userTimeSettings[userId]) userTimeSettings[userId] = { range: [] };
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  if (!start || !end) {
    return { success: false, message: '❌ Invalid time format. Use: 9:00a.m or 14:30' };
  }
  userTimeSettings[userId].range.push({
    start: startTime,
    end: endTime,
    startParsed: start,
    endParsed: end
  });
  saveTimeSettings();
  return { success: true, message: `✅ Time range added: ${formatTime(start.hours, start.minutes)} to ${formatTime(end.hours, end.minutes)}` };
};

const getTimerangeDisplay = (userId) => {
  const range = userTimeSettings[userId]?.range || [];
  if (range.length === 0) {
    return '🕒 𝐍𝐨 𝐭𝐢𝐦𝐞 𝐫𝐚𝐧𝐠𝐞 𝐬𝐞𝐭. 𝐁𝐨𝐭 𝐰𝐢𝐥𝐥 𝐫𝐮𝐧 𝟐𝟒/𝟕.';
  }
  let display = '🕒 𝐘𝐨𝐮𝐫 𝐓𝐢𝐦𝐞 𝐑𝐚𝐧𝐠𝐞:\n\n';
  range.forEach((range, index) => {
    const start = parseTime(range.start);
    const end = parseTime(range.end);
    if (start && end) {
      display += `${index + 1}. ${formatTime(start.hours, start.minutes)} → ${formatTime(end.hours, end.minutes)}\n`;
    }
  });
  display += `\n📊 𝐓𝐨𝐭𝐚𝐥: ${range.length} 𝐫𝐚𝐧𝐠𝐞(𝐬)`;
  return display;
};

const clearTimerange = (userId) => {
  if (userTimeSettings[userId]) {
    delete userTimeSettings[userId];
    saveTimeSettings();
    return { success: true, message: '✅ 𝐀𝐥𝐥 𝐭𝐢𝐦𝐞 𝐫𝐚𝐧𝐠𝐞𝐬 𝐜𝐥𝐞𝐚𝐫𝐞𝐝.' };
  }
  return { success: false, message: '⚠️ 𝐍𝐨 𝐭𝐢𝐦𝐞 𝐫𝐚𝐧𝐠𝐞 𝐭𝐨 𝐜𝐥𝐞𝐚𝐫.' };
};

const showProfitTargetReached = async (targetProfit, currentBalance, platform, userId, startedAmount, totalProfit) => {
  try {
    if (userProfitMessageId[userId]) {
      try {
        await bot.deleteMessage(userId, userProfitMessageId[userId]);
      } catch (error) {}
      delete userProfitMessageId[userId];
    }
    const message = createProfitTargetMessage(startedAmount, totalProfit, currentBalance);
    await sendMessageWithRetry(userId, message);
    log('INFO', `🧧 Profit Target reached notification sent to ${userId}`);
    return true;
  } catch (error) {
    log('ERROR', `🧨 ERROR sending profit target notification: ${error.message}`);
    return false;
  }
};

const showStopLossReached = async (stopLoss, currentBalance, platform, userId, startedAmount, totalProfit) => {
  try {
    if (userProfitMessageId[userId]) {
      try {
        await bot.deleteMessage(userId, userProfitMessageId[userId]);
      } catch (error) {}
      delete userProfitMessageId[userId];
    }
    const message = createStopLossMessage(startedAmount, totalProfit, currentBalance);
    await sendMessageWithRetry(userId, message);
    log('INFO', `🛑 Stop loss reached notification sent to ${userId}`);
    return true;
  } catch (error) {
    log('ERROR', `🧨 ERROR sending stop loss notification: ${error.message}`);
    return false;
  }
};

const updateProfitMessage = async (userId, chatId, currentBalance, currentProfit) => {
  try {
    const silentMode = userSilentMode[userId] || false;
    if (!silentMode) return;
    const settings = userSettings[userId] || {};
    const platform = settings.platform || '777BIGWIN';
    const config = getPlatformConfig(platform);
    const gameType = settings.game_type || "TRX";
    const updateMessage = UIMessageFactory.liveProfit(config, gameType, currentBalance, currentProfit);
    if (userProfitMessageId[userId]) {
      try {
        await bot.editMessageText(updateMessage, {
          chat_id: chatId,
          message_id: userProfitMessageId[userId],
          parse_mode: 'HTML'
        });
        userLastProfit[userId] = currentProfit;
      } catch (error) {
        log('ERROR', `❌ Edit profit failed: ${error.message}`);
      }
    } else {
      const sentMessage = await bot.sendMessage(chatId, updateMessage, { parse_mode: 'HTML' });
      userProfitMessageId[userId] = sentMessage.message_id;
      userLastProfit[userId] = currentProfit;
    }
  } catch (error) {
    log('ERROR', `❌ Profit update error: ${error.message}`);
  }
};

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
                const [betType, amount, isVirtual] = userPendingBets[userId][period] || [betType, amount, false];
                const number = parseInt(settled.number || "0", 10) % 10;
                const bigSmall = number >= 5 ? "Big" : "Small";
                const isWin = (betType === "B" && bigSmall === "Big") || (betType === "S" && bigSmall === "Small");
                userLastResult[userId] = bigSmall;
                if (settings.strategy === "DREAM" || settings.strategy === "DREAM_V2") {
                  if (!userLast10Results[userId]) userLast10Results[userId] = [];
                  userLast10Results[userId].push(bigSmall === "Big" ? "B" : "S");
                  if (userLast10Results[userId].length > 10) userLast10Results[userId] = userLast10Results[userId].slice(-10);
                }
                if (!userSettings[userId].lastPeriod) userSettings[userId].lastPeriod = {};
                userSettings[userId].lastPeriod[gameType] = period;
                
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
                
                const targetProfit = userSettingsForUser.target_profit;
                const stopLoss = userSettingsForUser.stop_loss;
                
                if (userStats[userId]) {
                  const currentProfit = userStats[userId].profit;
                  const startedAmount = userStats[userId].start_balance || 0;
                  if (targetProfit && currentProfit >= targetProfit) {
                    await showProfitTargetReached(targetProfit, currentBalance || 0, config.GAME_NAME, userId, startedAmount, currentProfit);
                    userSettingsForUser.running = false;
                  } else if (stopLoss && currentProfit <= -stopLoss) {
                    await showStopLossReached(stopLoss, currentBalance || 0, config.GAME_NAME, userId, startedAmount, currentProfit);
                    userSettingsForUser.running = false;
                  }
                }
                
                if (isWin) {
                  if (userSettingsForUser.skip_betting || (layerLimit !== undefined && layerLimit > 1 && (userSettingsForUser.current_layer || 0) >= layerLimit - 1)) {
                    userSettingsForUser.skip_betting = false;
                    userSettingsForUser.consecutive_losses = 0;
                    userSettingsForUser.current_layer = 0;
                  } else {
                    userSettingsForUser.consecutive_losses = 0;
                    userSettingsForUser.current_layer = 0;
                  }
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
                  } else if (bettingStrategy === "D'Alembert") {
                    const currentUnits = userSettingsForUser.dalembert_units || 1;
                    if (isWin) {
                      userSettingsForUser.dalembert_units = Math.max(1, currentUnits - 1);
                    } else {
                      userSettingsForUser.dalembert_units = currentUnits + 1;
                    }
                  }
                }
                
                delete userPendingBets[userId][period];
                if (Object.keys(userPendingBets[userId]).length === 0) delete userPendingBets[userId];
                userWaitingForResult[userId] = false;
              }
            }
          }
          if (userSkippedBets[userId]) {
            for (const [period, betInfo] of Object.entries(userSkippedBets[userId])) {
              let settled = data.find(item => item.issueNumber === period);
              if (settled && settled.number) {
                const [betType, isVirtual] = betInfo;
                const number = parseInt(settled.number || "0") % 10;
                const bigSmall = number >= 5 ? "B" : "S";
                const isWin = (betType === "B" && bigSmall === "B") || (betType === "S" && bigSmall === "S");
                if (settings.strategy === "JOHNSON") updateJHSONState(userId, isWin, number);
                delete userSkippedBets[userId][period];
                if (Object.keys(userSkippedBets[userId]).length === 0) delete userSkippedBets[userId];
                if (userSkipResultWait[userId] === period) delete userSkipResultWait[userId];
              }
            }
          }
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
  const settings = userSettings[userId] || {};
  const platform = settings.platform || '777BIGWIN';
  const config = getPlatformConfig(platform);
  const session = userSessions[userId];
  const gameType = settings.game_type || "TRX";
  
  if (!settings || !session) {
    log('ERROR', `❌ Betting worker failed for user ${userId}: No session/settings`);
    await sendMessageWithRetry(chatId, "❌ Please login first");
    if (settings) settings.running = false;
    return;
  }
  
  userStats[userId] = { start_balance: userStats[userId]?.start_balance || 0.0, profit: 0.0 };
  settings.running = true;
  settings.bet_time = {};
  settings.last_issue = null;
  settings.consecutive_errors = 0;
  settings.consecutive_losses = 0;
  settings.current_layer = 0;
  settings.skip_betting = false;
  
  if (settings.strategy === "OP_PATTERN_TRX") settings.op_pattern_index = 0;
  if (settings.strategy === "JOHNSON") delete settings.jhson_state;
  if (settings.strategy === "SERVER_1") {
    userAILast10Results[userId] = [];
    userAiRoundCount[userId] = 0;
  }
  if (settings.strategy === "DREAM_V2" || settings.strategy === "DREAM") {
    userAILast10Results[userId] = [];
    userAiRoundCount[userId] = 0;
  }
  
  let currentBalance = await getBalanceWithRetry(session, platform, userId);
  if (currentBalance === null) {
    log('ERROR', `❌ Failed to get initial balance for user ${userId}`);
    await sendMessageWithRetry(chatId, "❌ Failed to check balance. Stopping...");
    settings.running = false;
    return;
  }
  
  const startMsg = UIMessageFactory.botStart(
    config, 
    currentBalance, 
    gameType, 
    settings.strategy,
    settings.betting_strategy || "Martingale",
    settings.target_profit,
    settings.stop_loss
  );
  await sendMessageWithRetry(chatId, startMsg, makeMainKeyboard(true, userId));
  
  if (userSilentMode[userId]) await updateProfitMessage(userId, chatId, currentBalance, 0);
  
  const betSizes = settings.bet_sizes || [];
  if (!betSizes.length) {
    log('ERROR', `❌ No bet sizes set for user ${userId}`);
    await sendMessageWithRetry(chatId, "❌ No bet sizes set. Please set BET SIZE first.");
    settings.running = false;
    return;
  }
  
  const minBetAmount = Math.min(...betSizes);
  if (currentBalance < minBetAmount) {
    log('ERROR', `❌ Insufficient balance for user ${userId}: ${currentBalance} < ${minBetAmount}`);
    await sendMessageWithRetry(chatId, "❗ Balance is not enough for Bet. Deposit and Start again.");
    settings.running = false;
    return;
  }
  
  try {
    while (settings.running) {
      if (!isWithinTimerange(userId)) {
        await setTimeout(60000);
        continue;
      }
      if (userWaitingForResult[userId] || userSkipResultWait[userId]) {
        await setTimeout(500);
        continue;
      }
      
      currentBalance = await getBalanceWithRetry(session, platform, userId);
      if (currentBalance !== null && (settings.skip_betting || 
          (settings.layer_limit !== undefined && settings.layer_limit > 1 && 
           (settings.current_layer || 0) < settings.layer_limit - 1) || 
          currentBalance >= Math.min(...betSizes))) {
        settings.consecutive_errors = 0;
      } else {
        log('ERROR', `❌ Balance check failed for user ${userId}: ${currentBalance}`);
        await sendMessageWithRetry(chatId, "❌ Failed to check balance after retries. Stopping...");
        settings.running = false;
        break;
      }
      
      if (!settings.running) break;
      
      const bettingStrategy = settings.betting_strategy || "Martingale";
      const strategy = settings.strategy || null;
      
      let issueRes = await getGameIssueRequest(session, platform, gameType);
      if (!issueRes || issueRes.code !== 0) {
        settings.consecutive_errors += 1;
        if (settings.consecutive_errors >= MAX_CONSECUTIVE_ERRORS) {
          log('ERROR', `❌ Max consecutive errors (${MAX_CONSECUTIVE_ERRORS}) reached for user ${userId}. Stopping bot.`);
          await sendMessageWithRetry(chatId, `❌ Too many consecutive errors (${MAX_CONSECUTIVE_ERRORS}). Stopping bot.`);
          settings.running = false;
          break;
        }
        await setTimeout(1000);
        continue;
      }
      
      const data = issueRes.data || {};
      let currentIssue = gameType === "TRX" ? data.predraw?.issueNumber : data.issueNumber;
      if (!currentIssue) {
        settings.consecutive_errors += 1;
        if (settings.consecutive_errors >= MAX_CONSECUTIVE_ERRORS) {
          log('ERROR', `❌ Max consecutive errors (${MAX_CONSECUTIVE_ERRORS}) reached for user ${userId}. Stopping bot.`);
          await sendMessageWithRetry(chatId, `❌ Too many consecutive errors (${MAX_CONSECUTIVE_ERRORS}). Stopping bot.`);
          settings.running = false;
          break;
        }
        await setTimeout(500);
        continue;
      }
      
      if (currentIssue === settings.last_issue) {
        await setTimeout(500);
        continue;
      }
      
      let ch, shouldSkipForSniper = false, shouldSkipForCustomDigit = false, shouldSkipForPanda = false;
      
      if (strategy === "OP_PATTERN_TRX") {
        const prediction = await getOpPatternPrediction(userId, platform, gameType);
        ch = prediction?.result || (Math.random() < 0.5 ? "B" : "S");
      } else if (strategy === "CUSTOM_DIGIT_MAP") {
        const prediction = await getCustomDigitPrediction(userId, platform, gameType);
        ch = prediction?.result || (Math.random() < 0.5 ? "B" : "S");
        shouldSkipForCustomDigit = prediction?.shouldSkip || false;
      } else if (strategy === "PANDA_30S") {
        const prediction = await getPandaPrediction(userId, platform, gameType);
        ch = prediction?.result || (Math.random() < 0.5 ? "B" : "S");
        shouldSkipForPanda = prediction?.shouldSkip || false;
      } else if (strategy === "DREAM") {
        userAiRoundCount[userId] = (userAiRoundCount[userId] || 0) + 1;
        if (userAiRoundCount[userId] <= 10 || (userLast10Results[userId]?.length || 0) < 10) {
          ch = Math.random() < 0.5 ? "B" : "S";
        } else {
          const prediction = await getDreamPrediction(userId, platform, gameType);
          ch = prediction?.result || (Math.random() < 0.5 ? "B" : "S");
        }
      } else if (strategy === "DREAM_V2") {
        userAiRoundCount[userId] = (userAiRoundCount[userId] || 0) + 1;
        if (userAiRoundCount[userId] <= 10 || (userLast10Results[userId]?.length || 0) < 10) {
          ch = Math.random() < 0.5 ? "B" : "S";
        } else {
          ch = userLast10Results[userId][2] || (Math.random() < 0.5 ? "B" : "S");
        }
      } else if (strategy === "SHINE") {
        if (!settings.last_result) {
          ch = Math.random() < 0.5 ? "B" : "S";
        } else {
          const consecutive = settings.consecutive_results || 0;
          const lastResult = settings.last_result;
          if (consecutive === 1) ch = lastResult === "Big" ? "S" : "B";
          else if (consecutive === 2) ch = lastResult === "Big" ? "B" : "S";
          else if (consecutive === 3) ch = lastResult === "Big" ? "S" : "B";
          else if (consecutive === 4) ch = lastResult === "Big" ? "B" : "S";
          else ch = lastResult === "Big" ? "S" : "B";
        }
      } else if (strategy === "ALINKAR") {
        const alinkarPattern = "BBSSBSBSBBSS";
        const pidx = (settings.pattern_index || 0) % alinkarPattern.length;
        ch = alinkarPattern[pidx];
      } else if (strategy === "PLUTO") {
        const plutoPatterns = {
          "0": "BSBS", "1": "BSBB", "2": "SBSS", "3": "BBSS",
          "4": "BSBB", "5": "BBBB", "6": "SBBS", "7": "BBBB",
          "8": "SSSS", "9": "SSBB"
        };
        const lastDigit = currentIssue.slice(-1);
        const pattern = plutoPatterns[lastDigit];
        if (!settings.current_pattern || settings.pluto_won) {
          settings.current_pattern = pattern;
          settings.pattern_index = 0;
        }
        const pidx = (settings.pattern_index || 0) % settings.current_pattern.length;
        ch = settings.current_pattern[pidx];
      } else if (strategy === "TREND_FOLLOW") {
        ch = userLastResult[userId] === "Big" ? "B" : "S";
        if (!ch) ch = Math.random() < 0.5 ? "B" : "S";
      } else if (strategy === "SNIPER_V1") {
        const prediction = await getSniperPrediction(userId, platform, gameType);
        ch = prediction?.result || (Math.random() < 0.5 ? "B" : "S");
        shouldSkipForSniper = prediction?.shouldSkip || false;
      } else if (strategy === "EI_PU_30S") {
        const prediction = await getEiPu30sPrediction(userId, platform, gameType);
        ch = prediction?.result || (Math.random() < 0.5 ? "B" : "S");
      } else if (strategy === "JOHNSON") {
        const prediction = await getJHSONPrediction(userId, platform);
        ch = prediction?.result || (Math.random() < 0.5 ? "B" : "S");
      } else if (strategy === "SERVER_1") {
        const prediction = await getServer1Prediction(userId, platform, gameType);
        ch = prediction?.result || (Math.random() < 0.5 ? "B" : "S");
      } else {
        log('ERROR', `❌ No strategy selected for user ${userId}`);
        await sendMessageWithRetry(chatId, "❌ No strategy selected. Please select a strategy in Risk Control → Strategy.");
        settings.running = false;
        break;
      }
      
      const selectMap = getSelectMap();
      const selectType = selectMap[ch];
      if (selectType === undefined) {
        settings.consecutive_errors += 1;
        if (settings.consecutive_errors >= MAX_CONSECUTIVE_ERRORS) {
          log('ERROR', `❌ Max consecutive errors (${MAX_CONSECUTIVE_ERRORS}) reached for user ${userId}. Stopping bot.`);
          settings.running = false;
          break;
        }
        await setTimeout(1000);
        continue;
      }
      
      let amount;
      if (bettingStrategy === "D'Alembert") {
        if (betSizes.length > 1) {
          await sendMessageWithRetry(chatId, "❌ D'Alembert requires a single BET SIZE. Please set one bet size.");
          settings.running = false;
          break;
        }
        const unitSize = betSizes[0];
        const units = settings.dalembert_units || 1;
        amount = unitSize * units;
      } else {
        const midx = Math.min((settings.martin_index || 0), betSizes.length - 1);
        amount = betSizes[midx];
      }
      
      const layerLimit = settings.layer_limit;
      const skipBetting = settings.skip_betting || 
        (layerLimit !== undefined && layerLimit > 1 && (settings.current_layer || 0) < layerLimit - 1);
      
      if (!skipBetting && currentBalance < amount) {
        log('ERROR', `❌ Insufficient balance for user ${userId}: ${currentBalance} < ${amount}`);
        await sendMessageWithRetry(chatId, "❗ Balance is not enough for Bet. Deposit and Start again.");
        settings.running = false;
        break;
      }
      
      if (shouldSkipForSniper || shouldSkipForCustomDigit || shouldSkipForPanda) {
        let reason = "";
        if (shouldSkipForSniper) reason = "🎯 𝐒𝐍𝐈𝐏𝐄𝐑 𝐕𝟏";
        else if (shouldSkipForCustomDigit) reason = "🎲 𝐂𝐔𝐒𝐓𝐎𝐌 𝐃𝐈𝐆𝐈𝐓";
        else if (shouldSkipForPanda) reason = "🐼 𝐏𝐀𝐍𝐃𝐀";
        
        const betMsg = `${BORDERS.MOD_TOP}
│                    ⏭️  𝐁𝐄𝐓 𝐒𝐊𝐈𝐏𝐏𝐄𝐃  ⏭️                    │
${BORDERS.MOD_MID}
│  ${FORMAT.platform(config)}                                          │
│  ${EMOJI.GAME} 𝐆𝐚𝐦𝐞: ${gameType.padEnd(15)} ${EMOJI.TICKET} 𝐈𝐬𝐬𝐮𝐞: ${FORMAT.code(currentIssue)}  │
│                                                        │
│  ${reason} → ❌ 𝟎 𝐊𝐬                                      │
│                                                        │
${BORDERS.MOD_MID}
│  📝 𝐑𝐞𝐚𝐬𝐨𝐧: 𝐍𝐨 𝐦𝐚𝐭𝐜𝐡𝐢𝐧𝐠 𝐩𝐚𝐭𝐭𝐞𝐫𝐧 / 𝐬𝐤𝐢𝐩 𝐜𝐨𝐧𝐝𝐢𝐭𝐢𝐨𝐧     │
${BORDERS.MOD_BOT}`;
        
        await sendMessageWithRetry(chatId, betMsg);
        if (!userSkippedBets[userId]) userSkippedBets[userId] = {};
        userSkippedBets[userId][currentIssue] = [ch, false];
        userSkipResultWait[userId] = currentIssue;
        settings.last_issue = currentIssue;
        await setTimeout(500);
        continue;
      }
      
      const betMsg = formatBetMessage(config, gameType, currentIssue, ch, amount, skipBetting);
      await sendMessageWithRetry(chatId, betMsg);
      
      if (!skipBetting) {
        const unitAmount = computeUnitAmount(amount);
        const betCount = unitAmount > 0 ? Math.floor(amount / unitAmount) : 1;
        const betResp = await placeBetRequest(session, platform, currentIssue, selectType, unitAmount, betCount, gameType, userId);
        settings.last_issue = currentIssue;
        
        if (betResp.settled) {
          await setTimeout(500);
          continue;
        }
        
        if (betResp.error || betResp.code !== 0) {
          settings.consecutive_errors += 1;
          if (settings.consecutive_errors >= MAX_CONSECUTIVE_ERRORS) {
            log('ERROR', `❌ Max consecutive errors (${MAX_CONSECUTIVE_ERRORS}) reached for user ${userId}. Stopping bot.`);
            await sendMessageWithRetry(chatId, `❌ Too many consecutive errors (${MAX_CONSECUTIVE_ERRORS}). Stopping bot.`);
            settings.running = false;
            break;
          }
          await setTimeout(3000);
          continue;
        }
        settings.consecutive_errors = 0;
      }
      
      if (!userPendingBets[userId]) userPendingBets[userId] = {};
      userPendingBets[userId][currentIssue] = [ch, skipBetting ? 0 : amount, false];
      settings.bet_time[currentIssue] = Date.now() / 1000;
      userWaitingForResult[userId] = true;
      
      if (strategy === "ALINKAR" || strategy === "PLUTO") {
        settings.pattern_index = ((settings.pattern_index || 0) + 1) % (settings.current_pattern?.length || 1);
      }
      if (strategy === "JOHNSON" && settings.jhson_state) {
        settings.jhson_state.current_index = (settings.jhson_state.current_index + 1) % settings.jhson_state.current_pattern.length;
      }
      
      const gameDelay = GAME_DELAYS[gameType] || 1000;
      await setTimeout(gameDelay);
    }
  } catch (error) {
    log('ERROR', `❌ Betting worker error for user ${userId}: ${error.message}`);
  } finally {
    settings.running = false;
    delete userWaitingForResult[userId];
    delete userShouldSkipNext[userId];
    delete userSkipResultWait[userId];
    
    let currentBalance = null;
    const session = userSessions[userId];
    currentBalance = session ? await getBalanceWithRetry(session, platform, userId) : null;
    const balanceText = currentBalance !== null ? `💰 ${FORMAT.money(currentBalance)}\n📊 ${userStats[userId] ? (userStats[userId].profit >= 0 ? '📈' : '📉') + ' 𝐏𝐫𝐨𝐟𝐢𝐭: ' + (userStats[userId].profit >= 0 ? '+' : '') + userStats[userId].profit.toFixed(2) + ' 𝐊𝐬' : ''}` : '';
    
    await sendMessageWithRetry(chatId, `🛑 𝐁𝐨𝐭 𝐒𝐭𝐨𝐩𝐩𝐞𝐝\n${balanceText}`, makeMainKeyboard(true, userId));
  }
};

// ███████████████████████████████████████
// ███  BOT COMMAND HANDLERS         ███
// ███████████████████████████████████████

// START COMMAND
bot.onText(/\/start/, async (msg) => {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  
  if (isUserBanned(userId)) {
    await sendMessageWithRetry(chatId, `🚫 𝐘𝐨𝐮 𝐡𝐚𝐯𝐞 𝐛𝐞𝐞𝐧 𝐛𝐚𝐧𝐧𝐞𝐝 𝐟𝐫𝐨𝐦 𝐮𝐬𝐢𝐧𝐠 𝐭𝐡𝐢𝐬 𝐛𝐨𝐭.\n\n📞 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐚𝐝𝐦𝐢𝐧 @GOD_OuWan 𝐟𝐨𝐫 𝐚𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐜𝐞.`);
    return;
  }
  
  const channelResults = await checkChannelMembership(userId);
  const allJoined = channelResults.every(result => result.isMember);
  
  if (!allJoined) {
    userState[userId] = { state: "CHANNEL_VERIFICATION", channel_results: channelResults };
    const joinMessage = createChannelJoinMessage();
    await sendMessageWithRetry(chatId, joinMessage, makeChannelVerifyKeyboard());
    return;
  }
  
  if (!userSettings[userId]) {
    userSettings[userId] = {
      mode: "REAL",
      strategy: null,
      betting_strategy: "Martingale",
      martin_index: 0,
      dalembert_units: 1,
      pattern_index: 0,
      running: false,
      consecutive_losses: 0,
      current_layer: 0,
      skip_betting: false,
      game_type: "TRX",
    };
  }
  
  delete userTemp[userId]?.platform;
  
  if (checkUserLoggedIn(userId)) {
    await sendMessageWithRetry(chatId, `🤖 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐁𝐚𝐜𝐤!\n\n𝐔𝐬𝐞 𝐭𝐡𝐞 𝐦𝐞𝐧𝐮 𝐛𝐞𝐥𝐨𝐰:`, makeMainKeyboard(true, userId));
  } else {
    await sendMessageWithRetry(chatId, formatWelcomeMessage(), makePlatformKeyboard());
  }
  
  if (!global.winLoseTask || global.winLoseTask.finished) {
    global.winLoseTask = winLoseChecker();
  }
});

// ADMIN COMMAND
bot.onText(/\/admin/, async (msg) => {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  if (userId !== ADMIN_ID) {
    await sendMessageWithRetry(chatId, "⛔ 𝐀𝐝𝐦𝐢𝐧 𝐎𝐧𝐥𝐲\n\n𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐫𝐞𝐬𝐭𝐫𝐢𝐜𝐭𝐞𝐝 𝐭𝐨 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐭𝐨𝐫𝐬.");
    return;
  }
  await sendMessageWithRetry(chatId, "🛠️ 𝐀𝐝𝐦𝐢𝐧 𝐂𝐨𝐧𝐭𝐫𝐨𝐥 𝐏𝐚𝐧𝐞𝐥", makeAdminKeyboard());
});

// ALLOW USER COMMAND
bot.onText(/\/allow (.+)/, async (msg, match) => {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  if (userId !== ADMIN_ID) {
    await sendMessageWithRetry(chatId, "⛔ 𝐀𝐝𝐦𝐢𝐧 𝐎𝐧𝐥𝐲");
    return;
  }
  const parts = match[1].split(' ');
  if (parts.length < 2) {
    await sendMessageWithRetry(chatId, `📋 𝐔𝐬𝐚𝐠𝐞:\n\n/allow {𝐩𝐥𝐚𝐭𝐟𝐨𝐫𝐦} {𝐮𝐬𝐞𝐫_𝐢𝐝}\n\n🎮 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦𝐬:\n• 777bigwin\n• cklottery\n• 6lottery`);
    return;
  }
  const platform = parts[0].toUpperCase();
  const userIdToAllow = parseInt(parts[1]);
  if (!['777BIGWIN', 'CKLOTTERY', '6LOTTERY'].includes(platform) || isNaN(userIdToAllow)) {
    await sendMessageWithRetry(chatId, `⚠️ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦/𝐔𝐬𝐞𝐫 𝐈𝐃`);
    return;
  }
  const allowedSet = getAllowedUsersSet(platform);
  const config = getPlatformConfig(platform);
  if (allowedSet.has(userIdToAllow)) {
    await sendMessageWithRetry(chatId, `🎄 𝐔𝐬𝐞𝐫 𝐀𝐥𝐫𝐞𝐚𝐝𝐲 𝐀𝐝𝐝𝐞𝐝\n\n𝐔𝐬𝐞𝐫 ${userIdToAllow} 𝐢𝐬 𝐚𝐥𝐫𝐞𝐚𝐝𝐲 𝐚𝐮𝐭𝐡𝐨𝐫𝐢𝐳𝐞𝐝 𝐟𝐨𝐫 ${config.GAME_NAME}.`);
  } else {
    allowedSet.add(userIdToAllow);
    await saveAllowedUsers(platform);
    await sendMessageWithRetry(chatId, `🎄 𝐔𝐬𝐞𝐫 𝐀𝐝𝐝𝐞𝐝\n\n𝐔𝐬𝐞𝐫 ${userIdToAllow} 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐚𝐮𝐭𝐡𝐨𝐫𝐢𝐳𝐞𝐝 𝐟𝐨𝐫 ${config.GAME_NAME}.`);
  }
});

// REMOVE USER COMMAND
bot.onText(/\/remove (.+)/, async (msg, match) => {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  if (userId !== ADMIN_ID) {
    await sendMessageWithRetry(chatId, "⛔ 𝐀𝐝𝐦𝐢𝐧 𝐎𝐧𝐥𝐲");
    return;
  }
  const parts = match[1].split(' ');
  if (parts.length < 2) {
    await sendMessageWithRetry(chatId, `📋 𝐔𝐬𝐚𝐠𝐞:\n\n/remove {𝐩𝐥𝐚𝐭𝐟𝐨𝐫𝐦} {𝐮𝐬𝐞𝐫_𝐢𝐝}`);
    return;
  }
  const platform = parts[0].toUpperCase();
  const userIdToRemove = parseInt(parts[1]);
  if (!['777BIGWIN', 'CKLOTTERY', '6LOTTERY'].includes(platform) || isNaN(userIdToRemove)) {
    await sendMessageWithRetry(chatId, `⚠️ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦/𝐔𝐬𝐞𝐫 𝐈𝐃`);
    return;
  }
  const allowedSet = getAllowedUsersSet(platform);
  const config = getPlatformConfig(platform);
  if (!allowedSet.has(userIdToRemove)) {
    await sendMessageWithRetry(chatId, `⚠️ 𝐔𝐬𝐞𝐫 𝐍𝐨𝐭 𝐅𝐨𝐮𝐧𝐝`);
  } else {
    allowedSet.delete(userIdToRemove);
    await saveAllowedUsers(platform);
    await sendMessageWithRetry(chatId, `🎄 𝐔𝐬𝐞𝐫 𝐑𝐞𝐦𝐨𝐯𝐞𝐝\n\n𝐔𝐬𝐞𝐫 ${userIdToRemove} 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐫𝐞𝐦𝐨𝐯𝐞𝐝 𝐟𝐫𝐨𝐦 ${config.GAME_NAME} 𝐚𝐮𝐭𝐡𝐨𝐫𝐢𝐳𝐞𝐝 𝐥𝐢𝐬𝐭.`);
  }
});

// BAN USER COMMAND
bot.onText(/\/ban (.+)/, async (msg, match) => {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  if (userId !== ADMIN_ID) {
    await sendMessageWithRetry(chatId, "⛔ 𝐀𝐝𝐦𝐢𝐧 𝐎𝐧𝐥𝐲");
    return;
  }
  const username = match[1].trim();
  const userToBan = parseInt(username);
  if (isNaN(userToBan)) {
    await sendMessageWithRetry(chatId, "⚠️ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐔𝐬𝐞𝐫 𝐈𝐃");
    return;
  }
  await banUser(userToBan, username);
  try {
    await sendMessageWithRetry(userToBan, `🚫 𝐘𝐨𝐮 𝐡𝐚𝐯𝐞 𝐛𝐞𝐞𝐧 𝐛𝐚𝐧𝐧𝐞𝐝 𝐟𝐫𝐨𝐦 𝐮𝐬𝐢𝐧𝐠 𝐭𝐡𝐢𝐬 𝐛𝐨𝐭.\n\n📞 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐚𝐝𝐦𝐢𝐧 @GOD_OuWan 𝐟𝐨𝐫 𝐚𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐜𝐞.`);
  } catch (error) {}
  await sendMessageWithRetry(chatId, `🎄 𝐔𝐬𝐞𝐫 ${userToBan} 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐛𝐚𝐧𝐧𝐞𝐝.`);
});

// UNBAN USER COMMAND
bot.onText(/\/unban (.+)/, async (msg, match) => {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  if (userId !== ADMIN_ID) {
    await sendMessageWithRetry(chatId, "⛔ 𝐀𝐝𝐦𝐢𝐧 𝐎𝐧𝐥𝐲");
    return;
  }
  const username = match[1].trim();
  const userToUnban = parseInt(username);
  if (isNaN(userToUnban)) {
    await sendMessageWithRetry(chatId, "⚠️ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐔𝐬𝐞𝐫 𝐈𝐃");
    return;
  }
  if (!isUserBanned(userToUnban)) {
    await sendMessageWithRetry(chatId, `⚠️ 𝐔𝐬𝐞𝐫 ${userToUnban} 𝐢𝐬 𝐧𝐨𝐭 𝐛𝐚𝐧𝐧𝐞𝐝.`);
    return;
  }
  await unbanUser(userToUnban);
  try {
    await sendMessageWithRetry(userToUnban, `🎄 𝐘𝐨𝐮𝐫 𝐛𝐚𝐧 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐥𝐢𝐟𝐭𝐞𝐝!\n\n𝐘𝐨𝐮 𝐜𝐚𝐧 𝐧𝐨𝐰 𝐮𝐬𝐞 𝐭𝐡𝐞 𝐛𝐨𝐭 𝐚𝐠𝐚𝐢𝐧.\n\n𝐓𝐲𝐩𝐞 /start 𝐭𝐨 𝐛𝐞𝐠𝐢𝐧.`);
  } catch (error) {}
  await sendMessageWithRetry(chatId, `🎄 𝐔𝐬𝐞𝐫 ${userToUnban} 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐮𝐧𝐛𝐚𝐧𝐧𝐞𝐝.`);
});

// BROADCAST COMMAND
bot.onText(/\/broadcast (.+)/, async (msg, match) => {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  if (userId !== ADMIN_ID) {
    await sendMessageWithRetry(chatId, "⛔ 𝐀𝐝𝐦𝐢𝐧 𝐎𝐧𝐥𝐲");
    return;
  }
  const message = match[1];
  await broadcastMessage(message, userId);
});

// STATS COMMAND
bot.onText(/\/stats/, async (msg) => {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  if (userId !== ADMIN_ID) {
    await sendMessageWithRetry(chatId, "⛔ 𝐀𝐝𝐦𝐢𝐧 𝐎𝐧𝐥𝐲");
    return;
  }
  await sendMessageWithRetry(chatId, formatUserStats());
});

// MODE COMMAND
bot.onText(/\/mode (.+)/, async (msg, match) => {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  if (userId !== ADMIN_ID) {
    await sendMessageWithRetry(chatId, "⛔ 𝐀𝐝𝐦𝐢𝐧 𝐎𝐧𝐥𝐲");
    return;
  }
  const mode = match[1].toUpperCase();
  if (mode === 'FREE' || mode === 'PREMIUM') {
    await saveSystemMode(mode);
    await sendMessageWithRetry(chatId, `🎄 𝐒𝐲𝐬𝐭𝐞𝐦 𝐌𝐨𝐝𝐞 𝐂𝐡𝐚𝐧𝐠𝐞𝐝\n\n𝐍𝐨𝐰 𝐫𝐮𝐧𝐧𝐢𝐧𝐠 𝐢𝐧: ${mode === 'FREE' ? '🔓 𝐅𝐑𝐄𝐄 𝐌𝐎𝐃𝐄' : '🔒 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐌𝐎𝐃𝐄'}`);
  } else {
    await sendMessageWithRetry(chatId, `⚠️ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐌𝐨𝐝𝐞\n\n𝐔𝐬𝐞: /mode FREE 𝐨𝐫 /mode PREMIUM`);
  }
});

// ███████████████████████████████████████
// ███  CALLBACK QUERY HANDLER       ███
// ███████████████████████████████████████

bot.on('callback_query', async (query) => {
  if (!query || !query.from) return;
  
  const userId = query.from.id;
  const chatId = query.message.chat.id;
  
  if (!userSettings[userId]) {
    userSettings[userId] = {
      mode: "REAL",
      betting_strategy: "Martingale",
      martin_index: 0,
      dalembert_units: 1,
      pattern_index: 0,
      running: false,
      consecutive_losses: 0,
      current_layer: 0,
      skip_betting: false,
      game_type: "TRX",
    };
  }
  
  try {
    await bot.answerCallbackQuery(query.id);
    
    if (query.data.startsWith("time_set:")) {
      const action = query.data.split(":")[1];
      if (action === "add") {
        userState[userId] = { state: "INPUT_TIME_range_START" };
        await sendMessageWithRetry(chatId, `⏰ 𝐀𝐝𝐝 𝐓𝐢𝐦𝐞 𝐑𝐚𝐧𝐠𝐞\n\n𝐄𝐧𝐭𝐞𝐫 𝐬𝐭𝐚𝐫𝐭 𝐭𝐢𝐦𝐞 (𝐟𝐨𝐫𝐦𝐚𝐭: 9:00a.m 𝐨𝐫 14:30):`, makeMainKeyboard(true, userId));
      } else if (action === "view") {
        await sendMessageWithRetry(chatId, getTimerangeDisplay(userId), makeTimeSetKeyboard());
      } else if (action === "clear") {
        const result = clearTimerange(userId);
        await sendMessageWithRetry(chatId, result.message, makeTimeSetKeyboard());
      } else if (action === "back") {
        await sendMessageWithRetry(chatId, "🔙 𝐑𝐞𝐭𝐮𝐫𝐧𝐢𝐧𝐠 𝐭𝐨 𝐦𝐚𝐢𝐧 𝐦𝐞𝐧𝐮...", makeMainKeyboard(true, userId));
      }
      await bot.deleteMessage(chatId, query.message.message_id);
    }
    else if (query.data.startsWith("admin:")) {
      const action = query.data.split(":")[1];
      if (action === "stats") {
        await sendMessageWithRetry(chatId, formatUserStats());
      } else if (action === "broadcast") {
        userState[userId] = { state: "ADMIN_BROADCAST" };
        await sendMessageWithRetry(chatId, `📢 𝐒𝐞𝐧𝐝 𝐁𝐫𝐨𝐚𝐝𝐜𝐚𝐬𝐭 𝐌𝐞𝐬𝐬𝐚𝐠𝐞\n\n𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐭𝐡𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭 𝐭𝐨 𝐛𝐫𝐨𝐚𝐝𝐜𝐚𝐬𝐭:`);
      } else if (action === "ban") {
        userState[userId] = { state: "ADMIN_BAN_USER" };
        await sendMessageWithRetry(chatId, `🚫 𝐁𝐚𝐧 𝐔𝐬𝐞𝐫\n\n𝐄𝐧𝐭𝐞𝐫 𝐭𝐡𝐞 𝐮𝐬𝐞𝐫 𝐈𝐃 𝐭𝐨 𝐛𝐚𝐧:`);
      } else if (action === "unban") {
        userState[userId] = { state: "ADMIN_UNBAN_USER" };
        await sendMessageWithRetry(chatId, `🎄 𝐔𝐧𝐛𝐚𝐧 𝐔𝐬𝐞𝐫\n\n𝐄𝐧𝐭𝐞𝐫 𝐭𝐡𝐞 𝐮𝐬𝐞𝐫 𝐈𝐃 𝐭𝐨 𝐮𝐧𝐛𝐚𝐧:`);
      } else if (action === "channels") {
        await sendMessageWithRetry(chatId, "📢 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐌𝐚𝐧𝐚𝐠𝐞𝐦𝐞𝐧𝐭", UIKeyboardFactory.channelVerify(requiredChannels));
      } else if (action === "mode_free") {
        await saveSystemMode('FREE');
        await sendMessageWithRetry(chatId, `🎄 𝐒𝐲𝐬𝐭𝐞𝐦 𝐌𝐨𝐝𝐞 𝐂𝐡𝐚𝐧𝐠𝐞𝐝\n\n𝐍𝐨𝐰 𝐫𝐮𝐧𝐧𝐢𝐧𝐠 𝐢𝐧: 🔓 𝐅𝐑𝐄𝐄 𝐌𝐎𝐃𝐄`);
        await bot.deleteMessage(chatId, query.message.message_id);
      } else if (action === "mode_premium") {
        await saveSystemMode('PREMIUM');
        await sendMessageWithRetry(chatId, `🎄 𝐒𝐲𝐬𝐭𝐞𝐦 𝐌𝐨𝐝𝐞 𝐂𝐡𝐚𝐧𝐠𝐞𝐝\n\n𝐍𝐨𝐰 𝐫𝐮𝐧𝐧𝐢𝐧𝐠 𝐢𝐧: 🔒 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐌𝐎𝐃𝐄`);
        await bot.deleteMessage(chatId, query.message.message_id);
      } else if (action === "back") {
        await sendMessageWithRetry(chatId, "🔙 𝐑𝐞𝐭𝐮𝐫𝐧𝐢𝐧𝐠 𝐭𝐨 𝐚𝐝𝐦𝐢𝐧 𝐩𝐚𝐧𝐞𝐥...", makeAdminKeyboard());
      }
      await bot.deleteMessage(chatId, query.message.message_id);
    }
    else if (query.data.startsWith("sl_limit:")) {
      const slLimit = parseInt(query.data.split(":")[1]);
      userSettings[userId].sl_limit = slLimit > 0 ? slLimit : null;
      userSettings[userId].consecutive_losses = 0;
      userSettings[userId].skip_betting = false;
      await sendMessageWithRetry(chatId, `🎄 𝐒𝐋 𝐬𝐞𝐭: ${slLimit > 0 ? slLimit : '𝐃𝐢𝐬𝐚𝐛𝐥𝐞𝐝'} 𝐜𝐨𝐧𝐬𝐞𝐜𝐮𝐭𝐢𝐯𝐞 𝐥𝐨𝐬𝐬𝐞𝐬`, makeRiskControlKeyboard());
      await bot.deleteMessage(chatId, query.message.message_id);
    } else if (query.data.startsWith("layer_limit:")) {
      const layerLimit = parseInt(query.data.split(":")[1]);
      userSettings[userId].layer_limit = layerLimit > 0 ? layerLimit : null;
      userSettings[userId].current_layer = 0;
      userSettings[userId].skip_betting = false;
      await sendMessageWithRetry(chatId, `🎄 𝐄𝐧𝐭𝐫𝐲 𝐋𝐚𝐲𝐞𝐫 𝐬𝐞𝐭: ${layerLimit > 0 ? layerLimit : '𝐃𝐢𝐬𝐚𝐛𝐥𝐞𝐝'} 𝐦𝐚𝐭𝐜𝐡𝐞𝐬`, makeRiskControlKeyboard());
      await bot.deleteMessage(chatId, query.message.message_id);
    }
    else if (query.data === "verify_channels" || query.data === "check_channels") {
      await bot.answerCallbackQuery(query.id, { text: "🔍 Checking channel membership..." });
      const channelResults = await checkChannelMembership(userId);
      const allJoined = channelResults.every(result => result.isMember);
      if (allJoined) {
        await bot.deleteMessage(chatId, query.message.message_id);
        await sendMessageWithRetry(chatId, `🎄 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 𝐕𝐄𝐑𝐈𝐅𝐈𝐂𝐀𝐓𝐈𝐎𝐍 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋!\n\n🎉 𝐂𝐨𝐧𝐠𝐫𝐚𝐭𝐮𝐥𝐚𝐭𝐢𝐨𝐧𝐬! 𝐘𝐨𝐮 𝐡𝐚𝐯𝐞 𝐣𝐨𝐢𝐧𝐞𝐝 𝐚𝐥𝐥 𝐫𝐞𝐪𝐮𝐢𝐫𝐞𝐝 𝐜𝐡𝐚𝐧𝐧𝐞𝐥𝐬.\n\n👉 𝐍𝐨𝐰 𝐬𝐞𝐥𝐞𝐜𝐭 𝐲𝐨𝐮𝐫 𝐩𝐥𝐚𝐭𝐟𝐨𝐫𝐦 𝐭𝐨 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐞:`, makePlatformKeyboard());
        delete userState[userId];
      } else {
        let statusMessage = `${BORDERS.LUX_TOP}\n║              📢  𝐂𝐇𝐀𝐍𝐍??𝐋 𝐉𝐎𝐈𝐍 𝐒𝐓𝐀𝐓𝐔𝐒  📢              ║\n${BORDERS.LUX_MID}\n`;
        channelResults.forEach((result, index) => {
          const status = result.isMember ? "✅ 𝐉𝐨𝐢𝐧𝐞𝐝" : "❌ 𝐍𝐨𝐭 𝐉𝐨𝐢𝐧𝐞𝐝";
          statusMessage += `║  ${index + 1}. ${result.channel.name.padEnd(45)}${status.padEnd(15)}║\n`;
        });
        statusMessage += `${BORDERS.LUX_MID}\n║  ⚠️ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐣𝐨𝐢𝐧 𝐚𝐥𝐥 𝐜𝐡𝐚𝐧𝐧𝐞𝐥𝐬 𝐚𝐧𝐝 𝐜𝐥𝐢𝐜𝐤 "🔄 𝐂𝐇𝐄𝐂𝐊 𝐀𝐆𝐀𝐈𝐍"  ║\n${BORDERS.LUX_BOT}`;
        await bot.editMessageText(statusMessage, {
          chat_id: chatId,
          message_id: query.message.message_id,
          reply_markup: makeChannelVerifyKeyboard(),
          parse_mode: 'HTML'
        });
      }
    }
  } catch (error) {
    log('ERROR', `🧨 ERROR handling callback query for user ${userId}: ${error.message}`);
  }
});

// ███████████████████████████████████████
// ███  MESSAGE HANDLER             ███
// ███████████████████████████████████████

bot.on('message', async (msg) => {
  if (msg.text && msg.text.startsWith('/')) return;
  
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const rawText = msg.text || "";
  const text = normalizeText(rawText);
  
  if (isUserBanned(userId)) {
    await sendMessageWithRetry(chatId, `🚫 𝐘𝐨𝐮 𝐡𝐚𝐯𝐞 𝐛𝐞𝐞𝐧 𝐛𝐚𝐧𝐧𝐞𝐝 𝐟𝐫𝐨𝐦 𝐮𝐬𝐢𝐧𝐠 𝐭𝐡𝐢𝐬 𝐛𝐨𝐭.\n\n📞 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐚𝐝𝐦𝐢𝐧 @GOD_OuWan 𝐟𝐨𝐫 𝐚𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐜𝐞.`);
    return;
  }
  
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  
  // Channel verification state
  if (userState[userId]?.state === "CHANNEL_VERIFICATION") {
    await sendMessageWithRetry(chatId, `📢 𝐏𝐥𝐞𝐚𝐬𝐞 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐞 𝐜𝐡𝐚𝐧𝐧𝐞𝐥 𝐯𝐞𝐫𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐟𝐢𝐫𝐬𝐭.\n\n𝐔𝐬𝐞 𝐭𝐡𝐞 𝐛𝐮𝐭𝐭𝐨𝐧𝐬 𝐢𝐧 𝐭𝐡𝐞 𝐯𝐞𝐫𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐞.`);
    return;
  }
  
  // Platform selection
  if (text.includes("777 BIGWIN") || text === "🏆 777 BIGWIN") {
    userTemp[userId] = { platform: '777BIGWIN' };
    const config = getPlatformConfig('777BIGWIN');
    await sendMessageWithRetry(chatId, formatLoginMessage('777BIGWIN', config.GAME_NAME), makeLoginKeyboard());
    return;
  }
  if (text.includes("CK LOTTERY") || text === "🎲 CK LOTTERY") {
    userTemp[userId] = { platform: 'CKLOTTERY' };
    const config = getPlatformConfig('CKLOTTERY');
    await sendMessageWithRetry(chatId, formatLoginMessage('CKLOTTERY', config.GAME_NAME), makeLoginKeyboard());
    return;
  }
  if (text.includes("6 LOTTERY") || text === "🎯 6 LOTTERY") {
    userTemp[userId] = { platform: '6LOTTERY' };
    const config = getPlatformConfig('6LOTTERY');
    await sendMessageWithRetry(chatId, formatLoginMessage('6LOTTERY', config.GAME_NAME), makeLoginKeyboard());
    return;
  }
  
  // Time settings input
  if (userState[userId]?.state === "INPUT_TIME_range_START") {
    const startTime = text.trim();
    userState[userId] = { state: "INPUT_TIME_range_END", startTime };
    await sendMessageWithRetry(chatId, `⏰ 𝐀𝐝𝐝 𝐓𝐢𝐦𝐞 𝐑𝐚𝐧𝐠𝐞\n\n𝐒𝐭𝐚𝐫𝐭 𝐭𝐢𝐦𝐞: ${startTime}\n\n𝐍𝐨𝐰 𝐞𝐧𝐭𝐞𝐫 𝐞𝐧𝐝 𝐭𝐢𝐦𝐞 (𝐟𝐨𝐫𝐦𝐚𝐭: 11:00a.m 𝐨𝐫 16:30):`, makeMainKeyboard(true, userId));
    return;
  }
  if (userState[userId]?.state === "INPUT_TIME_range_END") {
    const endTime = text.trim();
    const startTime = userState[userId].startTime;
    const result = addTimerange(userId, startTime, endTime);
    if (result.success) {
      await sendMessageWithRetry(chatId, `✅ ${result.message}\n\n${getTimerangeDisplay(userId)}`, makeTimeSetKeyboard());
    } else {
      await sendMessageWithRetry(chatId, `❌ ${result.message}\n\n𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧.`, makeTimeSetKeyboard());
    }
    delete userState[userId];
    return;
  }
  
  // Admin states
  if (userId === ADMIN_ID) {
    if (userState[userId]?.state === "ADMIN_BROADCAST") {
      await broadcastMessage(text, userId);
      delete userState[userId];
      return;
    } else if (userState[userId]?.state === "ADMIN_BAN_USER") {
      const userToBan = parseInt(text);
      if (isNaN(userToBan)) {
        await sendMessageWithRetry(chatId, "⚠️ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐔𝐬𝐞𝐫 𝐈𝐃");
        return;
      }
      await banUser(userToBan, text);
      try {
        await sendMessageWithRetry(userToBan, `🚫 𝐘𝐨𝐮 𝐡𝐚𝐯𝐞 𝐛𝐞𝐞𝐧 𝐛𝐚𝐧𝐧𝐞𝐝 𝐟𝐫𝐨𝐦 𝐮𝐬𝐢𝐧𝐠 𝐭𝐡𝐢𝐬 𝐛𝐨𝐭.\n\n📞 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐚𝐝𝐦𝐢𝐧 @GOD_OuWan 𝐟𝐨𝐫 𝐚𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐜𝐞.`);
      } catch (error) {}
      await sendMessageWithRetry(chatId, `🎄 𝐔𝐬𝐞𝐫 ${userToBan} 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐛𝐚𝐧𝐧𝐞𝐝.`);
      delete userState[userId];
      return;
    } else if (userState[userId]?.state === "ADMIN_UNBAN_USER") {
      const userToUnban = parseInt(text);
      if (isNaN(userToUnban)) {
        await sendMessageWithRetry(chatId, "⚠️ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐔𝐬𝐞𝐫 𝐈𝐃");
        return;
      }
      if (!isUserBanned(userToUnban)) {
        await sendMessageWithRetry(chatId, `⚠️ 𝐔𝐬𝐞𝐫 ${userToUnban} 𝐢𝐬 𝐧𝐨𝐭 𝐛𝐚𝐧𝐧𝐞𝐝.`);
        delete userState[userId];
        return;
      }
      await unbanUser(userToUnban);
      try {
        await sendMessageWithRetry(userToUnban, `🎄 𝐘𝐨𝐮𝐫 𝐛𝐚𝐧 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐥𝐢𝐟𝐭𝐞𝐝!\n\n𝐘𝐨𝐮 𝐜𝐚𝐧 𝐧𝐨𝐰 𝐮𝐬𝐞 𝐭𝐡𝐞 𝐛𝐨𝐭 𝐚𝐠𝐚𝐢𝐧.\n\n𝐓𝐲𝐩𝐞 /start 𝐭𝐨 𝐛𝐞𝐠𝐢𝐧.`);
      } catch (error) {}
      await sendMessageWithRetry(chatId, `🎄 𝐔𝐬𝐞𝐫 ${userToUnban} 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐮𝐧𝐛𝐚𝐧𝐧𝐞𝐝.`);
      delete userState[userId];
      return;
    } else if (userState[userId]?.state === "ADMIN_ADD_CHANNEL") {
      const args = rawText.split(' ');
      if (args.length < 2) {
        await sendMessageWithRetry(chatId, `❌ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐟𝐨𝐫𝐦𝐚𝐭\n\n𝐔𝐬𝐞: @channel_id 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐍𝐚𝐦𝐞`);
        return;
      }
      const channelId = args[0];
      const channelName = args.slice(1).join(' ');
      try {
        await bot.getChat(channelId);
        const exists = requiredChannels.some(ch => ch.id === channelId);
        if (exists) {
          await sendMessageWithRetry(chatId, `⚠️ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐀𝐥𝐫𝐞𝐚𝐝𝐲 𝐄𝐱𝐢𝐬𝐭𝐬`);
        } else {
          requiredChannels.push({ id: channelId, name: channelName });
          await saveChannelConfig();
          await sendMessageWithRetry(chatId, `✅ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐀𝐝𝐝𝐞𝐝\n\n📢 ${channelName}\n🔗 ${channelId}\n\n𝐓𝐨𝐭𝐚𝐥 𝐜𝐡𝐚𝐧𝐧𝐞𝐥𝐬: ${requiredChannels.length}`, makeAdminKeyboard());
        }
      } catch (error) {
        await sendMessageWithRetry(chatId, `❌ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐂𝐡𝐚𝐧𝐧𝐞𝐥`);
      }
      delete userState[userId];
      return;
    } else if (userState[userId]?.state === "ADMIN_REMOVE_CHANNEL") {
      const channelId = rawText.trim();
      const initialLength = requiredChannels.length;
      requiredChannels = requiredChannels.filter(ch => ch.id !== channelId);
      if (requiredChannels.length < initialLength) {
        await saveChannelConfig();
        await sendMessageWithRetry(chatId, `✅ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐑𝐞𝐦𝐨𝐯𝐞𝐝\n\n🔗 ${channelId}\n\n𝐑𝐞𝐦𝐚𝐢𝐧𝐢𝐧𝐠 𝐜𝐡𝐚𝐧𝐧𝐞𝐥𝐬: ${requiredChannels.length}`, makeAdminKeyboard());
      } else {
        await sendMessageWithRetry(chatId, `⚠️ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐍𝐨𝐭 𝐅𝐨𝐮𝐧𝐝`);
      }
      delete userState[userId];
      return;
    }
  }
  
  // LOGIN handling
  if (lines.length > 0 && lines[0].toLowerCase() === "login") {
    if (!userTemp[userId]?.platform) {
      await sendMessageWithRetry(chatId, formatWelcomeMessage(), makePlatformKeyboard());
      return;
    }
    const platform = userTemp[userId].platform;
    const config = getPlatformConfig(platform);
    
    if (lines.length >= 3) {
      const username = lines[1];
      const password = lines[2];
      
      await sendMessageWithRetry(chatId, "🔍 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐥𝐨𝐠𝐢𝐧...");
      const [res, session] = await loginRequest(platform, username, password);
      
      if (session) {
        const userInfo = await getUserInfo(session, platform, userId);
        if (userInfo && userInfo.user_id) {
          const gameUserId = userInfo.user_id;
          const isAuthorized = checkUserAuthorization(platform, gameUserId);
          
          if (!isAuthorized) {
            await sendMessageWithRetry(chatId, `🔒 𝐀𝐮𝐭𝐡𝐨𝐫𝐢𝐳𝐚𝐭𝐢𝐨𝐧 𝐑??𝐪𝐮𝐢𝐫𝐞𝐝\n\n𝐔𝐬𝐞𝐫 𝐈𝐃: ${gameUserId}\n𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦: ${config.GAME_NAME}\n\n📞 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐚𝐝𝐦𝐢𝐧 @GOD_OuWan`, makeLoginKeyboard());
            return;
          }
          
          userSessions[userId] = session;
          userGameInfo[userId] = userInfo;
          userTemp[userId] = { password, platform };
          
          if (!userSettings[userId]) {
            userSettings[userId] = {
              platform: platform,
              mode: "REAL",
              strategy: null,
              betting_strategy: "Martingale",
              martin_index: 0,
              dalembert_units: 1,
              pattern_index: 0,
              running: false,
              consecutive_losses: 0,
              current_layer: 0,
              skip_betting: false,
              game_type: platform === '6LOTTERY' ? "WINGO30S" : "TRX",
            };
          } else {
            userSettings[userId].platform = platform;
          }
          
          const balance = await getBalanceWithRetry(session, platform, userId);
          userStats[userId] = { start_balance: parseFloat(balance || 0), profit: 0.0 };
          await sendMessageWithRetry(chatId, formatLoginSuccess(config, userInfo, balance || 0), makeMainKeyboard(true, userId));
        } else {
          await sendMessageWithRetry(chatId, `❌ 𝐋𝐨𝐠𝐢𝐧 𝐅𝐚𝐢𝐥𝐞𝐝\n\n𝐔𝐧𝐚𝐛𝐥𝐞 𝐭𝐨 𝐫𝐞𝐭𝐫𝐢𝐞𝐯𝐞 𝐮𝐬𝐞𝐫 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧.`, makeLoginKeyboard());
        }
      } else {
        await sendMessageWithRetry(chatId, `❌ 𝐋𝐨𝐠𝐢𝐧 𝐄𝐫𝐫𝐨𝐫\n\n${res.msg || '𝐋𝐨𝐠𝐢𝐧 𝐟𝐚𝐢𝐥𝐞𝐝'}`, makeLoginKeyboard());
      }
      delete userState[userId];
      return;
    }
    
    if (lines.length === 1) {
      userState[userId] = { state: "WAIT_PHONE" };
      await sendMessageWithRetry(chatId, `📱 𝐄𝐧𝐭𝐞𝐫 𝐏𝐡𝐨𝐧𝐞 𝐍𝐮𝐦𝐛𝐞𝐫\n\n𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐲𝐨𝐮𝐫 𝐩𝐡𝐨𝐧𝐞 𝐧𝐮𝐦𝐛𝐞𝐫 (𝐰𝐢𝐭𝐡𝐨𝐮𝐭 𝐜𝐨𝐮𝐧𝐭𝐫𝐲 𝐜𝐨𝐝𝐞):\n\n09123456789`, makeMainKeyboard(true, userId));
      return;
    }
  }
  
  if (userState[userId]?.state === "WAIT_PHONE") {
    userTemp[userId] = { ...userTemp[userId], phone: text };
    userState[userId] = { state: "WAIT_PASS" };
    await sendMessageWithRetry(chatId, `🔐 𝐄𝐧𝐭𝐞𝐫 𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝\n\n𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐲𝐨𝐮𝐫 𝐩𝐚𝐬𝐬𝐰𝐨𝐫𝐝:`);
    return;
  }
  
  if (userState[userId]?.state === "WAIT_PASS") {
    const platform = userTemp[userId]?.platform;
    const phone = userTemp[userId]?.phone;
    const password = text;
    
    if (!platform) {
      await sendMessageWithRetry(chatId, formatWelcomeMessage(), makePlatformKeyboard());
      return;
    }
    
    const config = getPlatformConfig(platform);
    await sendMessageWithRetry(chatId, "🔍 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐥𝐨𝐠𝐢𝐧...");
    const [res, session] = await loginRequest(platform, phone, password);
    
    if (session) {
      const userInfo = await getUserInfo(session, platform, userId);
      if (userInfo && userInfo.user_id) {
        const gameUserId = userInfo.user_id;
        const isAuthorized = checkUserAuthorization(platform, gameUserId);
        
        if (!isAuthorized) {
          await sendMessageWithRetry(chatId, `🔒 𝐀𝐮𝐭𝐡𝐨𝐫𝐢𝐳𝐚𝐭𝐢𝐨𝐧 𝐑𝐞𝐪𝐮𝐢𝐫𝐞𝐝\n\n𝐔𝐬𝐞𝐫 𝐈𝐃: ${gameUserId}\n𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦: ${config.GAME_NAME}\n\n📞 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐚𝐝𝐦𝐢𝐧 @GOD_OuWan`, makeLoginKeyboard());
          return;
        }
        
        userSessions[userId] = session;
        userGameInfo[userId] = userInfo;
        userTemp[userId] = { password, platform };
        
        if (!userSettings[userId]) {
          userSettings[userId] = {
            platform: platform,
            mode: "REAL",
            strategy: null,
            betting_strategy: "Martingale",
            martin_index: 0,
            dalembert_units: 1,
            pattern_index: 0,
            running: false,
            consecutive_losses: 0,
            current_layer: 0,
            skip_betting: false,
            game_type: platform === '6LOTTERY' ? "WINGO30S" : "TRX",
          };
        } else {
          userSettings[userId].platform = platform;
        }
        
        const balance = await getBalanceWithRetry(session, platform, userId);
        userStats[userId] = { start_balance: parseFloat(balance || 0), profit: 0.0 };
        await sendMessageWithRetry(chatId, formatLoginSuccess(config, userInfo, balance || 0), makeMainKeyboard(true, userId));
      } else {
        await sendMessageWithRetry(chatId, `❌ 𝐋𝐨𝐠𝐢𝐧 𝐅𝐚𝐢𝐥𝐞𝐝`, makeLoginKeyboard());
      }
    } else {
      await sendMessageWithRetry(chatId, `❌ 𝐋𝐨𝐠𝐢𝐧 𝐄𝐫𝐫𝐨𝐫\n\n${res.msg || '𝐋𝐨𝐠𝐢𝐧 𝐟𝐚𝐢𝐥𝐞𝐝'}`, makeLoginKeyboard());
    }
    delete userState[userId];
    return;
  }
  
  // Check if user is logged in
  const isLoggedIn = checkUserLoggedIn(userId);
  
  if (!isLoggedIn) {
    if (rawText === "🔐 𝐋𝐎𝐆𝐈𝐍" || rawText === "🔐 LOGIN") {
      await sendMessageWithRetry(chatId, formatWelcomeMessage(), makePlatformKeyboard());
      return;
    }
    await sendMessageWithRetry(chatId, `🔐 𝐋𝐨𝐠𝐢𝐧 𝐑𝐞𝐪𝐮𝐢𝐫𝐞𝐝\n\n𝐏𝐥𝐞𝐚𝐬𝐞 𝐥𝐨𝐠𝐢𝐧 𝐟𝐢𝐫𝐬𝐭 𝐭𝐨 𝐮𝐬𝐞 𝐭𝐡𝐞 𝐛𝐨𝐭 𝐟𝐞𝐚𝐭𝐮𝐫𝐞𝐬.\n\n👇 𝐒𝐞𝐥𝐞𝐜𝐭 𝐲𝐨𝐮𝐫 𝐩𝐥𝐚𝐭𝐟𝐨𝐫𝐦:`, makePlatformKeyboard());
    return;
  }
  
  if (!userSettings[userId]) {
    userSettings[userId] = {
      mode: "REAL",
      strategy: null,
      betting_strategy: "Martingale",
      martin_index: 0,
      dalembert_units: 1,
      pattern_index: 0,
      running: false,
      consecutive_losses: 0,
      current_layer: 0,
      skip_betting: false,
      game_type: "TRX",
    };
  }
  
  try {
    const settings = userSettings[userId] || {};
    const platform = settings.platform || '777BIGWIN';
    const config = getPlatformConfig(platform);
    
    // INPUT BET SIZES
    if (userState[userId]?.state === "INPUT_BET_SIZES") {
      const betSizes = lines.filter(s => /^\d+$/.test(s)).map(Number);
      if (!betSizes.length) throw new Error("No valid numbers provided");
      userSettings[userId].bet_sizes = betSizes;
      userSettings[userId].dalembert_units = 1;
      await sendMessageWithRetry(chatId, `✅ 𝐁𝐞𝐭 𝐖𝐫𝐚𝐠𝐞𝐫𝐬 𝐔𝐩𝐝𝐚𝐭𝐞𝐝\n\n💰 𝐒𝐢𝐳𝐞𝐬: ${betSizes.join(', ')} 𝐊𝐬`, makeMainKeyboard(true, userId));
      delete userState[userId];
    }
    // INPUT PROFIT TARGET
    else if (userState[userId]?.state === "INPUT_PROFIT_TARGET") {
      const target = parseFloat(lines[0]);
      if (isNaN(target) || target <= 0) throw new Error("Invalid profit target amount");
      userSettings[userId].target_profit = target;
      await sendMessageWithRetry(chatId, `✅ 𝐏𝐫𝐨𝐟𝐢𝐭 𝐓𝐚𝐫𝐠𝐞𝐭 𝐔𝐩𝐝𝐚𝐭𝐞𝐝\n\n🎯 𝐓𝐚𝐫𝐠𝐞𝐭: ${target.toFixed(2)} 𝐊𝐬`, makeRiskControlKeyboard());
      delete userState[userId];
    }
    // INPUT STOP LOSS
    else if (userState[userId]?.state === "INPUT_STOP_LIMIT") {
      const stopLoss = parseFloat(lines[0]);
      if (isNaN(stopLoss) || stopLoss <= 0) throw new Error("Invalid stop loss amount");
      userSettings[userId].stop_loss = stopLoss;
      await sendMessageWithRetry(chatId, `✅ 𝐒𝐭𝐨𝐩 𝐋𝐨𝐬𝐬 𝐔𝐩𝐝𝐚𝐭𝐞𝐝\n\n🛑 𝐋𝐢𝐦𝐢𝐭: ${stopLoss.toFixed(2)} 𝐊𝐬`, makeRiskControlKeyboard());
      delete userState[userId];
    }
    // INPUT CUSTOM DIGIT MAPPING
    else if (userState[userId]?.state === "INPUT_CUSTOM_DIGIT_MAP") {
      const lines = text.split('\n').map(line => line.trim()).filter(line => line);
      const mapping = {};
      for (const line of lines) {
        if (line.includes('=')) {
          const [digitStr, betType] = line.split('=').map(s => s.trim().toUpperCase());
          const digit = parseInt(digitStr);
          if (!isNaN(digit) && digit >= 0 && digit <= 9 && (betType === 'B' || betType === 'S')) {
            mapping[digit.toString()] = betType;
          }
        }
      }
      userDigitMappings[userId] = mapping;
      userSettings[userId].strategy = "CUSTOM_DIGIT_MAP";
      userSettings[userId].digit_mapping = mapping;
      
      let summary = `✅ 𝐂𝐮𝐬𝐭𝐨𝐦 𝐃𝐢𝐠𝐢𝐭 𝐌𝐚𝐩𝐩𝐢𝐧𝐠 𝐒𝐚𝐯𝐞𝐝!\n\n`;
      for (let i = 0; i <= 9; i++) {
        const betType = mapping[i.toString()];
        summary += `${i} = ${betType ? (betType === 'B' ? '🟢' : '🔴') + ' ' + betType : '❌ 𝐒𝐊𝐈𝐏'}\n`;
      }
      summary += `\n📚 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲: 𝐂𝐔𝐒𝐓𝐎𝐌 𝐃𝐈𝐆𝐈𝐓 𝐌𝐀𝐏𝐏𝐈𝐍𝐆`;
      await sendMessageWithRetry(chatId, summary, makeRiskControlStrategyKeyboard());
      delete userState[userId];
      return;
    }
    // MAIN MENU BUTTONS
    else if (rawText.trim() === "💰 𝐁𝐄𝐓 𝐖𝐑𝐀𝐆𝐄𝐑") {
      userState[userId] = { state: "INPUT_BET_SIZES" };
      await sendMessageWithRetry(chatId, `💰 𝐒𝐞𝐭 𝐁𝐞𝐭 𝐖𝐫𝐚𝐠𝐞𝐫\n\n𝐄𝐧𝐭𝐞𝐫 𝐛𝐞𝐭 𝐰𝐫𝐚𝐠𝐞𝐫 𝐢𝐧 𝐊𝐬 (𝐨𝐧𝐞 𝐩𝐞𝐫 𝐥𝐢𝐧𝐞):\n\n100\n300\n700\n1500`, makeMainKeyboard(true, userId));
    }
    else if (rawText.trim() === "🔊 𝐒𝐈𝐋𝐄𝐍𝐓 𝐌𝐎𝐃𝐄" || rawText.trim() === "🔇 𝐒𝐈𝐋𝐄𝐍𝐓 𝐌𝐎𝐃𝐄") {
      userSilentMode[userId] = !userSilentMode[userId];
      global.userSilentMode[userId] = userSilentMode[userId];
      const modeText = userSilentMode[userId] ? "🔇 𝐒𝐈𝐋𝐄𝐍𝐓 𝐌𝐎𝐃𝐄" : "🔊 𝐒𝐈𝐋𝐄𝐍𝐓 𝐌𝐎𝐃𝐄";
      const statusText = userSilentMode[userId] ? 
        "(𝐀𝐜𝐭𝐢𝐯𝐞)\n\n🎄 𝐖𝐢𝐧/𝐋𝐨𝐬𝐬 𝐧𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧𝐬 𝐚𝐫𝐞 𝐦𝐮𝐭𝐞𝐝\n📊 𝐏𝐫𝐨𝐟𝐢𝐭 𝐮𝐩𝐝𝐚𝐭𝐞𝐬 𝐰𝐢𝐥𝐥 𝐚𝐮𝐭𝐨-𝐞𝐝𝐢𝐭" :
        "(𝐈𝐧𝐚𝐜𝐭𝐢𝐯𝐞)\n\n🎄 𝐖𝐢𝐧/𝐋𝐨𝐬𝐬 𝐧𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧𝐬 𝐚𝐫𝐞 𝐞𝐧𝐚𝐛𝐥𝐞𝐝";
      await sendMessageWithRetry(chatId, `${modeText}\n\n${statusText}`, makeMainKeyboard(true, userId));
    }
    else if (rawText.trim() === "🛡️ 𝐑𝐈𝐒𝐊 𝐂𝐎𝐍𝐓𝐑𝐎𝐋") {
      await sendMessageWithRetry(chatId, "🛡️ 𝐑𝐢𝐬𝐤 𝐂𝐨𝐧𝐭𝐫𝐨𝐥 𝐌𝐞𝐧𝐮", makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "⚙️ 𝐁𝐄𝐓 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒") {
      await sendMessageWithRetry(chatId, "⚙️ 𝐁𝐞𝐭 𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬 𝐌𝐞𝐧𝐮", makeBetPlaceSettingsKeyboard());
    }
    else if (rawText.trim() === "📊 𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎") {
      const session = userSessions[userId];
      const userInfo = await getUserInfo(session, platform, userId);
      let currentBalance = session ? await getBalanceWithRetry(session, platform, userId) : null;
      const gameType = settings.game_type || (platform === '6LOTTERY' ? "WINGO30S" : "TRX");
      const infoMessage = formatInfoMessage(config, userInfo, settings, currentBalance, gameType, userId);
      await sendMessageWithRetry(chatId, infoMessage, makeMainKeyboard(true, userId));
    }
    else if (rawText.trim() === "🔄 𝐑𝐄-𝐋𝐎𝐆𝐈𝐍") {
      delete userSessions[userId];
      delete userTemp[userId]?.platform;
      delete userSettings[userId]?.platform;
      await sendMessageWithRetry(chatId, `🔄 𝐒𝐞𝐬𝐬𝐢𝐨𝐧 𝐂𝐥𝐞𝐚𝐫𝐞𝐝\n\n𝐏𝐥𝐞𝐚𝐬𝐞 𝐬𝐞𝐥𝐞𝐜𝐭 𝐲𝐨𝐮𝐫 𝐩𝐥𝐚𝐭𝐟𝐨𝐫𝐦 𝐚𝐠𝐚𝐢𝐧:`, makePlatformKeyboard());
    }
    else if (rawText.trim() === "🔋 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄") {
      if (!settings.bet_sizes || settings.bet_sizes.length === 0) {
        await sendMessageWithRetry(chatId, `❌ 𝐁𝐞𝐭 𝐖𝐫𝐚𝐠𝐞𝐫 𝐍𝐨𝐭 𝐂𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐞𝐝!\n\n𝐏𝐥𝐞𝐚𝐬𝐞 𝐬𝐞𝐭 𝐲𝐨𝐮𝐫 𝐛𝐞𝐭 𝐰𝐫𝐚𝐠𝐞𝐫 𝐟𝐢𝐫𝐬𝐭.`, makeMainKeyboard(true, userId));
        return;
      }
      if (!settings.strategy) {
        await sendMessageWithRetry(chatId, `❌ 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐍𝐨𝐭 𝐒𝐞𝐥𝐞𝐜𝐭𝐞𝐝!\n\n𝐏𝐥𝐞𝐚𝐬𝐞 𝐬𝐞𝐥𝐞𝐜𝐭 𝐚 𝐬𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐟𝐢𝐫𝐬𝐭.`, makeMainKeyboard(true, userId));
        return;
      }
      if (settings.running) {
        await sendMessageWithRetry(chatId, `⚠️ 𝐁𝐨𝐭 𝐀𝐥𝐫𝐞𝐚𝐝𝐲 𝐑𝐮𝐧𝐧𝐢𝐧𝐠`, makeMainKeyboard(true, userId));
        return;
      }
      settings.martin_index = 0;
      settings.dalembert_units = 1;
      settings.consecutive_losses = 0;
      settings.current_layer = 0;
      settings.skip_betting = false;
      settings.running = true;
      settings.consecutive_errors = 0;
      userWaitingForResult[userId] = false;
      settings.task = bettingWorker(userId, chatId);
    }
    else if (rawText.trim() === "🪫 𝐃𝐄𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄") {
      if (!settings.running) {
        await sendMessageWithRetry(chatId, `⚠️ 𝐁𝐨𝐭 𝐍𝐨𝐭 𝐑𝐮𝐧𝐧𝐢𝐧𝐠`, makeMainKeyboard(true, userId));
        return;
      }
      settings.running = false;
      if (settings.task) {
        if (typeof settings.task === 'object' && typeof settings.task.cancel === 'function') {
          settings.task.cancel();
        }
        settings.task = null;
      }
      delete userWaitingForResult[userId];
      if (userProfitMessageId[userId]) {
        try {
          await bot.deleteMessage(userId, userProfitMessageId[userId]);
        } catch (error) {}
        delete userProfitMessageId[userId];
      }
      await sendMessageWithRetry(chatId, `⏹️ 𝐒𝐭𝐨𝐩𝐩𝐢𝐧𝐠 𝐁𝐨𝐭...`);
    }
    // BET PLACE SETTINGS MENU
    else if (rawText.trim() === "🎮 𝐓𝐑𝐗" || rawText.trim() === "⚡ 𝐖𝐈𝐍𝐆𝐎 𝟑𝟎𝐒" || 
             rawText.trim() === "⏰ 𝐖𝐈𝐍𝐆𝐎 𝟏𝐌𝐈𝐍" || rawText.trim() === "🕒 𝐖𝐈𝐍𝐆𝐎 𝟑𝐌𝐈𝐍" || 
             rawText.trim() === "⌛ 𝐖𝐈𝐍𝐆𝐎 𝟓𝐌𝐈𝐍") {
      let gameType = "TRX";
      if (rawText.includes("𝟑𝟎𝐒")) gameType = "WINGO30S";
      else if (rawText.includes("𝟏𝐌𝐈𝐍")) gameType = "WINGO1MIN";
      else if (rawText.includes("𝟑𝐌𝐈𝐍")) gameType = "WINGO3MIN";
      else if (rawText.includes("𝟓𝐌𝐈𝐍")) gameType = "WINGO5MIN";
      userSettings[userId].game_type = gameType;
      await sendMessageWithRetry(chatId, `✅ 𝐆𝐚𝐦𝐞 𝐓𝐲𝐩𝐞 𝐬𝐞𝐭 𝐭𝐨: ${gameType}`, makeBetPlaceSettingsKeyboard());
    }
    else if (rawText.trim() === "📈 𝐀𝐍𝐓𝐈-𝐌𝐀𝐑𝐓𝐈𝐍𝐆𝐀𝐋𝐄" || 
             rawText.trim() === "📉 𝐌𝐀𝐑𝐓𝐈𝐍𝐆𝐀𝐋𝐄" || 
             rawText.trim() === "⚖️ 𝐃'𝐀𝐋𝐄𝐌𝐁𝐄𝐑𝐓") {
      let strategy = "Martingale";
      if (rawText.includes("𝐀𝐍𝐓𝐈")) strategy = "Anti-Martingale";
      else if (rawText.includes("𝐃'𝐀𝐋𝐄𝐌𝐁𝐄𝐑𝐓")) strategy = "D'Alembert";
      userSettings[userId].betting_strategy = strategy;
      await sendMessageWithRetry(chatId, `✅ 𝐁𝐞𝐭𝐭𝐢𝐧𝐠 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐬𝐞𝐭 𝐭𝐨: ${strategy}`, makeBetPlaceSettingsKeyboard());
    }
    else if (rawText.trim() === "🔙 𝐁𝐄𝐓 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒") {
      await sendMessageWithRetry(chatId, "🔙 𝐑𝐞𝐭𝐮𝐫𝐧𝐢𝐧𝐠 𝐭𝐨 𝐁𝐞𝐭 𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬...", makeBetPlaceSettingsKeyboard());
    }
    // RISK CONTROL MENU
    else if (rawText.trim() === "🎯 𝐏𝐑𝐎𝐅𝐈𝐓 𝐓𝐀𝐑𝐆𝐄𝐓") {
      userState[userId] = { state: "INPUT_PROFIT_TARGET" };
      await sendMessageWithRetry(chatId, `🎯 𝐒𝐞𝐭 𝐏𝐫𝐨𝐟𝐢𝐭 𝐓𝐚𝐫𝐠𝐞𝐭\n\n𝐄𝐧𝐭𝐞𝐫 𝐭𝐚𝐫𝐠𝐞𝐭 𝐩𝐫𝐨𝐟𝐢𝐭 𝐚𝐦𝐨𝐮𝐧𝐭 𝐢𝐧 𝐊𝐬:\n\n5000`, makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "🛑 𝐒𝐓𝐎𝐏 𝐋𝐎𝐒𝐒") {
      userState[userId] = { state: "INPUT_STOP_LIMIT" };
      await sendMessageWithRetry(chatId, `🛑 𝐒𝐞𝐭 𝐒𝐭𝐨𝐩 𝐋𝐨𝐬𝐬 𝐀𝐦𝐨𝐮𝐧𝐭\n\n𝐄𝐧𝐭𝐞𝐫 𝐦𝐚𝐱𝐢𝐦𝐮𝐦 𝐥𝐨𝐬𝐬 𝐚𝐦𝐨𝐮𝐧𝐭 𝐢𝐧 𝐊𝐬:\n\n5000`, makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "🎢 𝐄𝐍𝐓𝐑𝐘 𝐋𝐀𝐘𝐄𝐑") {
      await sendMessageWithRetry(chatId, "🎢 𝐒𝐞𝐥𝐞𝐜𝐭 𝐄𝐧𝐭𝐫𝐲 𝐋𝐚𝐲𝐞𝐫:", makeEntryLayerKeyboard());
    }
    else if (rawText.trim() === "💥 𝐁𝐄𝐓 𝐒𝐋") {
      await sendMessageWithRetry(chatId, "💥 𝐒𝐞𝐥𝐞𝐜𝐭 𝐒𝐋 (𝐒𝐭𝐨𝐩 𝐋𝐨𝐬𝐬) 𝐥𝐢𝐦𝐢𝐭:", makeNumberPadKeyboard("sl_limit", "𝐒𝐋 𝐋𝐢𝐦𝐢𝐭"));
    }
    else if (rawText.trim() === "📚 𝐒𝐓𝐑𝐀𝐓𝐄𝐆𝐘") {
      await sendMessageWithRetry(chatId, "📚 𝐂𝐡𝐨𝐨𝐬𝐞 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲:", makeRiskControlStrategyKeyboard());
    }
    else if (rawText.trim() === "⏰ 𝐓𝐈𝐌𝐄 𝐑𝐀𝐍𝐆𝐄") {
      await sendMessageWithRetry(chatId, "⏰ 𝐓𝐢𝐦𝐞 𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬 𝐌𝐞𝐧𝐮", makeTimeSetKeyboard());
    }
    else if (rawText.trim() === "🔙 𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔") {
      await sendMessageWithRetry(chatId, "🔙 𝐑𝐞𝐭𝐮𝐫𝐧𝐢𝐧𝐠 𝐭𝐨 𝐌𝐚𝐢𝐧 𝐌𝐞𝐧𝐮...", makeMainKeyboard(true, userId));
    }
    // STRATEGY SELECTION
    else if (rawText.trim() === "🔥 𝐎𝐏 𝐏𝐀𝐓𝐓𝐄𝐑𝐍 (𝐓𝐑𝐗)") {
      userSettings[userId].strategy = "OP_PATTERN_TRX";
      userSettings[userId].pattern = "BSBSBBSSBBBSSSBSBS";
      userSettings[userId].pattern_index = 0;
      userSettings[userId].op_pattern_index = 0;
      await sendMessageWithRetry(chatId, `✅ 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐬𝐞𝐭 𝐭𝐨: 🔥 𝐎𝐏 𝐏𝐀𝐓𝐓𝐄𝐑𝐍 (𝐓𝐑𝐗)`, makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "🎲 𝐂𝐔𝐒𝐓𝐎𝐌 𝐃𝐈𝐆𝐈𝐓") {
      userState[userId] = { state: "INPUT_CUSTOM_DIGIT_MAP" };
      await sendMessageWithRetry(chatId, `🎲 𝐂𝐔𝐒𝐓𝐎𝐌 𝐃𝐈𝐆𝐈𝐓 𝐌𝐀𝐏𝐏𝐈𝐍𝐆\n\n𝐄𝐧𝐭𝐞𝐫 𝐲𝐨𝐮𝐫 𝐝𝐢𝐠𝐢𝐭 𝐦𝐚𝐩𝐩𝐢𝐧𝐠:\n\n0=B\n1=S\n2=S\n3=B\n4=B\n5=S\n6=S\n7=B\n8=B\n9=S\n\n🟢 B = 𝐁𝐢𝐠, 🔴 S = 𝐒𝐦𝐚𝐥𝐥`, makeRiskControlStrategyKeyboard());
    }
    else if (rawText.trim() === "🐼 𝐏𝐀𝐍𝐃𝐀 (𝟑𝟎𝐬)") {
      userSettings[userId].strategy = "PANDA_30S";
      if (Object.keys(pandaPatterns).length === 0) await loadPandaPatterns();
      const patternCount = Object.keys(pandaPatterns).length;
      await sendMessageWithRetry(chatId, `✅ 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐬𝐞𝐭 𝐭𝐨: 🐼 𝐏𝐀𝐍𝐃𝐀 (𝟑𝟎𝐬)\n\n📊 𝐏𝐚𝐭𝐭𝐞𝐫𝐧𝐬 𝐋𝐨𝐚𝐝𝐞𝐝: ${patternCount}`, makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "🛰 𝐓𝐑𝐄𝐍𝐃 𝐅𝐎𝐋𝐋𝐎𝐖") {
      userSettings[userId].strategy = "TREND_FOLLOW";
      await sendMessageWithRetry(chatId, `✅ 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐬𝐞𝐭 𝐭𝐨: 🛰 𝐓𝐑𝐄𝐍𝐃 𝐅𝐎𝐋𝐋𝐎𝐖`, makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "✨ 𝐒𝐇𝐈𝐍𝐄") {
      userSettings[userId].strategy = "SHINE";
      userSettings[userId].consecutive_results = 0;
      userSettings[userId].last_result = null;
      await sendMessageWithRetry(chatId, `✅ 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐬𝐞𝐭 𝐭𝐨: ✨ 𝐒𝐇𝐈𝐍𝐄`, makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "🔗 𝐀𝐋𝐈𝐍𝐊𝐀𝐑") {
      userSettings[userId].strategy = "ALINKAR";
      userSettings[userId].pattern_index = 0;
      await sendMessageWithRetry(chatId, `✅ 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐬𝐞𝐭 𝐭𝐨: 🔗 𝐀𝐋𝐈𝐍𝐊𝐀𝐑`, makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "🪐 𝐏𝐋𝐔𝐓𝐎") {
      userSettings[userId].strategy = "PLUTO";
      userSettings[userId].current_pattern = null;
      userSettings[userId].pattern_index = 0;
      userSettings[userId].pluto_won = true;
      await sendMessageWithRetry(chatId, `✅ 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐬𝐞𝐭 𝐭𝐨: 🪐 𝐏𝐋𝐔𝐓𝐎`, makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "💭 𝐃𝐑𝐄𝐀𝐌") {
      userSettings[userId].strategy = "DREAM";
      if (!userLast10Results[userId]) userLast10Results[userId] = [];
      if (!userAiRoundCount[userId]) userAiRoundCount[userId] = 0;
      await sendMessageWithRetry(chatId, `✅ 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐬𝐞𝐭 𝐭𝐨: 💭 𝐃𝐑𝐄𝐀𝐌`, makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "🏄 𝐃𝐑𝐄𝐀𝐌 𝐕𝟐") {
      userSettings[userId].strategy = "DREAM_V2";
      if (!userLast10Results[userId]) userLast10Results[userId] = [];
      if (!userAiRoundCount[userId]) userAiRoundCount[userId] = 0;
      await sendMessageWithRetry(chatId, `✅ 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐬𝐞𝐭 𝐭𝐨: 🏄 𝐃𝐑𝐄𝐀𝐌 𝐕𝟐`, makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "🎯 𝐒𝐍𝐈𝐏𝐄𝐑 𝐕𝟏") {
      userSettings[userId].strategy = "SNIPER_V1";
      await sendMessageWithRetry(chatId, `✅ 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐬𝐞𝐭 𝐭𝐨: 🎯 𝐒𝐍𝐈𝐏𝐄𝐑 𝐕𝟏`, makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "⚡ 𝐄𝐈 𝐏𝐔 𝟑𝟎𝐒") {
      userSettings[userId].strategy = "EI_PU_30S";
      await sendMessageWithRetry(chatId, `✅ 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐬𝐞𝐭 𝐭𝐨: ⚡ 𝐄𝐈 𝐏𝐔 𝟑𝟎𝐒`, makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "🤖 𝐒𝐄𝐑𝐕𝐄𝐑 𝟏") {
      userSettings[userId].strategy = "SERVER_1";
      userAILast10Results[userId] = [];
      userAiRoundCount[userId] = 0;
      await sendMessageWithRetry(chatId, `✅ 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐬𝐞𝐭 𝐭𝐨: 🤖 𝐒𝐄𝐑𝐕𝐄𝐑 𝟏`, makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "🚖 𝐉𝐎𝐇𝐍𝐒𝐎𝐍") {
      userSettings[userId].strategy = "JOHNSON";
      delete userSettings[userId].jhson_state;
      await sendMessageWithRetry(chatId, `✅ 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐲 𝐬𝐞𝐭 𝐭𝐨: 🚖 𝐉𝐎𝐇𝐍𝐒𝐎𝐍`, makeRiskControlKeyboard());
    }
    else if (rawText.trim() === "🔙 𝐑𝐈𝐒𝐊 𝐂𝐎𝐍𝐓𝐑𝐎𝐋") {
      await sendMessageWithRetry(chatId, "🔙 𝐑𝐞𝐭𝐮𝐫𝐧𝐢𝐧𝐠 𝐭𝐨 𝐑𝐢𝐬𝐤 𝐂𝐨𝐧𝐭𝐫𝐨𝐥...", makeRiskControlKeyboard());
    }
    else {
      await sendMessageWithRetry(chatId, `🤔 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐍𝐨𝐭 𝐑𝐞𝐜𝐨𝐠𝐧𝐢𝐳𝐞𝐝\n\n𝐏𝐥𝐞𝐚𝐬𝐞 𝐮𝐬𝐞 𝐭𝐡𝐞 𝐦𝐞𝐧𝐮 𝐛𝐮𝐭𝐭𝐨𝐧𝐬 𝐛𝐞𝐥𝐨𝐰:`, makeMainKeyboard(true, userId));
    }
  } catch (error) {
    log('ERROR', `🧨 ERROR handling input for user ${userId}: ${error.message}`);
    await sendMessageWithRetry(chatId, `❌ 𝐄𝐫𝐫𝐨𝐫: ${error.message}`, makeMainKeyboard(true, userId));
  }
});

// ███████████████████████████████████████
// ███  INITIALIZATION - ULTRA EDITION ███
// ███████████████████████████████████████

const init = async () => {
  try {
    console.clear();
    
    // Load all configurations
    try {
      await fs.access(SYSTEM_MODE_FILE);
    } catch {
      await saveSystemMode('FREE');
    }
    try {
      await fs.access(BANNED_USERS_FILE);
    } catch {
      await saveBannedUsers();
    }
    try {
      await fs.access(TIME_SETTINGS_FILE);
    } catch {
      await saveTimeSettings();
    }
    try {
      await fs.access(CHANNEL_CONFIG_FILE);
    } catch {
      await saveChannelConfig();
    }
    
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
    
    // Auto-refresh Panda patterns every 30 minutes
    setInterval(() => {
      loadPandaPatterns();
    }, 30 * 60 * 1000);
    
    // ULTRA BOOT SCREEN
    console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║     ███╗   ███╗██████╗ ██╗   ██╗██╗████████╗██╗     ██████╗ ███████╗       ║
║     ████╗ ████║██╔══██╗██║   ██║██║╚══██╔══╝██║     ██╔══██╗██╔════╝       ║
║     ██╔████╔██║██████╔╝██║   ██║██║   ██║   ██║     ██████╔╝█████╗         ║
║     ██║╚██╔╝██║██╔══██╗██║   ██║██║   ██║   ██║     ██╔══██╗██╔══╝         ║
║     ██║ ╚═╝ ██║██║  ██║╚██████╔╝██║   ██║   ███████╗██████╔╝███████╗       ║
║     ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝   ╚═╝   ╚══════╝╚═════╝ ╚══════╝       ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║     🎰  𝐌𝐔𝐋𝐓𝐈-𝐏𝐋𝐀𝐓𝐅𝐎𝐑𝐌 𝐀𝐔𝐓𝐎 𝐁𝐄𝐓 𝐁𝐎𝐓  🎰                              ║
║                  𝐔𝐋𝐓𝐑𝐀 𝐄𝐃𝐈𝐓𝐈𝐎𝐍 𝐯𝟒.𝟎                                       ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║     🧬 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐃 𝐁𝐘: @GOD_OuWan                                          ║
║     💬 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 𝐆𝐑𝐎𝐔𝐏: @BettingLabGroup                                  ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║     📊 𝐒𝐘𝐒𝐓𝐄𝐌 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍                                              ║
║     ──────────────────────────────────────────────────────────              ║
║     🎮 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦𝐬: 777 BIGWIN | CK LOTTERY | 6 LOTTERY                    ║
║     🤖 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐢𝐞𝐬: 𝟏𝟐+ 𝐀𝐝𝐯𝐚𝐧𝐜𝐞𝐝 𝐀𝐈 𝐌𝐨𝐝𝐞𝐥𝐬                           ║
║     🛡️ 𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬: 𝐑𝐢𝐬𝐤 𝐌𝐠𝐦𝐭 | 𝐋𝐢𝐯𝐞 𝐓𝐫𝐚𝐜𝐤 | 𝐀𝐮𝐭𝐨 𝐑𝐞𝐭𝐫𝐲             ║
║     🔋 𝐒𝐭𝐚𝐭𝐮𝐬: 𝐑𝐔𝐍𝐍𝐈𝐍𝐆                                                  ║
║     ⚡ 𝐌𝐨𝐝𝐞: ${SYSTEM_MODE === 'PREMIUM' ? '🔒 𝐏𝐑𝐄𝐌𝐈𝐔𝐌' : '🔓 𝐅𝐑𝐄𝐄'}                                                  ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
    `);
    
    log('INFO', '🤖 ULTRA EDITION BOT INITIALIZED SUCCESSFULLY');
    log('INFO', `📊 System Mode: ${SYSTEM_MODE}`);
    log('INFO', `📢 Required Channels: ${requiredChannels.length}`);
    log('INFO', `🐼 Panda Patterns: ${Object.keys(pandaPatterns).length}`);
    log('INFO', `👑 Admin ID: ${ADMIN_ID}`);
    
  } catch (error) {
    log('ERROR', `❌ Failed to initialize bot: ${error.message}`);
    console.error('❌ Bot initialization failed:', error);
    process.exit(1);
  }
};

// Handle process termination
process.on('SIGINT', () => {
  log('INFO', '⏹️ Bot shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('INFO', '⏹️ Bot terminating...');
  process.exit(0);
});

// Start the bot
init().catch(error => {
  log('ERROR', `❌ Failed to start bot: ${error.message}`);
  console.error('❌ Bot startup failed:', error);
  process.exit(1);
});
