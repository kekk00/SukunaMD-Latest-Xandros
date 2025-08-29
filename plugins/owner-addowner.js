// Handler per comandi addowner e delowner
const handler = async (msg, { conn, text, args, usedPrefix, command }) => {
    // Esempio di messaggio di utilizzo
    const exampleMsg = `𝐄𝐬𝐞𝐦𝐩𝐢𝐨:
✧‌⃟ᗒ ${usedPrefix + command} @${msg.sender.split('@')[0]}
✧‌⃟ᗒ ${usedPrefix + command} ${msg.sender.split('@')[0]}
✧‌⃟ᗒ ${usedPrefix + command} <riprendi messaggio>`;

    // Recupera il numero da aggiungere/rimuovere
    const number = msg.mentionedJid?.[0] 
        || msg.quoted?.sender 
        || text?.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        || null;

    if (!number) {
        return conn.reply(msg.chat, exampleMsg, msg, { mentions: [msg.sender] });
    }

    switch (command) {
        case 'addowner':
            // Aggiunge il numero alla lista globale degli owner
            const newOwner = number;
            global.owner.push([newOwner]);

            const addOwnerMsg = {
                key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'Halo' },
                message: { extendedTextMessage: { text: 'Comando eseguito ✓', vcard: vCard } },
                participant: '0@s.whatsapp.net'
            };

            // Risponde confermando l'aggiunta
            await conn.reply(msg.chat, '𝐐𝐮𝐞𝐬𝐭𝐨 numero è stato aggiunto alla lista degli owner', addOwnerMsg);
            break;

        case 'delowner':
            // Rimuove il numero dalla lista globale degli owner
            const idx = global.owner.findIndex(o => o[0] === number);
            if (idx !== -1) {
                global.owner.splice(idx, 1);

                const delOwnerMsg = {
                    key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'Halo' },
                    message: { extendedTextMessage: { text: 'Comando eseguito ✓', vcard: vCard } },
                    participant: '0@s.whatsapp.net'
                };

                await conn.reply(msg.chat, '𝐐𝐮𝐞𝐬𝐭𝐨 numero è stato rimosso dalla lista degli owner', delOwnerMsg);
            }
            break;
    }
};

// Comando regex
handler.command = /^(addowner|delowner)$/i;
handler.rowner = true;

// Esempio di vCard usata nei messaggi
const vCard = `BEGIN:VCARD
VERSION:5.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=15395490858:+1 (539) 549-0858
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`;

export default handler;