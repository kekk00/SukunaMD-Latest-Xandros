let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  // Controllo input
  if (!args[0]) throw `⚠️ *_Inserisci un titolo, il numero di opzioni selezionabili e almeno due opzioni._*\n\n📌 Esempio:\n*${usedPrefix + command}* Titolo del sondaggio | 1 | Opzione1 | Opzione2`;

  if (!text.includes('|')) throw `⚠️ *_Separa titolo, numero di selezioni e opzioni con |_*\n\n📌 Esempio:\n*${usedPrefix + command}* Titolo | 1 | Opzione1 | Opzione2`;

  // Split e trim
  let parti = text.split('|').map(s => s.trim());
  if (parti.length < 4) throw `⚠️ *_Devi inserire almeno un titolo, il numero di selezioni e due opzioni!_*\n\n📌 Esempio:\n*${usedPrefix + command}* Titolo | 1 | Opzione1 | Opzione2`;

  let titolo = parti.shift(); // primo elemento è il titolo
  let selectableCountRaw = parti.shift(); // secondo elemento è il numero di selezioni
  let selectableCount = parseInt(selectableCountRaw);
  if (isNaN(selectableCount) || selectableCount < 1) selectableCount = 1; // default a 1 se invalido

  let opzioni = parti;

  const toAnnouncementGroup = false; // se inviare come annuncio

  // Costruzione poll
  await conn.sendMessage(m.chat, {
    poll: {
      name: `📊 » ${titolo}`,
      values: opzioni.map(opt => `🔹 » ${opt}`),
      selectableCount,
      toAnnouncementGroup
    }
  }, { quoted: m });
}

handler.help = ['sondaggio <titolo> | <numero selezioni> | <opzione1> | <opzione2>']
handler.tags = ['gruppo']
handler.command = ['poll', 'sondaggio']
handler.group = true

export default handler;