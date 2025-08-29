const handler = async (m, { conn }) => {
  try {
    // immagine
    const image = { url: 'https://i.ibb.co/sp3p9nhd/Screenshot-20250822-121710-Whats-App.jpg' }

    // testo
    const caption = "🎮 *GIOCO MINECRAFT GRATIS E SICURO!* 🎮\n\nScopri *Eaglercraft*, la versione browser di Minecraft che puoi giocare OVUNQUE!\n\n✅ Gratuito al 100%\n🔒 Sicuro e senza download\n🌐 Gioca direttamente dal browser"

    // link da copiare
    const link = "https://eaglercraft.com/"

    // bottoni interattivi
    const interactiveButtons = [
      {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "⛏️ Apri EaglerCraft",
          id: link,
          url: link
        })
      }
    ]
    
   /*
   {
          name: 'open_webview',
          buttonParamsJson: JSON.stringify({
            title: 'cliccaclicca',
            link: {
              in_app_webview: true,
              url: 'https://whatsapp.com/channel/0029VbB41Sa1Hsq1JhsC1Z1z'
            }
          })
        },
       */

    // messaggio
    const interactiveMessage = {
      image,
      caption,
      footer: "Premi qui sotto per giocare",
      interactiveButtons
    }

    await conn.sendMessage(m.chat, interactiveMessage, { quoted: m })

  } catch (e) {
    console.error(e)
    await m.reply("❌ Errore durante l'invio del messaggio Minecraft.")
  }
}

handler.command = /^minecraft$/i
handler.group = true

export default handler