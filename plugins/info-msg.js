//infomsg di Onix, di Riad
//la perfezione.

import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';

const handler = async (m, { conn }) => {
  try {
    if (m?.buttonId === '.setanni') {
      return conn.sendMessage(m.chat, { text: 'Per impostare la tua età usa il comando .setanni <età>\nPer rimuovere la tua età usa .eliminaanni' }, { quoted: m });
    }

    if (m?.buttonId === '.setig') {
      return conn.sendMessage(m.chat, { text: 'Specifica un nome utente Instagram con .setig <user> oppure usa .delig per rimuoverlo.' }, { quoted: m });
    }

    if (!m.isGroup) {
      return conn.sendMessage(m.chat, { text: "❌ Questo comando può essere usato solo nei gruppi." }, { quoted: m });
    }

    const mention = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : m.sender);
    const who = mention || m.sender;

    // Inizializza i dati dell'utente se non esistono
    if (!global.db.data.users[who]) {
      global.db.data.users[who] = { 
        money: 0, warn: 0, warnlink: 0, 
        muto: false, banned: false, 
        messaggi: 0, blasphemy: 0, 
        blasphemyCounted: 0, 
        command: 0, vittorieSlot: 0, 
        categoria: null, instagram: null, 
        eta: null, genere: null
      };
    }

    const user = global.db.data.users[who];

    // Definisci i ranghi in base ai messaggi
    const ranghi = [
      { soglia: 0, nome: "𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐢𝐚𝐧𝐭𝐞 I 😐" },
      { soglia: 100, nome: "𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐢𝐚𝐧𝐭𝐞 II 😐" },
      { soglia: 250, nome: "𝐑𝐞𝐜𝐥𝐮𝐭𝐚 I 🙂" },
      { soglia: 500, nome: "𝐑𝐞𝐜𝐥𝐮𝐭𝐚 II 🙂" },
      { soglia: 1000, nome: "𝐀𝐯𝐚𝐧𝐳𝐚𝐭𝐨 I 🫡" },
      { soglia: 2000, nome: "𝐀𝐯𝐚𝐧𝐳𝐚𝐭𝐨 II 🫡" },
      { soglia: 3500, nome: "𝐁𝐨𝐦𝐛𝐞𝐫 I 😎" },
      { soglia: 5000, nome: "𝐁𝐨𝐦𝐛𝐞𝐫 II 😎" },
      { soglia: 7000, nome: "𝐏𝐫𝐨 I 😤" },
      { soglia: 10000, nome: "𝐏𝐫𝐨 II 😤" },
      { soglia: 15000, nome: "𝐄́𝐥𝐢𝐭𝐞 I 🤩" },
      { soglia: 20000, nome: "𝐄́𝐥𝐢𝐭𝐞 II 🤩" },
      { soglia: 30000, nome: "𝐌𝐚𝐬𝐭𝐞𝐫 I 💪🏼" },
      { soglia: 40000, nome: "𝐌𝐚𝐬𝐭𝐞𝐫 II 💪🏼" },
      { soglia: 50000, nome: "𝐌𝐢𝐭𝐢𝐜𝐨 I 🔥" },
      { soglia: 70000, nome: "𝐌𝐢𝐭𝐢𝐜𝐨 II 🔥" },
      { soglia: 100000, nome: "𝐄𝐜𝐥𝐢𝐩𝐬𝐢𝐚𝐧𝐨 ❤️‍🔥" }
    ];

    // Calcola il rango in base ai messaggi
    let grado = "-";
    for (let i = ranghi.length - 1; i >= 0; i--) {
      if ((user.messaggi || 0) >= ranghi[i].soglia) {
        grado = ranghi[i].nome;
        break;
      }
    }

    // Ottenere info sul gruppo
    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants;
    const groupOwner = groupMetadata.owner;

    // Controllare se l'utente è admin
    const participant = participants.find(p => p.id === who);
    const isAdmin = participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
    const isFounder = who === groupOwner;

    const ruolo = isFounder ? '𝐅𝐨𝐮𝐧𝐝𝐞𝐫 ⚜️' : isAdmin ? '𝐀𝐝𝐦𝐢𝐧 👑' : '𝐌𝐞𝐦𝐛𝐫𝐨 🤍';

    // Emoji genere
    const emojiGenere = user.genere === "maschio" ? "🚹" : user.genere === "femmina" ? "🚺" : "𝐓𝐫𝐚𝐧𝐬𝐟𝐨𝐫𝐦𝐞𝐫";

    // Immagine di default se non esiste pic
    let picUrl = user.pic || 'https://telegra.ph/file/22b3e3d2a7b9f346e21b3.png';
    let pic;
    try {
      const res = await fetch(picUrl);
      const arrayBuffer = await res.arrayBuffer();
      pic = Buffer.from(arrayBuffer);
    } catch (error) {
      const res = await fetch('https://telegra.ph/file/22b3e3d2a7b9f346e21b3.png');
      const arrayBuffer = await res.arrayBuffer();
      pic = Buffer.from(arrayBuffer);
    }

    // Invia il messaggio con i dati aggiornati
    conn.sendMessage(m.chat, {
      text: ` ꒷︶꒷꒥꒷‧₊˚꒷︶꒷꒥꒷‧₊˚\n 📝 » 𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢: ${user.messaggi || 0}\n` +
        ` 🚀 » 𝐑𝐚𝐧𝐠𝐨: ${grado}\n` +
        ` ⚠ » 𝐀𝐯𝐯𝐞𝐫𝐭𝐢𝐦𝐞𝐧𝐭𝐢: ${user.warn || 0} / 4\n` +
        ` 🟣 » 𝐏𝐞𝐫𝐦𝐞𝐬𝐬𝐢: ${ruolo}\n` + 
        ` 🗓 » 𝐄𝐭𝐚̀: ${user.eta ? user.eta + " 𝐚𝐧𝐧𝐢" : "𝐍𝐨𝐧 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐚"}\n` +  
        ` 🚻 » 𝐒𝐞𝐬𝐬𝐨: ${emojiGenere}\n` +
        ` 🤬 » 𝐁𝐞𝐬𝐭𝐞𝐦𝐦𝐢𝐞: ${user.blasphemy || 0}\n` +
        `${user.instagram ? ` 🌐 » instagram.com/${user.instagram}` : ' 🌐 » 𝐈𝐧𝐬𝐭𝐚: 𝐧𝐨𝐧 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨'}\n∘₊✧─────────✧₊∘\n> kekko domina 🫣`,
      contextInfo: {
        mentionedJid: [who],
        externalAdReply: {
          title: `${user.name || 'Sconosciuto'}`,
          body: ``,
          thumbnail: pic,
        }
      },
      buttons: [
        { buttonId: '.setanni', buttonText: { displayText: '🗓️ Imposta Età' }, type: 1 },
        { buttonId: '.setgenere maschio', buttonText: { displayText: '🚹 Genere Maschio' }, type: 1 },
        { buttonId: '.setgenere femmina', buttonText: { displayText: '🚺 Genere Femmina' }, type: 1 },
        { buttonId: '.setig', buttonText: { displayText: '🌐 Imposta IG' }, type: 1 }
      ],
      footer: 'Imposta i tuoi dati personali:',
      viewOnce: true,
      headerType: 4
    }, { quoted: m });

  } catch (error) {
    console.error(error);
  }
};

handler.command = /^(info)$/i;
export default handler;