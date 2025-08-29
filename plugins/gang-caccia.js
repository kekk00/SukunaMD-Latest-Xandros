let handler = async (m) => {
    const users = global.db.data.users;
    const gangData = global.db.data.gang = global.db.data.gang || {};
    const user = users[m.sender];

    if (!user.gang) return m.reply('『 ⚠️ 』Non fai parte di nessuna gang.');
    if (user.gang.role !== 'boss') return m.reply('『 🔪 』Solo il boss può cacciare membri.');

    const mention = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
    if (!mention) return m.reply('『 ℹ️ 』Tagga un membro da cacciare.');
    if (mention === m.sender) return m.reply('『 🤡 』Non puoi cacciare te stesso!');

    const gangId = user.gang.id;
    const gang = gangData[gangId];

    if (!gang.members.includes(mention)) return m.reply('『 ⚠️ 』Questo utente non fa parte della tua gang.');

    gang.members = gang.members.filter(jid => jid !== mention);
    if (users[mention]) delete users[mention].gang;

    m.reply(`『 🔪 』@${mention.split('@')[0]} è stato cacciato dalla gang.`);
};

handler.help = ['buttafuori @utente'];
handler.tags = ['gang'];
handler.command = ['buttafuori'];
export default handler;