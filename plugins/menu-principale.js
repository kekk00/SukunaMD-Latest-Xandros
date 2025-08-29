import { performance } from 'perf_hooks';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (message, { conn, usedPrefix, command }) => {
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity';

    const menuText = generateMenuText(usedPrefix, botName, userCount);

    const imagePath = path.join(__dirname, '../menu/luffy.jpeg'); 
    await conn.sendMessage(
        message.chat,
        {
            image: { url: imagePath },
            caption: menuText,
            footer: '𝐔𝐥𝐭𝐞𝐫𝐢𝐨𝐫𝐢 𝐦𝐞𝐧𝐮 𝐬𝐨𝐧𝐨 𝐩𝐫𝐞𝐬𝐞𝐧𝐭𝐢 𝐪𝐮𝐢',
            buttons: [
                { buttonId: `${usedPrefix}menuadmin`, buttonText: { displayText: "🛡️ Menu Admin" }, type: 1 },
                { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: "👑 Menu Owner" }, type: 1 },
                { buttonId: `${usedPrefix}menusicurezza`, buttonText: { displayText: "🚨 Menu Sicurezza" }, type: 1 },
                { buttonId: `${usedPrefix}menugruppo`, buttonText: { displayText: "👥 Menu Gruppo" }, type: 1 },
                { buttonId: `${usedPrefix}menuia`, buttonText: { displayText: "🤖 Menu IA" }, type: 1 }
            ],
            viewOnce: true,
            headerType: 4
        }
    );
};

handler.help = ['menu'];
handler.tags = ['menu'];
handler.command = /^(menu|comandi)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `

—〔 *💬 𝑴𝑬𝑵𝑼 𝑫𝑬𝑳 𝑩𝑶𝑻 💬* 〕—

🚀 » *${prefix}ping*
📝 » *${prefix}segnala* (comando)
💡 » *${prefix}consiglia* (comando)

💫 » *𝑽𝑬𝑹𝑺𝑰𝑶𝑵𝑬:* ${vs}
👤 » *_𝐔𝐓𝐄𝐍𝐓𝐈_*: ${userCount}`
.trim();
}
