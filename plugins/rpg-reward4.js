import fetch from 'node-fetch'

const msgs = 100
const rwd = 20

let handler = m => m

handler.all = async function (m) {
  if (!m.isGroup) return
  const conn = global.conn
  if (!conn) return
  if (m.fromMe) return // ignora il bot

  // Inizializza utente
  if (!global.db.data.users[m.sender]) {
    global.db.data.users[m.sender] = { limit: 0, bank: 0, messages: 0 }
  }

  let user = global.db.data.users[m.sender]
  user.messages = (user.messages || 0) + 1

  // ogni multiplo di MESSAGES_FOR_REWARD → accredita UC
  if (user.messages % msgs === 0) {
    user.limit += rwd

    // messaggio testuale
    const text = `💸 Complimenti! Hai scritto ${msgs} messaggi e hai guadagnato ${rwd} UC 🎉`

    // prova a prendere la foto profilo
    let ppUrl
    try {
      ppUrl = await conn.profilePictureUrl(m.sender, 'image')
    } catch {
      ppUrl = 'https://i.ibb.co/N2JhMQ50/Senza-titolo-6-20250824185140.jpg'
    }

    // invio messaggio con externalAdReply e quote del messaggio utente
    await conn.sendMessage(m.chat, {
      text,
      contextInfo: {
        externalAdReply: {
          title: 'UnityCoins Reward',
          body: 'Hai ricevuto una ricompensa!',
          thumbnailUrl: ppUrl,
          mediaType: 1,
          renderLargerThumbnail: false,
          sourceUrl: '' // opzionale: puoi linkare un sito o lasciarlo vuoto
        }
      }
    }, { quoted: m }) // <-- quota il messaggio dell'utente
  }
}

export default handler