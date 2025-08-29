// antiflood.js
export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.text) return false;

    let chat = global.db.data.chats[m.chat];
    let sender = m.sender;
    let msgId = m.key.id;
    let maxWarnings = 4;

    // regex: cattura qualunque carattere ripetuto 35 o più volte consecutivamente
    let floodRegex = /(.)\1{14,}/;

    // controlla se la funzione antiflood è attiva
    if (chat.antiflood && floodRegex.test(m.text) && !isAdmin && isBotAdmin) {
        // assegna warning
        global.db.data.users[sender].warn += 1;

        // elimina il messaggio
        await conn.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: msgId,
                participant: m.key.participant
            }
        });

        let warns = global.db.data.users[sender].warn;

        if (warns < maxWarnings) {
            let warningMsg = `⚠ FLOOD DI CARATTERI RILEVATO\n*${warns}/${maxWarnings}*`;
            conn.reply(m.chat, warningMsg, m);
        } else {
            global.db.data.users[sender].warn = 0;
            m.reply("⛔ UTENTE RIMOSSO DOPO 4 AVVERTIMENTI (FLOOD)");
            await conn.groupParticipantsUpdate(m.chat, [sender], 'remove');
        }
    }
    return true;
}