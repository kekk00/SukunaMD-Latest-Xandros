import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let handler = async (m, { conn, usedPrefix }) => {
  const chat = global.db.data.chats[m.chat];

  const functions = {
    "Antilink": chat.antiLink,
    "Antilinkhard": chat.antiLinkHard,
    "Antispam": chat.antiSpam,
    "Antitrava": chat.antitrava,
    "Benvenuto": chat.welcome,
    "Detect": chat.detect,
    "Antibestemmie": chat.antibestemmie,
    "GPT": chat.gpt,
    "JadiBot": chat.jadibot,
    "SoloGruppo": chat.sologruppo,
    "SoloPrivato": chat.soloprivato,
    "soloadmin": chat.soloadmin,
    "BanGruppo": chat.isBanned,
    "Antiporno": chat.antiporno,
    "Antiflood": chat.antiflood,
    "Antinuke": chat.antinuke,
    "AntiCall": chat.antiCall,
    "Antiinsta": chat.antiinsta,
    "AntiTikTok": chat.antitiktok,
    "Antipaki": chat.antipaki,
    "Antivirus": chat.antivirus,
    "Antibot": chat.antibot,
    "Antivoip": chat.antivoip || false,
    "Antimedia": chat.antimedia,
    "Antisondaggi": chat.antisondaggi,
  };

  const sections = [
    {
      title: "🛡️ 𝐀𝐧𝐭𝐢𝐥𝐢𝐧𝐤 & 𝐒𝐩𝐚𝐦",
      commands: [
        `🔗 .antilink → ${functions.Antilink ? '🟢' : '🔴'}`,
        `⚡ .antilinkhard → ${functions.Antilinkhard ? '🟢' : '🔴'}`,
        `📛 .antispam → ${functions.Antispam ? '🟢' : '🔴'}`,
        `💥 .antitrava → ${functions.Antitrava ? '🟢' : '🔴'}`,
        `🧨 .antinuke → ${functions.Antinuke ? '🟢' : '🔴'}`,
      ]
    },
    {
      title: "👋 𝐁𝐞𝐧𝐯𝐞𝐧𝐮𝐭𝐨 & 𝐃𝐞𝐭𝐞𝐜𝐭",
      commands: [
        `🏠 .benvenuto → ${functions.Benvenuto ? '🟢' : '🔴'}`,
        `🔍 .detect → ${functions.Detect ? '🟢' : '🔴'}`,
        `🛑 .antibestemmie → ${functions.Antibestemmie ? '🟢' : '🔴'}`,
        `🤖 .gpt → ${functions.GPT ? '🟢' : '🔴'}`,
        `🤖 .jadibot → ${functions.JadiBot ? '🟢' : '🔴'}`
      ]
    },
    {
      title: "👥 𝐏𝐫𝐢𝐯𝐚𝐭𝐨 & 𝐆𝐫𝐮𝐩𝐩𝐨",
      commands: [
        `👤 .soloprivato → ${functions.SoloPrivato ? '🟢' : '🔴'}`,
        `🏘️ .sologruppo → ${functions.SoloGruppo ? '🟢' : '🔴'}`,
        `🛡️ .soloadmin → ${functions.soloadmin ? '🟢' : '🔴'}`,
        `🚫 .ban → ${functions.BanGruppo ? '🟢' : '🔴'}`
      ]
    },
    {
      title: "🚫 𝐀𝐧𝐭𝐢𝐦𝐞𝐝𝐢𝐚 & 𝐀𝐧𝐭𝐢𝐯𝐢𝐫𝐮𝐬",
      commands: [
        `📵 .anticall → ${functions.AntiCall ? '🟢' : '🔴'}`,
        `📸 .antiinsta → ${functions.Antiinsta ? '🟢' : '🔴'}`,
        `🎵 .antitiktok → ${functions.AntiTikTok ? '🟢' : '🔴'}`,
        `❌ .antipaki → ${functions.Antipaki ? '🟢' : '🔴'}`,
        `🛡️ .antivirus → ${functions.Antivirus ? '🟢' : '🔴'}`,
        `🤖 .antibot → ${functions.Antibot ? '🟢' : '🔴'}`,
        `📞 .antivoip → ${functions.Antivoip ? '🟢' : '🔴'}`,
        `🎞️ .antimedia → ${functions.Antimedia ? '🟢' : '🔴'}`,
        `📊 .antisondaggi → ${functions.Antisondaggi ? '🟢' : '🔴'}`,
        `🗑️ .antiflood → ${functions.Antiflood ? '🟢' : '🔴'}`
      ]
    }
  ];

  const imagePath = path.join(__dirname, '../menu/onepiece2.jpeg');

  const cards = sections.map((section, i) => ({
    image: { url: imagePath },
    title: section.title,
    body: section.commands.join('\n'),
    footer: `© 𝐤𝐞𝐤𝐤𝐨⁹⁹⁹ - 𝐒𝐞𝐳𝐢𝐨𝐧𝐞 ${i + 1} di ${sections.length}`
  }));

  await conn.sendMessage(m.chat, {
    text: `📋 𝐌𝐞𝐧𝐮̀ 𝐒𝐢𝐜𝐮𝐫𝐞𝐳𝐳𝐚 - 𝐤𝐞𝐤𝐤𝐨⁹⁹⁹\n\nSeleziona la sezione desiderata`,
    footer: '© 𝐤𝐞𝐤𝐤𝐨⁹⁹⁹',
    title: '𝐌𝐞𝐧𝐮̀ 𝐒𝐢𝐜𝐮𝐫𝐞𝐳𝐳𝐚',
    cards,
    headerType: 1
  }, { quoted: m });
};

handler.help = ["menusicurezza"];
handler.tags = ["menu"];
handler.command = /^(menusicurezza)$/i;

export default handler;