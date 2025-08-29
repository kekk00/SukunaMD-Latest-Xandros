// invia.js
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagePath = path.join(__dirname, 'accessdenied2.png'); // immagine antiprivato

const pending = new Map(); // key: jid -> { to, vis, originalMsg }

const jidUser = (jid) => jid?.split('@')[0]?.split(':')[0] || 'sconosciuto';
const normalizeNumberToJid = (num) => {
  const digits = String(num || '').replace(/[^\d]/g, '');
  if (!digits) throw new Error('Numero non valido');
  return `${digits}@s.whatsapp.net`;
};

const getTextFromMessage = (m) =>
  m.text ||
  m.message?.conversation ||
  m.message?.extendedTextMessage?.text ||
  '';

let handler = async (m, { conn, args, usedPrefix }) => {
  const joined = (args || []).join(' ').trim();
  const parts = joined.split('|').map(s => s.trim());

  let [msgText, numero, vis] = parts;

  if (!numero || !vis) {
    return conn.sendMessage(m.chat, { text: `𝐅𝐨𝐫𝐦𝐚𝐭𝐨 𝐜𝐨𝐫𝐫𝐞𝐭𝐭𝐨:
.invia messaggio | numero | si/no

> N.B: se scrivi 'si' il numero sarà nascosto, in caso contrario sarà mostrato.` });
  }

  const toJid = normalizeNumberToJid(numero);
  const mostra = vis.toLowerCase() === 'si';

  // Caso 1: messaggio già presente
  if (msgText) {
    const mittente = mostra ? jidUser(m.sender) : 'Anonimo';

    await conn.sendMessage(toJid, {
      image: { url: 'https://i.ibb.co/PZMDGcS0/c8756687815f6b0c1ee2a41b6f2c5e99.jpg' },
      caption: `📩 *Nuovo messaggio*\n\nMittente: ${mittente}\nTesto: ${msgText}`,
      footer: '© 𝐒𝐔𝐊𝐔𝐍𝐀⁶⁶⁶',
      buttons: [
        {
          buttonId: `.invia | ${m.sender} | ${mostra ? 'si' : 'no'}`,
          buttonText: { displayText: 'Rispondi' },
          type: 1
        }
      ],
      ...(mostra && { quoted: m }) // quote solo se non anonimo
    });

    return conn.sendMessage(m.chat, { text: '✅ Messaggio inviato!' });
  }

  // Caso 2: messaggio da scrivere
  pending.set(m.sender, { to: toJid, vis: mostra, originalMsg: m });
  await conn.sendMessage(m.chat, { text: '✏️ Scrivi ora il messaggio da inviare.' });
};

// intercetta il testo successivo se siamo in attesa
handler.all = async function (m) {
  const conn = this;
  const stato = pending.get(m.sender);
  const text = getTextFromMessage(m);

  if (stato && text) {
    const mittente = stato.vis ? jidUser(m.sender) : 'Anonimo';

    await conn.sendMessage(stato.to, {
      image: { url : 'https://i.ibb.co/PZMDGcS0/c8756687815f6b0c1ee2a41b6f2c5e99.jpg' },
      caption: `📩 *Risposta privata*\n\nMittente: ${mittente}\nTesto: ${text}`,
      footer: '© 𝐒𝐔𝐊𝐔𝐍𝐀⁶⁶⁶',
      buttons: [
        {
          buttonId: `.invia | ${m.sender} | ${stato.vis ? 'si' : 'no'}`,
          buttonText: { displayText: 'Rispondi' },
          type: 1
        }
      ],
      ...(stato.vis && { quoted: stato.originalMsg }) // quote solo se non anonimo
    });

    pending.delete(m.sender);
    await conn.sendMessage(m.chat, { text: '✅ Risposta inviata!' });
  }
};

handler.command = /^invia$/i;

export default handler;