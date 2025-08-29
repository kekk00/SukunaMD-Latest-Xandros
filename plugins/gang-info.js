let handler = async (m, { conn, usedPrefix }) => {
    const users = global.db.data.users;
    const gangData = global.db.data.gang = global.db.data.gang || {};
    const user = users[m.sender];

    if (!user.gang) return m.reply('『 ⚠️ 』Non fai parte di nessuna gang.');

    const gangId = user.gang.id;
    const gang = gangData[gangId];

    const membersList = gang.members.map(member => {
        const role = member === gang.boss ? '👑 Boss' : '💀 Membro';
        return `• @${member.split('@')[0]} (${role})`;
    }).join('\n');

    const infoMsg = `『 🔫 』*INFO GANG*\n\n*${gang.emoji} ${gang.name} ${gang.emoji}*\n` +
                    `👑 Boss: @${gang.boss.split('@')[0]}\n` +
                    `📊 Membri: ${gang.members.length}\n${membersList}`;

    const buttons = [
        { buttonId: `${usedPrefix}lasciagang`, buttonText: { displayText: '👋 Abbandona' }, type: 1 },
        ...(user.gang.role === 'boss'
            ? [
                { buttonId: `${usedPrefix}sciogli`, buttonText: { displayText: '💥 Sciogli' }, type: 1 },
                { buttonId: `${usedPrefix}invitogang`, buttonText: { displayText: '✅ Invita' }, type: 1 }
              ]
            : [])
    ];

    await conn.sendMessage(m.chat, {
        text: infoMsg,
        mentions: gang.members,
        buttons,
        headerType: 1
    });
};

handler.help = ['infogang'];
handler.tags = ['gang'];
handler.command = ['infogang'];
export default handler;