let handler = async (m, { conn, text, usedPrefix }) => {
    const users = global.db.data.users;
    const gangData = global.db.data.gang = global.db.data.gang || {};

    const user = users[m.sender];
    if (user.gang) return m.reply('『 ⚠️ 』Fai già parte di una gang. Lascia la tua gang prima di crearne una nuova.');

    if (!text || text.split(' ').length < 2) return m.reply(`『 ℹ️ 』Formato errato. Usa: ${usedPrefix}creagang [nome] [emoji]\nEsempio: ${usedPrefix}creagang Pirati ☠️`);

    const args = text.split(' ');
    const emoji = args.pop();
    const name = args.join(' ');
    const gangId = name.toLowerCase().replace(/\s+/g, '_');

    if (gangData[gangId]) return m.reply('『 ⚠️ 』Esiste già una gang con questo nome.');

    gangData[gangId] = {
        id: gangId,
        name,
        emoji,
        boss: m.sender,
        members: [m.sender]
    };

    user.gang = { id: gangId, role: 'boss' };

    m.reply(`『 ✅ 』Hai creato la gang *${emoji} ${name} ${emoji}*! Sei il *boss*.\nUsa ${usedPrefix}invitogang @user per invitare altri membri.`);
};

handler.help = ['creagang <nome> <emoji>'];
handler.tags = ['gang'];
handler.command = ['creagang'];
export default handler;