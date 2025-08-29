//comando creato da sam aka vare github.com/realvare
let handler = async (m, { conn, args, participants, isAdmin, isBotAdmin }) => {
  if (m.text?.toLowerCase() === '.skipbandiera') {
    if (!m.isGroup) return m.reply('⚠️ Questo comando funziona solo nei gruppi!')
    if (!global.bandieraGame?.[m.chat]) return m.reply('⚠️ Non c\'è nessuna partita attiva in questo gruppo!')
    
    if (!isAdmin && !m.fromMe) {
      return m.reply('❌ *Questo comando può essere usato solo dagli admin!*')
    }

    clearTimeout(global.bandieraGame[m.chat].timeout)
    await conn.reply(m.chat, `🛑 *Gioco delle bandiere interrotto dall'admin*\n✨ La risposta era: *${global.bandieraGame[m.chat].risposta}*`, m)
    delete global.bandieraGame[m.chat]
    return
  }

  if (global.bandieraGame?.[m.chat]) {
    return m.reply('⚠️ C\'è già una partita attiva in questo gruppo!')
  }

  const cooldownKey = `bandiera_${m.chat}`
  const lastGame = global.cooldowns?.[cooldownKey] || 0
  const now = Date.now()
  const cooldownTime = 10000

  if (now - lastGame < cooldownTime) {
    const remainingTime = Math.ceil((cooldownTime - (now - lastGame)) / 1000)
    return m.reply(`⏳ *Aspetta ancora ${remainingTime} secondi prima di avviare un nuovo gioco!*`)
  }

  global.cooldowns = global.cooldowns || {}
  global.cooldowns[cooldownKey] = now

  let bandiere = [
  { url: 'https://flagcdn.com/w320/it.png', nome: 'Italia' },
  { url: 'https://flagcdn.com/w320/fr.png', nome: 'Francia' },
  { url: 'https://flagcdn.com/w320/de.png', nome: 'Germania' },
  { url: 'https://flagcdn.com/w320/gb.png', nome: 'Regno Unito' },
  { url: 'https://flagcdn.com/w320/es.png', nome: 'Spagna' },
  { url: 'https://flagcdn.com/w320/se.png', nome: 'Svezia' },
  { url: 'https://flagcdn.com/w320/no.png', nome: 'Norvegia' },
  { url: 'https://flagcdn.com/w320/fi.png', nome: 'Finlandia' },
  { url: 'https://flagcdn.com/w320/dk.png', nome: 'Danimarca' },
  { url: 'https://flagcdn.com/w320/pl.png', nome: 'Polonia' },
  { url: 'https://flagcdn.com/w320/pt.png', nome: 'Portogallo' },
  { url: 'https://flagcdn.com/w320/gr.png', nome: 'Grecia' },
  { url: 'https://flagcdn.com/w320/ch.png', nome: 'Svizzera' },
  { url: 'https://flagcdn.com/w320/at.png', nome: 'Austria' },
  { url: 'https://flagcdn.com/w320/be.png', nome: 'Belgio' },
  { url: 'https://flagcdn.com/w320/nl.png', nome: 'Paesi Bassi' },
  { url: 'https://flagcdn.com/w320/ua.png', nome: 'Ucraina' },
  { url: 'https://flagcdn.com/w320/ro.png', nome: 'Romania' },
  { url: 'https://flagcdn.com/w320/hu.png', nome: 'Ungheria' },
  { url: 'https://flagcdn.com/w320/cz.png', nome: 'Repubblica Ceca' },
  { url: 'https://flagcdn.com/w320/ie.png', nome: 'Irlanda' },
  { url: 'https://flagcdn.com/w320/ee.png', nome: 'Estonia' },
  { url: 'https://flagcdn.com/w320/lt.png', nome: 'Lituania' },
  { url: 'https://flagcdn.com/w320/lv.png', nome: 'Lettonia' },
  { url: 'https://flagcdn.com/w320/sk.png', nome: 'Slovacchia' },
  { url: 'https://flagcdn.com/w320/si.png', nome: 'Slovenia' },
  { url: 'https://flagcdn.com/w320/hr.png', nome: 'Croazia' },
  { url: 'https://flagcdn.com/w320/ba.png', nome: 'Bosnia ed Erzegovina' },
  { url: 'https://flagcdn.com/w320/me.png', nome: 'Montenegro' },
  { url: 'https://flagcdn.com/w320/mk.png', nome: 'Macedonia del Nord' },
  { url: 'https://flagcdn.com/w320/al.png', nome: 'Albania' },
  { url: 'https://flagcdn.com/w320/bg.png', nome: 'Bulgaria' },
  { url: 'https://flagcdn.com/w320/md.png', nome: 'Moldavia' },
  { url: 'https://flagcdn.com/w320/by.png', nome: 'Bielorussia' },
  { url: 'https://flagcdn.com/w320/is.png', nome: 'Islanda' },
  { url: 'https://flagcdn.com/w320/mt.png', nome: 'Malta' },
  { url: 'https://flagcdn.com/w320/cy.png', nome: 'Cipro' },
  { url: 'https://flagcdn.com/w320/lu.png', nome: 'Lussemburgo' },
  { url: 'https://flagcdn.com/w320/li.png', nome: 'Liechtenstein' },
  { url: 'https://flagcdn.com/w320/sm.png', nome: 'San Marino' },
  { url: 'https://flagcdn.com/w320/ad.png', nome: 'Andorra' },
  { url: 'https://flagcdn.com/w320/mc.png', nome: 'Monaco' },
  { url: 'https://flagcdn.com/w320/va.png', nome: 'Città del Vaticano' },
  { url: 'https://flagcdn.com/w320/rs.png', nome: 'Serbia' },
  { url: 'https://flagcdn.com/w320/xk.png', nome: 'Kosovo' }
]
 

  let frasi = [
    `🇺🇳 *INDOVINA LA BANDIERA!* 🇺🇳`,
    `🌍 *Che nazione rappresenta questa bandiera?*`,
    `🏳️ *Sfida geografica: riconosci questa bandiera?*`,
    `🧭 *Indovina la nazione dalla sua bandiera!*`,
    `🎯 *Quiz bandiere: quale paese è questo?*`,
    `🌟 *Metti alla prova la tua conoscenza geografica!*`,
    `🔍 *Osserva attentamente e indovina la nazione!*`,
  ]

  let scelta = bandiere[Math.floor(Math.random() * bandiere.length)]
  let frase = frasi[Math.floor(Math.random() * frasi.length)]

  try {
    let msg = await conn.sendMessage(m.chat, {
      image: { url: scelta.url },
      caption: `${frase}\n\n ㌌ *Rispondi con il nome della nazione!*\n⏱️ *Tempo disponibile:* 30 secondi\n\n> \`vare ✧ bot\``,
      quoted: m
    })

    global.bandieraGame = global.bandieraGame || {}
    global.bandieraGame[m.chat] = {
      id: msg.key.id,
      risposta: scelta.nome.toLowerCase(),
      rispostaOriginale: scelta.nome,
      tentativi: {},
      suggerito: false,
      startTime: Date.now(),
      timeout: setTimeout(() => {
        if (global.bandieraGame?.[m.chat]) {
          conn.reply(m.chat, `⏳ *Tempo scaduto!*\n\n🌍 *La risposta era:* *${scelta.nome}*\n\n> \`vare ✧ bot\``, msg)
          delete global.bandieraGame[m.chat]
        }
      }, 30000)
    }
  } catch (error) {
    console.error('Errore nel gioco bandiere:', error)
    m.reply('❌ *Si è verificato un errore durante l\'avvio del gioco*\n\n🔄 *Riprova tra qualche secondo*')
  }
}

function normalizeString(str) {
    if (!str) return ''
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
}

function calculateSimilarity(str1, str2) {
    const words1 = str1.split(' ').filter(word => word.length > 1)
    const words2 = str2.split(' ').filter(word => word.length > 1)
    
    if (words1.length === 0 || words2.length === 0) return 0
    
    const matches = words1.filter(word => 
        words2.some(w2 => w2.includes(word) || word.includes(w2))
    )
    
    return matches.length / Math.max(words1.length, words2.length)
}

function isAnswerCorrect(userAnswer, correctAnswer) {
    if (userAnswer.length < 2) return false
    
    const similarityScore = calculateSimilarity(userAnswer, correctAnswer)
    
    return (
        userAnswer === correctAnswer ||
        (correctAnswer.includes(userAnswer) && userAnswer.length > correctAnswer.length * 0.5) ||
        (userAnswer.includes(correctAnswer) && userAnswer.length < correctAnswer.length * 1.5) ||
        similarityScore >= 0.8
    )
}

handler.before = async (m, { conn }) => {
    const chat = m.chat
    const game = global.bandieraGame?.[chat]
    
    if (!game || !m.quoted || m.quoted.id !== game.id || m.key.fromMe) return
    
    const userAnswer = normalizeString(m.text || '')
    const correctAnswer = normalizeString(game.risposta)
    
    if (!userAnswer || userAnswer.length < 2) return
    
    const similarityScore = calculateSimilarity(userAnswer, correctAnswer)

    if (isAnswerCorrect(userAnswer, correctAnswer)) {
        clearTimeout(game.timeout)
        
        const timeTaken = Math.round((Date.now() - game.startTime) / 1000)
        let reward = Math.floor(Math.random() * 31) + 20
        let exp = 500
        
        const timeBonus = timeTaken <= 10 ? 20 : timeTaken <= 20 ? 10 : 0
        reward += timeBonus
        
        // Inizializza il portafoglio se non esiste
        if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = {}
        if (global.db.data.users[m.sender].limit == null) global.db.data.users[m.sender].limit = 0
        if (global.db.data.users[m.sender].exp == null) global.db.data.users[m.sender].exp = 0

        // Aggiungi UnityCoins e exp (usa .limit come saldo portafoglio)
        global.db.data.users[m.sender].limit = Number(global.db.data.users[m.sender].limit) + Number(reward)
        global.db.data.users[m.sender].exp = Number(global.db.data.users[m.sender].exp) + Number(exp)

        // Forza la scrittura del database e aggiorna la cache in memoria
        if (global.db && typeof global.db.write === 'function') {
            await global.db.write();
            await global.db.read(); // aggiorna la cache dopo la scrittura
        }

        let congratsMessage = `
╭━『 🎉 *RISPOSTA CORRETTA!* 』━╮
┃
┃ 🌍 *Nazione:* ${game.rispostaOriginale}
┃ ⏱️ *Tempo impiegato:* ${timeTaken}s
┃
┃ 🎁 *Ricompense:*
┃ • ${reward} 🪙 UnityCoins${timeBonus > 0 ? ` (+${timeBonus} bonus velocità)` : ''}
┃ • ${exp} 🆙 EXP
┃
┃ 💰 *Saldo attuale:* ${global.db.data.users[m.sender].limit} UnityCoins
╰━━━━━━━━━━━━━━━━╯

> \`vare ✧ bot\``

        await conn.reply(chat, congratsMessage, m)
        delete global.bandieraGame[chat]
        
    } else if (similarityScore >= 0.6 && !game.suggerito) {
        game.suggerito = true
        await conn.reply(chat, '👀 *Ci sei quasi!*', m)
        
    } else if (game.tentativi[m.sender] >= 3) {
        await conn.reply(chat, '❌ *Hai esaurito i tuoi 3 tentativi!*\n\n⏳ *Aspetta che altri giocatori provino o che finisca il tempo*', m)
        
    } else {
        game.tentativi[m.sender] = (game.tentativi[m.sender] || 0) + 1
        const tentativiRimasti = 3 - game.tentativi[m.sender]
        
        if (tentativiRimasti === 1) {
            const primaLettera = game.rispostaOriginale[0].toUpperCase()
            const numeroLettere = game.rispostaOriginale.length
            await conn.reply(chat, `❌ *Risposta errata!*

💡 *Suggerimento:*
   • Inizia con la lettera *"${primaLettera}"*
   • È composta da *${numeroLettere} lettere*`, m)
        } else if (tentativiRimasti === 2) {
            await conn.reply(chat, `❌ *Risposta errata!*

📝 *Tentativi rimasti:* 
🤔 *Pensa bene alla tua prossima risposta!*`, m)
        } else {
            await conn.reply(chat, `❌ *Risposta errata!*

📝 *Ultimo tentativo rimasto..*`, m)
        }
    }
}

handler.help = ['bandiera']
handler.tags = ['giochi']
handler.command = /^(bandieraEU)$/i
handler.group = true
handler.register = true

export default handler