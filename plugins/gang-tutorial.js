let handler = async (m, { conn }) => {
    const tutorial = `
『 🔫 』*TUTORIAL GANG*『 🔫 』

1️⃣ .creagang <nome> <emoji> → Crea una nuova gang (diventi boss)
2️⃣ .invitogang @utente → Invita un nuovo membro (solo boss)
3️⃣ .accetta → Accetta un invito
4️⃣ .rifiuta → Rifiuta un invito
5️⃣ .lasciagang → Lascia la gang
6️⃣ .sciogli → Sciogli la gang (solo boss)
7️⃣ .buttafuori @utente → Caccia un membro (solo boss)
8️⃣ .infogang → Mostra le informazioni della gang

『 ℹ️ 』*Bottoni disponibili in info gang:*
✅ Accetta / ❌ Rifiuta / 🔪 Buttafuori / 💥 Sciogli / 👋 Abbandona
`;

    await conn.sendMessage(m.chat, { text: tutorial });
};

handler.help = ['tutorialgang'];
handler.tags = ['gang'];
handler.command = ['tutorialgang'];
export default handler;