let handler = async (m, { conn, usedPrefix }) => {
    const users = global.db.data.users;
    const gangData = global.db.data.gang = global.db.data.gang || {};
    const user = users[m.sender];

    if (!user.gang) return m.reply('『 ⚠️ 』Non fai parte di nessuna gang.');

    const gangId = user.gang.id;
    const gang = gangData[gangId];

    // Se l'utente è il boss
    if (user.gang.role === 'boss') {
        await conn.sendMessage(m.chat, {
            text: `『 ⚠️ 』Sei il boss della gang. Puoi sciogliere la gang con il bottone qui sotto.`,
            buttons: [
                { buttonId: `${usedPrefix}sciogli`, buttonText: { displayText: '💥 Sciogli' }, type: 1 }
            ],
            headerType: 1
        });
        return;
    }

    // Rimuovi membro dalla gang
    gang.members = gang.members.filter(jid => jid !== m.sender);
    delete users[m.sender].gang;

    m.reply(`『 👋 』Hai lasciato la gang *${gang.emoji} ${gang.name} ${gang.emoji}*.`);
};

handler.help = ['lasciagang'];
handler.tags = ['gang'];
handler.command = ['lasciagang'];
export default handler;