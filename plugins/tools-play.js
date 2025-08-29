// Contenuto di plugins/play.js (invariato)
import yts from 'yt-search';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `Quale canzone vuoi cercare? Esempio: *${usedPrefix}${command} Despacito*`, m);
  }

  await conn.reply(m.chat, `🔎 𝐒𝐭𝐨 𝐞𝐟𝐟𝐞𝐭𝐭𝐮𝐚𝐧𝐝𝐨 𝐥𝐚 𝐫𝐢𝐜𝐞𝐫𝐜𝐚 𝐝𝐢: "*${text}*" 𝐬𝐮 𝐘𝐨𝐮𝐓𝐮𝐛𝐞...`, m);

  try {
    const res = await yts(text);
    const video = res.videos[0];
    if (!video) {
      return conn.reply(m.chat, `❌ Nessun risultato trovato per *"${text}"*.`, m);
    }

    const { title, url, thumbnail, timestamp: duration, ago: uploadedAt, author } = video;

    let caption = `🎵 𝐁𝐫𝐚𝐧𝐨 𝐓𝐫𝐨𝐯𝐚𝐭𝐨:\n\n`;
    caption += `🎶 𝐓𝐢𝐭𝐨𝐥𝐨: ${title}\n`;
    caption += `👤 𝐀𝐫𝐭𝐢𝐬𝐭𝐚: ${author.name || author.name}\n`;
    caption += `*🕒 𝐃𝐮𝐫𝐚𝐭𝐚:* ${duration || 'N/D'}\n`;
    caption += `*📅 𝐏𝐮𝐛𝐛𝐥𝐢𝐜𝐚𝐭𝐨:* ${uploadedAt || 'N/D'}\n\n`;
    caption += `_𝐋𝐢𝐧𝐤 𝐲𝐨𝐮𝐭𝐮𝐛𝐞:_\n🔗 ${url}`; 

    const buttons = [
        { buttonId: `${usedPrefix}play1 ${title}`, buttonText: { displayText: "🎧 𝐀𝐮𝐝𝐢𝐨" }, type: 1 }, // Passiamo l'URL direttamente
        { buttonId: `${usedPrefix}play2 ${title}`, buttonText: { displayText: "📺 𝐕𝐢𝐝𝐞𝐨" }, type: 1 },
        { buttonId: `${usedPrefix}testo ${title} - ${author.name}`, buttonText: { displayText: "✍️ Testo" }, type: 1 } // Passiamo l'URL direttamente
    ];

    await conn.sendMessage(
      m.chat,
      {
        image: { url: thumbnail }, 
        caption: caption,
        footer: '𝐒𝐜𝐞𝐠𝐥𝐢 𝐮𝐧 𝐟𝐨𝐫𝐦𝐚𝐭𝐨 𝐩𝐞𝐫 𝐥𝐚 𝐜𝐨𝐧𝐯𝐞𝐫𝐬𝐢𝐨𝐧𝐞:',
        buttons: buttons,
        viewOnce: true, 
        headerType: 4 
      },
      { quoted: m }
    );

  } catch (e) {
    console.error("[ERRORE PLAY]", e);
    conn.reply(m.chat, '❌ Si è verificato un errore, riprova più tardi.', m);
  }
};

handler.command = ['play', 'ytplay'];
handler.tags = ['media'];
handler.help = ['play <titolo>'];

export default handler;