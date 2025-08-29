let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    const number = m.mentionedJid?.[0] || m.quoted?.sender || text?.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    if (!number) return conn.reply(m.chat, `Uso corretto: ${usedPrefix + command} @numero`, m);

    if (!global.db.data.users[number]) global.db.data.users[number] = {};

    let user = global.db.data.users[number];

    switch(command) {
        case 'addprem':
            // Imposta premiumTime a un valore futuro (ad esempio 365 giorni da ora)
            const oneYear = 365 * 24 * 60 * 60 * 1000; // millisecondi
            user.premiumTime = Date.now() + oneYear;
            conn.reply(m.chat, `✅ L'utente ${number.split('@')[0]} è diventato premium per 1 anno.`, m);
            break;

        case 'delprem':
            user.premiumTime = 0;
            conn.reply(m.chat, `✅ L'utente ${number.split('@')[0]} non è più premium.`, m);
            break;
    }
};

handler.command = /^(addprem|delprem)$/i;
handler.rowner = true;
export default handler;