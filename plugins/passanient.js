
let handler = async (m, { conn, usedPrefix, command }) => {
    const jid = m.chat;

    const sections = [
        {
           title: "CONSIGLIATI",
           rows: [ 
                { title: "Menu Principale", rowId: ".menu" }
           ]
        },
        {
            title: "Sezione 1",
            rows: [
                { title: "Opzione 1", rowId: "opzione1" },
                { title: "Opzione 2", rowId: "opzione2", description: "Descrizione opzione 2" }
            ]
        },
        {
            title: "Sezione 2",
            rows: [
                { title: "Opzione 3", rowId: "opzione3" },
                { title: "Opzione 4", rowId: "opzione4", description: "Descrizione opzione 4" }
            ]
        }
    ];

    const listMessage = {
        text: "Questo è un messaggio con lista",
        footer: "Link: https://esempio.com",
        title: "Titolo della lista",
        buttonText: "Clicca per vedere le opzioni",
        sections
    };

    await conn.sendMessage(jid, listMessage);
};

handler.help = ['list'];
handler.tags = ['interattivi'];
handler.command = /^(list)$/i;
handler.register = true;

export default handler;