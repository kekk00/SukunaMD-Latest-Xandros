import fs from 'fs';
import path from 'path';
import os from 'os';

let handler = async (m, { conn, usedPrefix }) => {
    // --- Dati base ---
    const users = Object.keys(global.db.data.users || {}).length;
    const owners = global.db.data.settings?.owners || [{ name: 'kekko', number: '+39 329 757 0233' }];
    const groups = Object.keys(conn.chats || {}).filter(jid => jid.endsWith('@g.us')).length;
    const pluginsDir = path.join('.', 'plugins');
    const commands = fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js') || f.endsWith('.mjs'));
    const executedCommands = global.db.data.stats?.commandsExecuted || 0;
    const uptime = msToTime(process.uptime() * 1000);
    const prefix = usedPrefix || '.';
    const ping = Math.floor(conn.ws.ping * 1000) / 1000;

    // --- Costruzione menu aesthetic ---
    let text = `
╭───『 ⚡ \`Database\` 』
│
│ 『 👥 』 \`Utenti registrati:\` ${users}
│ 『 👑 』 \`Owner registrati:\` ${owners.map(o => o.name).join(', ')}
│ 『 🏘️ 』 \`Gruppi registrati:\` ${groups}
│ 『 ⚡ 』 \`Comandi registrati:\` ${commands.length}
│ 『 📝 』 \`Comandi eseguiti:\` ${executedCommands}
│ 『 ⏱️ 』 \`Uptime\`: ${uptime}
│ 『 🔤 』 \`Prefisso: ${prefix}\`
│ 『 🖥️ 』 \`Sistema:\` ${os.platform()} ${os.arch()}
│ 『 🟢 』 \`Node.js:\` ${process.version}
╰───────────────────⟢

> ᴀʟᴛʀᴇ ɪɴғᴏ ⬇︎
• \`Owner numero:\` ${owners.map(o => o.number).join(', ')}
`;

    // --- Bottoni ---
    const buttons = [
        { buttonId: `${prefix}ping`, buttonText: { displayText: '`🏓 Ping`' }, type: 1 },
        { buttonId: `${prefix}owner`, buttonText: { displayText: '`👑 Owner`' }, type: 1 }
    ];

    // --- Invia messaggio con bottoni ---
    await conn.sendMessage(m.chat, {
        text,
        buttons,
        headerType: 1
    }, { quoted: m });
};

handler.help = ['databeis'];
handler.tags = ['info'];
handler.command = /^databeis$/;
handler.register = true;

export default handler;

// --- Funzione utilità ---
function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
        days = Math.floor(duration / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}