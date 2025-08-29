let handler = async (m, { conn }) => {
    const gangData = global.db.data.gang = global.db.data.gang || {};
    const users = global.db.data.users;

    const user = users[m.sender];
    if (!user.gang) return m.reply('Non fai parte di nessuna gang.');

    const gangId = user.gang.id;
    const gang = gangData[gangId];

    if (user.gang.role !== 'boss') return m.reply('Solo il boss può sciogliere la gang.');

    gang.members.forEach(jid => {
        if (users[jid]) delete users[jid].gang;
    });

    delete gangData[gangId];

    return m.reply(`💥 La gang *${gang.emoji} ${gang.name} ${gang.emoji}* è stata sciolta. Tutti i membri non appartengono più a questa gang.`);
};

handler.help = ['sciogli'];
handler.tags = ['gang'];
handler.command = ['sciogli'];
export default handler;