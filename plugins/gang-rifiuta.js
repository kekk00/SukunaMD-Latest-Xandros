let handler = async (m, { conn }) => {
    const gangRequests = global.gangRequests = global.gangRequests || {};
    const req = gangRequests[m.sender];
    if (!req) return m.reply('『 ℹ️ 』Non hai inviti pendenti a nessuna gang.');

    clearTimeout(req.timeout);
    delete gangRequests[m.sender];

    await conn.sendMessage(m.chat, {
        text: `『 💢 』@${m.sender.split('@')[0]} ha rifiutato l'invito nella gang.`,
        mentions: [m.sender]
    });
};

handler.help = ['rifiuta'];
handler.tags = ['gang'];
handler.command = ['rifiuta'];
export default handler;