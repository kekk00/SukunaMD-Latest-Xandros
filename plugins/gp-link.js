const handler = async (m, { conn, args }) => {
    const metadata = await conn.groupMetadata(m.chat);
    const groupName = metadata.subject;

    const interactiveButtons = [
        {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
                display_text: "🚀 𝐂𝐨𝐩𝐢𝐚",
                id: 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat),
                copy_code: 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)
            })
        },
        {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
                display_text: "♻️𝐑𝐞𝐢𝐦𝐩𝐨𝐬𝐭𝐚",
                id: `.reimposta`,
            })
        },
        {   name: "quick_reply",
            buttonParamsJson: JSON.stringify({
                display_text: "➰ 𝐐𝐑 𝐂𝐨𝐝𝐞",
                id: `.linkqr`,
            })
        }
    ];   

    const interactiveMessage = {
        text: `*${groupName}*`,
        title: "> © 𝐤𝐞𝐤𝐤𝐨⁹⁹⁹",
        footer: "Scegli una delle seguenti opzioni:",
        interactiveButtons
    };

    await conn.sendMessage(m.chat, interactiveMessage, { quoted: m });
};

handler.help = ['linkgroup'];
handler.tags = ['group'];
handler.command = /^link$/i;
handler.group = true;
handler.botAdmin = true;

export default handler;
