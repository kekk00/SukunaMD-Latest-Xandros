let handler = async (m, { conn }) => {
    const users = global.db.data.users;
    const gangData = global.db.data.gang = global.db.data.gang || {};
    const gangRequests = global.gangRequests = global.gangRequests || {};

    const req = gangRequests[m.sender];
    if (!req) return m.reply('『 ℹ️ 』Non hai inviti pendenti a nessuna gang.');

    const g = gangData[req.gangId];
    if (!g) {
        delete gangRequests[m.sender];
        return m.reply('『 ⚠️ 』La gang associata all\'invito non esiste più.');
    }

    g.members.push(m.sender);
    users[m.sender].gang = { id: req.gangId, role: 'member' };

    clearTimeout(req.timeout);
    delete gangRequests[m.sender];

    await conn.sendMessage(m.chat, {
        text: `『 🎊 』@${m.sender.split('@')[0]} è entrato nella gang *${g.emoji} ${g.name} ${g.emoji}*! Ora ci sono ${g.members.length} membri.`,
        mentions: [m.sender]
    });
};

handler.help = ['accetta'];
handler.tags = ['gang'];
handler.command = ['accetta'];
export default handler;