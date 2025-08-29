const paese = `𝐔𝐧𝐢𝐭𝐞𝐝 𝐒𝐭𝐚𝐭𝐞𝐬`
const pending = `𝐈𝐧 𝐬𝐭𝐚𝐭𝐨 𝐝𝐢 𝐀𝐩𝐩𝐫𝐨𝐯𝐚𝐳𝐢𝐨𝐧𝐞`
const products = [
  {
    image: "https://i.ibb.co/hFMhXW8k/Screenshot-20250811-205824-Whats-App.jpg",
    title: "Peppe kiede scuza a zzeinn 💔💔",
    body: `    📝 » 𝐁𝐢𝐨: pazzo
    💸 » 𝐏𝐫𝐞𝐳𝐳𝐨: 0,05$
    ✈️ » 𝐏𝐚𝐞𝐬𝐞: ${paese}
    🔗 » 𝐋𝐢𝐧𝐤: https://wa.me/p/24581631078110209/12895361012`,
    footer: "© KekkoMD"
  },
  {
    image: "https://i.ibb.co/dF0dBzS/Screenshot-20250812-163258-Whats-App.jpg",
    title: "ei deddi",
    body: `    📝 » 𝐁𝐢𝐨: 😶🥵🥵
    💸 » 𝐏𝐫𝐞𝐳𝐳𝐨: 0,10$ ~0,50$~
    ✈️ » 𝐏𝐚𝐞𝐬𝐞: ${paese}
    🔗 » 𝐋𝐢𝐧𝐤: https://wa.me/p/24130681103254519/12895361012`,
    footer: "© KekkoMD"
  },
  {
    image: "https://i.ibb.co/Q3rcc9DZ/Screenshot-20250812-221623-Whats-App.jpg",
    title: "Sergio mi ama pazzamente",
    body: `    📝 » 𝐁𝐢𝐨: spero sia ironia
    💸 » 𝐏𝐫𝐞𝐳𝐳𝐨: 9,99$ ~15,00$~
    ✈️ » 𝐏𝐚𝐞𝐬𝐞: ${paese}
    🔗 » 𝐋𝐢𝐧𝐤: https://wa.me/p/24102040712814339/12895361012`,
    footer: "© KekkoMD"
  },
  {
    image: "https://i.ibb.co/tT1wZ8Nh/Screenshot-20250813-000204-Whats-App-Business.jpg",
    title: "sergio mi ama 😍🔥🔥🔥😜😜",
    body: `    📝 » 𝐁𝐢𝐨: skerziamo obv
    💸 » 𝐏𝐫𝐞𝐳𝐳𝐨: 654,00$ ~987,00$~
    ✈️ » 𝐏𝐚𝐞𝐬𝐞: ${paese}
    🔗 » 𝐋𝐢𝐧𝐤: https://wa.me/p/24481122314832391/12895361012`,
    footer: "© KekkoMD"
  },
  {
    image: "https://i.ibb.co/Jwn5GsLy/Screenshot-20250813-001114-Whats-App.jpg",
    title: "sekso pazzo",
    body: `    📝 » 𝐁𝐢𝐨: 🚫
    💸 » 𝐏𝐫𝐞𝐳𝐳𝐨: 1,00$
    ✈️ » 𝐏𝐚𝐞𝐬𝐞: ${paese}
    🔗 » 𝐋𝐢𝐧𝐤: https://wa.me/p/24157766523883175/12895361012`,
    footer: "© KekkoMD"
  }     
  // aggiungi altri prodotti qui
]

function formatBody(body) {
  // Puoi adattare se vuoi, ad esempio inserire link cliccabili o formattazione markdown
  return body;
}

const handler = async (m, { conn }) => {
  const botName = global.db?.data?.nomedelbot || 'ChatUnity';

  // Provo a prendere la foto del gruppo o del bot come fallback
  let groupPicUrl;
  try {
    groupPicUrl = await conn.profilePictureUrl(m.chat);
  } catch {
    groupPicUrl = null;
  }
  let botPicUrl;
  try {
    botPicUrl = await conn.profilePictureUrl(conn.user.jid);
  } catch {
    botPicUrl = 'https://i.ibb.co/pcjHVvx/Whats-App-Image-2025-04-12-at-00-50-15.jpg';
  }

  const imageToUse = groupPicUrl || botPicUrl;

  // Mappo i prodotti per il formato cards richiesto
  const cards = products.map((p, i) => ({
    image: { url: p.image || imageToUse },
    title: p.title,
    body: formatBody(p.body),
    footer: p.footer || `© ${botName} - Prodotto ${i + 1}`
  }));

  await conn.sendMessage(m.chat, {
    text: `📋 Catalogo Prodotti - ${botName}\n\nScegli il prodotto che ti interessa!`,
    footer: `© ${botName}`,
    title: `Catalogo - ${botName}`,
    cards,
    headerType: 1
  }, { quoted: m });
};

handler.command = ['catalogo'];
handler.tags = ['shop'];
handler.help = ['catalogo'];

export default handler;