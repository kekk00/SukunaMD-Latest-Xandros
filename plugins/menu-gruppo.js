const sections = [
  {
    title: "🎵 𝐌𝐮𝐬𝐢𝐜𝐚 & 𝐀𝐮𝐝𝐢𝐨",
    commands: [
      "🎶 .play (canzone)",
      "📜 .playlist",
      "🔍 .ytsearch",
      "🎧 .shazam (audio)",
      "🎼 .tomp3 (video)",
      "📝 .lyrics (artista-titolo)"
    ]
  },
  {
    title: "ℹ️ 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐳𝐢𝐨𝐧𝐢 & 𝐔𝐭𝐢𝐥𝐢𝐭𝐚̀",
    commands: [
      "🌦️ .meteo (città)",
      "⏰ .orario (città)",
      "🌐 .traduci (testo)",
      "✍️ .contaparole (testo)",
      "🆔 .id (gruppo)",
      "📂 .gitclone (repo)",
      "👤 .info [@utente]",
      "📜 .regole",
      "📚 .wikipedia (argomento)",
      "🔎 .checkscam (check sito)",
      "📊 .dashboard",
      "🖼️ .cercaimmagine",
      "💻 .script",
      "🛡️ .offusca",
      "📰 .news",
      "📢 .notiziario"
    ]
  },
  {
    title: "🖌️ 𝐈𝐦𝐦𝐚𝐠𝐢𝐧𝐢 & 𝐌𝐨𝐝𝐢𝐟𝐢𝐜𝐚",
    commands: [
      "✨ .sticker (foto a sticker)",
      "🖼️ .png (sticker a foto)",
      "🔍 .hd (migliora qualità foto)",
      "🚫 .rimuovisfondo (foto)",
      "🕵️‍♂️ .rivela (foto nascosta)",
      "🔨 .bonk (meme)",
      "📷 .toimg (da sticker)",
      "📖 .leggi (foto)",
      "🌫️ .blur (sfoca immagine)",
      "📌 .pinterest (in arrivo)",
      "💌 .hornycard [@utente]",
      "🤪 .stupido/a @",
      "⚡ .emojimix",
      "🚨 .wanted @",
      "🤡 .scherzo @",
      "📱 .nokia @",
      "🚔 .carcere @",
      "📢 .ads @"
    ]
  },
  {
    title: "🦊 𝐏𝐨𝐤𝐞́𝐦𝐨𝐧",
    commands: [
      "📦 .apripokemon",
      "🛒 .buypokemon",
      "🏆 .classificapokemon",
      "🎁 .pacchetti",
      "⚔️ .combatti",
      "✨ .evolvi",
      "🌑 .darknessinfo",
      "🎒 .inventario",
      "🎯 .pity",
      "🔄 .scambia"
    ]
  },
  {
    title: "💀 𝐆𝐚𝐧𝐠 𝐒𝐲𝐬𝐭𝐞𝐦",
    commands: [
      "🏗️ .creagang",
      "ℹ️ .infogang",
      "🚪 .abbandonagang",
      "📩 .invitogang @",
      "⛔ .caccialogang @"
    ]
  },
  {
    title: "🎲 𝐆𝐢𝐨𝐜𝐡𝐢 & 𝐂𝐚𝐬𝐢𝐧𝐨̀",
    commands: [
      "❌⭕ .tris",
      "🎲 .dado",
      "🎰 .slot",
      "🏛️ .casinò",
      "💰 .scommessa (quantità)",
      "🎡 .roulette",
      "🪙 .moneta (testa o croce)",
      "🧮 .mate (problema mate)",
      "✂️ .scf (sasso carta forbici)",
      "📖 .pokedex (info Pokémon)",
      "🚩 .bandiera",
      "🚗 .ic",
      "🏎️ .auto",
      "⚽ .fut",
      "📜 .missioni"
    ]
  },
  {
    title: "💰 𝐄𝐜𝐨𝐧𝐨𝐦𝐢𝐚 & 𝐂𝐥𝐚𝐬𝐬𝐢𝐟𝐢𝐜𝐡𝐞",
    commands: [
      "👛 .portafoglio (saldo)",
      "🏦 .banca",
      "📅 .daily",
      "🏆 .classifica (top utenti)",
      "🎁 .donauc",
      "🛒 .compra (acquista UC)",
      "🕵️‍♂️ .ruba @utente",
      "💳 .ritira (UC dalla banca)",
      "⛏️ .mina (guadagna XP)",
      "⭐ .xp",
      "🎯 .donaxp @utente",
      "🦹‍♂️ .rubaxp @utente"
    ]
  },
  {
    title: "💬 𝐈𝐧𝐭𝐞𝐫𝐚𝐳𝐢𝐨𝐧𝐢 𝐒𝐨𝐜𝐢𝐚𝐥𝐢",
    commands: [
      "💍 .sposami (proposta)",
      "💔 .divorzia (fine relazione)",
      "❤️ .amore @utente (affinità)",
      "💋 .bacia @utente",
      "😡 .odio @utente",
      "😏 .rizz @utente (fascino)",
      "🤫 .segreto @utente",
      "🔪 .minaccia @utente",
      "🔥 .zizzania @utente (crea litigi)",
      "🎲 .obbligo (obb o v)",
      "👉 .ditalino @",
      "✊ .sega @",
      "🍑 .scopa @",
      "😈 .insulta @",
      "👰 .sposa @",
      "🤝 .amicizia/listamici @"
    ]
  },
  {
    title: "📏 𝐐𝐮𝐚𝐧𝐭𝐨 𝐞̀?",
    commands: [
      "🌈 .gay @",
      "💖 .lesbica @",
      "🤪 .ritardato/a @",
      "⬇️ .down @",
      "♿ .disabile @",
      "🙃 .mongoloide @",
      "🖤 .negro @",
      "🐂 .cornuto @"
    ]
  },
  {
    title: "🧠 𝐓𝐞𝐬𝐭 𝐏𝐞𝐫𝐬𝐨𝐧𝐚𝐥𝐢𝐭𝐚̀",
    commands: [
      "🍺 .alcolizzato",
      "💊 .drogato",
      "👙 .figa",
      "🍑 .ano",
      "📋 .personalita",
      "♌ .zodiaco",
      "🥷 .nomeninja",
      "🕵️‍♀️ .infame",
      "🙏 .topbestemmie"
    ]
  }
];

function formatCommands(commands) {
  return commands.map(cmd => `• 𝐁𝐨𝐥𝐝 ${cmd}`).join('\n');
}

const handler = async (m, { conn }) => {
  const botName = global.db.data.nomedelbot || '𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲';

  let groupPicUrl = null;
  try { groupPicUrl = await conn.profilePictureUrl(m.chat); } catch {}
  let botPicUrl = null;
  try { botPicUrl = await conn.profilePictureUrl(conn.user.jid); } catch {}

  const imageToUse = groupPicUrl || botPicUrl || 'https://i.ibb.co/pcjHVvx/Whats-App-Image-2025-04-12-at-00-50-15.jpg';

  const cards = sections.map((section, i) => ({
    image: { url: imageToUse },
    title: section.title,
    body: section.commands.map(c => `• ${c}`).join('\n'),
    footer: `© ${botName} - 𝐒𝐞𝐳𝐢𝐨𝐧𝐞 ${i + 1} 𝐝𝐢 ${sections.length}`
  }));

  await conn.sendMessage(m.chat, {
    text: `📋 𝐌𝐞𝐧𝐮̀ 𝐆𝐫𝐮𝐩𝐩𝐨 - ${botName}\n\n𝐒𝐜𝐞𝐠𝐥𝐢 𝐥𝐚 𝐬𝐞𝐳𝐢𝐨𝐧𝐞 𝐝𝐞𝐥 𝐦𝐞𝐧𝐮̀ 𝐜𝐡𝐞 𝐭𝐢 𝐢𝐧𝐭𝐞𝐫𝐞𝐬𝐬𝐚!`,
    footer: `© ${botName}`,
    title: `𝐌𝐞𝐧𝐮̀ 𝐆𝐫𝐮𝐩𝐩𝐨 - ${botName}`,
    cards,
    headerType: 1
  }, { quoted: m });
};

handler.command = ['menugruppo', 'menu'];
handler.tags = ['menugruppo'];
handler.help = ['menugruppo', 'menu'];

export default handler;