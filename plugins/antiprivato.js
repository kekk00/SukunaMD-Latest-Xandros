import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagePath = path.join(__dirname, 'accessdenied2.png');

export async function before(m, { conn, isOwner, isROwner }) {
    if (m.isBaileys && m.fromMe) return true;
    if (m.isGroup) return true;
    if (!m.message) return true;

    const botSettings = global.db.data.settings[this.user.jid] || {};

    if (botSettings.antiPrivate && !isOwner && !isROwner) {
        const username = await conn.getName(m.sender);
        const ownerNumber = '+393297570233';

        const txt = `⛔️ 𝗺𝗼𝗱𝗮𝗹𝗶𝘁𝗮̀ 𝗮𝗻𝘁𝗶𝗽𝗿𝗶𝘃𝗮𝘁𝗼 𝗮𝘁𝘁𝗶𝘃𝗮.
> 𝙞𝙡 𝙢𝙞𝙤 𝙥𝙧𝙤𝙥𝙧𝙞𝙚𝙩𝙖𝙧𝙞𝙤 𝙝𝙖 𝙖𝙩𝙩𝙞𝙫𝙖𝙩𝙤 𝙦𝙪𝙚𝙨𝙩𝙖 𝙛𝙪𝙣𝙯𝙞𝙤𝙣𝙚 𝙥𝙚𝙧 𝙥𝙧𝙚𝙫𝙚𝙣𝙞𝙧𝙚 𝙡𝙚 𝙩𝙚𝙨𝙩𝙚 𝙙𝙞 𝙘𝙖𝙯𝙯𝙤 𝙘𝙤𝙢𝙚 𝙩𝙚 𝙖 𝙨𝙘𝙧𝙞𝙫𝙚𝙧𝙢𝙞 𝙞𝙣 𝙥𝙧𝙞𝙫𝙖𝙩𝙤 🤣

𝐑𝐨𝐦𝐩𝐢 𝐢𝐥 𝐜𝐚𝐳𝐳𝐨 𝐚 𝐥𝐮𝐢 𝐢𝐧 𝐚𝐥𝐭𝐞𝐫𝐧𝐚𝐭𝐢𝐯𝐚:`;

        const buttons = [
            {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                    display_text: '📱 Contatta Owner',
                    url: `https://wa.me/${ownerNumber.replace(/\D/g, '')}`
                })
            }
        ];

        try {
            await conn.sendMessage(m.chat, {
                image: { url: "https://i.ibb.co/PZMDGcS0/c8756687815f6b0c1ee2a41b6f2c5e99.jpg" },
                caption: txt,
                footer: '© 𝐒𝐔𝐊𝐔𝐍𝐀⁶⁶⁶',
                interactiveButtons: buttons
            }, { quoted: m });

            await conn.updateBlockStatus(m.sender, "block");

        } catch (e) {
            console.error('Errore inviando messaggio antiPrivate:', e);
        }

        return false;
    }

    return true;
}