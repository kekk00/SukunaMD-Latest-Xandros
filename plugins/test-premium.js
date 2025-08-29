let handler = async (m, { conn }) => {
  if (m.message?.buttonsResponseMessage?.selectedButtonId) {
    const selectedButtonId = m.message.buttonsResponseMessage.selectedButtonId;
    if (selectedButtonId === '.menu') {
      // Apri il menu principale
      // return conn.sendMessage(m.chat, { text: 'Menu principale' }, { quoted: m });
      // oppure puoi richiamare il file menu-principale.js
      return require('menu-principale')(m, { conn });
    }
    if (selectedButtonId === 'Ping⚡️') {
      // Non fare niente
      return;
    }
    if (selectedButtonId === 'Infobot✍️') {
      // Non fare niente
      return;
    }
  }

  const text = `🌐 Test Premium`;
  return conn.sendMessage(m.chat, {
    text,
    footer: 'sto bottone non fa nulla',
    buttons: [
      { buttonId: `.sesso`, buttonText: { displayText: "🍥" }, type: 1 },
    ],
    headerType: 1,
    viewOnce: true
  }, { quoted: m });
};

handler.command = ['test'];
handler.tags = ['gruppo'];
handler.help = ['test'];
handler.group = true;
handler.limit = true;

export default handler;