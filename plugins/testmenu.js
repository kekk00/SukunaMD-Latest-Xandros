import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  const listMessage = {
    listMessage: {
      title: '≡ Menu principale',
      description: '✨ Seleziona un\'opzione',
      buttonText: '📂 Apri lista',
      footerText: '© KekkoBot',
      sections: [
        {
          title: '👤 Utenti',
          rows: [
            { title: 'ℹ️ Info', rowId: '.info' },
            { title: '👑 Proprietario', rowId: '.proprietario' }
          ]
        },
        {
          title: '📂 Menu',
          rows: [
            { title: '📜 Menu', rowId: '.menu' },
            { title: '👥 Gruppo', rowId: '.gruppo' },
            { title: '👑 Owner', rowId: '.owner' }
          ]
        },
        {
          title: '🤖 Bot',
          rows: [
            { title: '📡 Ping', rowId: '.ping' }
          ]
        }
      ]
    }
  };

  // Questo genera un messaggio compatibile con WhatsApp
  const waMessage = generateWAMessageFromContent(
    m.chat,
    { listMessage },
    { userJid: conn.user.jid }
  );

  await conn.relayMessage(
    m.chat,
    waMessage.message,
    { messageId: waMessage.key.id }
  );
};

handler.command = ['menu', 'listmenu'];
export default handler;