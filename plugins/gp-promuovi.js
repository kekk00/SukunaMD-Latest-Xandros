let handler = async (m, { conn, usedPrefix, text, participants, isAdmin }) => {
  // lista owner bot
  const botOwners = (global.owner || []).map(v => Array.isArray(v) ? v[0] : v)
    .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')

  // recupero metadata per sapere owner gruppo
  const groupMetadata = await conn.groupMetadata(m.chat)
  const groupOwner = groupMetadata.owner ? groupMetadata.owner : null

  // solo botOwners + groupOwner possono promuovere
  if (!(botOwners.includes(m.sender) || m.sender === groupOwner)) {
    return m.reply('❌ Solo Owner del Bot o del Gruppo possono promuovere.')
  }

  // qui sotto il tuo codice invariato
  let number
  if (isNaN(text) && !text.match(/@/g)) {
  } else if (isNaN(text)) {
    number = text.split`@`[1]
  } else if (!isNaN(text)) {
    number = text
  }

  if (!text && !m.quoted) return
  if (number.length > 13 || (number.length < 11 && number.length > 0)) return

  try {
    let user
    if (text) {
      user = number + '@s.whatsapp.net'
    } else if (m.quoted.sender) {
      user = m.quoted.sender
    } else if (m.mentionedJid) {
      user = number + '@s.whatsapp.net'
    }
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
  } catch (e) {}
}
handler.command = /^(p|promuovi|mettiadmin)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler