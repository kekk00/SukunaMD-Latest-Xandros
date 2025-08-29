let handler = async (m, { conn, command }) => {
    try {
        // Nome della community
        let nomeCommunity = "© 𝐦𝐚𝐝𝐞 𝐛𝐲 𝐊𝐞𝐤𝐤𝐨𝐌𝐃";

        // Creazione della community
        let create = await conn.groupCreate(nomeCommunity, []); // nessun membro iniziale
        let groupId = create.id;

        // Ottieni il link di ingresso
        let inviteCode = await conn.groupInviteCode(groupId);
        let inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

        // Invia messaggio con bottone cta_copy
        await conn.sendMessage(m.chat, {
            text: `✅ *Gruppo creato con successo*\n${inviteLink}`
        });

    } catch (e) {
        console.error(e);
        m.reply("❌ Errore nella creazione della community.");
    }
};

handler.command = /^creagp$/i;
export default handler;