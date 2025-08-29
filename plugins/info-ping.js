import fetch from 'node-fetch';
import Jimp from 'jimp';

let handler = async (m, { conn }) => {
  const start = performance.now();
  const end = performance.now();
  const speed = (end - start).toFixed(3);
  const latency = Date.now() - start;

  const uptimeSeconds = process.uptime();
  const uptime = formatUptime(uptimeSeconds);

  // Conta utenti registrati (se esiste db)
  const registeredUsers = Object.values(global.db?.data?.users || {}).length;

  // --- Ottenere immagine del gruppo o fallback ---
  let imageBuffer;
  try {
    if (m.isGroup) {
      // Prova a scaricare la foto del gruppo
      const groupPicUrl = await conn.profilePictureUrl(m.chat, 'image');
      const image = await Jimp.read(groupPicUrl);
      image.cover(1280, 720); // forza formato 16:9
      imageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    }
  } catch (e) {
    // Se fallisce, usa immagine del bot
    const botPicUrl = await conn.profilePictureUrl(conn.user.jid, 'image');
    const image = await Jimp.read(botPicUrl);
    image.cover(1280, 720); // formato 16:9
    imageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
  }

  const textMsg = `
╭───『 ⚡ \`ℙ𝕀ℕ𝔾\` 』
│
│ 『 🚀 』 \`Uptime:\` ${uptime}
│ 『 📡 』 \`Ping:\` ${speed} \`ms\`
│ 『 👥 』 \`Utenti:\` ${registeredUsers}
╰───────────────────⟢
`.trim();

  // Invia immagine con testo e bottoni
  await conn.sendMessage(m.chat, {
    image: imageBuffer,
    caption: textMsg,
    buttons: [
      { buttonId: '.ping', buttonText: { displayText: '🔄 𝐑𝐢𝐩𝐫𝐨𝐯𝐚' }, type: 1 },
      { buttonId: '.assistenzakekko', buttonText: { displayText: '⚙️ 𝐀𝐬𝐬𝐢𝐬𝐭𝐞𝐧𝐳𝐚' }, type: 1 },
      { buttonId: '.ds', buttonText: { displayText: '🗑 𝐒𝐯𝐮𝐨𝐭𝐚 𝐒𝐞𝐬𝐬𝐢𝐨𝐧𝐢' }, type: 1 },
      { buttonId: '.databeis', buttonText: { displayText: '📊 𝐃𝐚𝐭𝐚𝐛𝐚𝐬𝐞' }, type: 1 } 
    ],
    headerType: 4
  }, { quoted: m });
};

// Funzione per formattare uptime
function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return [days ? `${days}d` : '', hours ? `${hours}h` : '', minutes ? `${minutes}m` : '', secs ? `${secs}s` : '']
    .filter(Boolean)
    .join(' ');
}

handler.command = ['ping'];
handler.register = true;

export default handler;