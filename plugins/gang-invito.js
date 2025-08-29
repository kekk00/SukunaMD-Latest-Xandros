let handler = async (m, { conn, usedPrefix }) => {
    const users = global.db.data.users;
    const gangData = global.db.data.gang = global.db.data.gang || {};
    const gangRequests = global.gangRequests = global.gangRequests || {};

    const user = users[m.sender];
    if (!user.gang) return m.reply('『 ⚠️ 』Non fai parte di nessuna gang.');
    if (user.gang.role !== 'boss') return m.reply('『 🔪 』Solo il capo può invitare membri!');

    const mention = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
    if (!mention) return m.reply(`『 ℹ️ 』Tagga un utente da invitare. Esempio: ${usedPrefix}invitogang @user`);
    if (users[mention]?.gang) return m.reply('『 ⚠️ 』Questo utente è già in una gang.');

    const gangInfo = gangData[user.gang.id];
    if (gangInfo.members.length >= 4) return m.reply('『 ⚠️ 』Numero massimo di membri raggiunto (4).');

    gangRequests[mention] = {
        gangId: user.gang.id,
        from: m.sender,
        timeout: setTimeout(() => {
            if (gangRequests[mention]) {
                conn.sendMessage(m.chat, { 
                    text: `『 ⏱️ 』L'invito per @${mention.split('@')[0]} è scaduto.`,
                    mentions: [mention] 
                });
                delete gangRequests[mention];
            }
        }, 60 * 1000)
    };

    await conn.sendMessage(m.chat, {
        text: `『 🔫 』@${m.sender.split('@')[0]} ti invita nella gang *${gangInfo.emoji} ${gangInfo.name} ${gangInfo.emoji}*.\nHai 60 secondi per rispondere.`,
        mentions: [mention, m.sender],
        buttons: [
            { buttonId: `${usedPrefix}accetta`, buttonText: { displayText: '✅ Accetta' }, type: 1 },
            { buttonId: `${usedPrefix}rifiuta`, buttonText: { displayText: '❌ Rifiuta' }, type: 1 }
        ],
        headerType: 1
    }, { quoted: m });
};

handler.help = ['invitogang @user'];
handler.tags = ['gang'];
handler.command = ['invitogang'];
export default handler;