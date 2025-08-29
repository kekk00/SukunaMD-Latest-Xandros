const handler = async (m, { conn }) => {
  try {
    // immagine
    const image = { url: 'https://i.ibb.co/1YnHVJK7/IMG-20250827-WA0039.jpg' }

    // testo
    const caption = "testo utile"

    // link da copiare
    const link = "https://sukunabot.netlify.app/homepage"

    // bottoni interattivi
    const interactiveButtons = [
      {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "🌐 DashBoard",
          id: link,
          url: link
        })
      },
   {
          name: 'open_webview',
          buttonParamsJson: JSON.stringify({
            title: '🍥 Crediti Vare-bot',
            link: {
              in_app_webview: true,
              url: 'https://whatsapp.com/channel/0029VbB41Sa1Hsq1JhsC1Z1z'
            }
          })
        },
  ]

    // messaggio
    const interactiveMessage = {
      image,
      caption,
      footer: "📩 Bot Status",
      interactiveButtons
    }

    await conn.sendMessage(m.chat, interactiveMessage, { quoted: m })

  } catch (e) {
    console.error(e)
    await m.reply("❌ Errore durante l'invio del messaggio.")
  }
}

handler.command = /^sito$/i
handler.group = true

export default handler