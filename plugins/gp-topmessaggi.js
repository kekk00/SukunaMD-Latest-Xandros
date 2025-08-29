/* file originale di github.com/chatunitycenter
deoffuscato e modificato da Kekko per KekkoMD. github.com/giugiu06
*/

import fetch from 'node-fetch';
import fs from 'fs';

// Funzione per ordinare array (per proprietà o numeri)
function sort(key, asc = true) {
  if (key) {
    return (a, b) => asc ? a[key] - b[key] : b[key] - a[key];
  }
  return (a, b) => asc ? a - b : b - a;
}

// Funzione per restituire medaglia in base alla posizione
function getMedaglia(pos) {
  if (pos === 1) return '🥇';
  if (pos === 2) return '🥈';
  if (pos === 3) return '🥉';
  return '🏅';
}

const handler = async (m, { conn, args, participants }) => {
  // File e cartelle necessari
  const requiredFiles = ['./plugins/OWNER_file.js', './termini.jpeg', './CODE_OF_CONDUCT.md', './bal.png'];
  const missing = requiredFiles.find(file => !fs.existsSync(file));
  if (missing) {
    return await conn.reply(m.chat, '❗ Per usare questo comando usa la base di chatunity', m);
  }

  if (!m.isGroup) {
    return await m.reply('Questo comando funziona solo nei gruppi!');
  }

  // Numero massimo di utenti da mostrare, default 20
  let maxUsers = 10;
  if (args[0]) {
    const parsed = parseInt(args[0]);
    if (!isNaN(parsed) && parsed >= 5 && parsed <= 50) {
      maxUsers = parsed;
    }
  }

  // Prendi i dati utenti (esempio da db globale)
  // Assumiamo che global.db.data.users sia il database con messaggi etc.
  // Filter partecipanti del gruppo escludendo il bot
  const usersData = participants
    .filter(p => p.id !== conn.user.jid)
    .map((p) => {
      const userData = global.db.data.users[p.id] || {};
      return {
        jid: p.id,
        messaggi: userData.messaggi || 0,
        userData
      };
    });

  // Ordina decrescente per messaggi
  const sortedUsers = usersData.sort(sort('messaggi', false));
  const topUsers = sortedUsers.slice(0, maxUsers);

  // Prepara le cards da inviare
  const cards = await Promise.all(topUsers.map(async ({ jid, messaggi, userData }, index) => {
    let name;
    try {
      // getName può essere async e può non avere .catch direttamente, quindi usiamo await + try/catch
      name = await conn.getName(jid);
    } catch {
      // fallback al numero senza dominio
      name = jid.split('@')[0];
    }

    // Ruolo nel gruppo (opzionale, se hai metadata gruppo)
    let role = '';
    try {
      const metadata = await conn.groupMetadata(m.chat);
      const participant = metadata.participants.find(p => p.id === jid);
      if (participant) {
        if (participant.admin === 'superadmin') role = 'Founder ⚜';
        else if (participant.admin === 'admin') role = 'Admin 👑';
        else role = 'Membro 🤍';
      }
    } catch {
      role = '';
    }

    // Medaglia
    const medal = getMedaglia(index + 1);

    // Genere (opzionale)
    let genderEmoji = '';
    if (userData.genere === 'maschio') genderEmoji = '🚹';
    else if (userData.genere === 'femmina') genderEmoji = '🚺';

    // Instagram link (se presente)
    const insta = userData.instagram ? `🌐 instagram.com/${userData.instagram}` : '🌐 Instagram: non impostato';

    // Testo corpo card
    const body = `${medal} ${name}\n📝 Messaggi: ${messaggi}\n🟣 Ruolo: ${role}\n${insta}\n🚻 Genere: ${genderEmoji}`;

    // Foto profilo, fallback a immagine locale se no foto
    let profilePicUrl;
    try {
      profilePicUrl = await conn.profilePictureUrl(jid);
    } catch {
      profilePicUrl = 'https://telegra.ph/file/22b3e3d2a7b9f346e21b3.png'; // fallback immagine
    }

    return {
      image: { url: profilePicUrl },
      title: `#${index + 1}`,
      body,
      footer: `© ChatUnity x KekkoMD`
    };
  }));

  // Invia messaggio con cards
  await conn.sendMessage(m.chat, {
    title: `🏆 Top ${maxUsers} utenti per messaggi 🏆`,
    text: 'Guarda chi spacca di più nel gruppo! 🏅',
    footer: 'Usa .info @menzione per più info su ciascun utente',
    cards,
  }, { quoted: m });
};

handler.command = ['topmessaggi', 'topmsg'];
handler.admin = false;
handler.group = true;

export default handler;