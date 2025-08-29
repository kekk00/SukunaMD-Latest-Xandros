// antinuke.js
export async function onGroupUpdate(update, conn, db) {
    const m = update;
    
    // Controllo se la funzione antinuke è attiva
    let chat = db.data.chats[m.chat];
    if (!chat?.antinuke) return;

    const chatId = m.chat;
    const botNumber = global.botnumber + '@s.whatsapp.net';
    const ownersBot = global.owner.map(o => o[0] + '@s.whatsapp.net');

    // Rileva se è un aggiornamento di partecipante
    if (!m.participants || !m.action) return;

    const action = m.action; // 'promote' o 'demote'
    const executor = m.actor;

    for (let participant of m.participants) {
        // Ignora il bot stesso
        if (participant === botNumber) continue;

        // Ignora gli Owner
        if (ownersBot.includes(executor)) continue;

        // Se la modifica riguarda un Owner, ripristina subito
        if (ownersBot.includes(participant)) {
            if (action === 'demote') {
                await conn.groupParticipantsUpdate(chatId, [participant], 'promote');
            }
            continue;
        }

        // Anti-nuke: ripristina l’azione e manda alert
        const correctAction = action === 'promote' ? 'demote' : 'promote';
        await conn.groupParticipantsUpdate(chatId, [participant], correctAction);

        // Nome di chi ha eseguito l’azione
        let executorName;
        try {
            executorName = await conn.getName(executor);
        } catch {
            executorName = executor;
        }

        const txt = `🛡️ ANTINUKE ATTIVO!
${executorName} (${executor}) ha provato a modificare gli admin senza permessi!`;

        await conn.sendMessage(chatId, { text: txt });
    }
}

// Intercetta anche i comandi bot per promozione/retrocesso
export async function onCommandExecute(command, m, conn, db) {
    if (!db.data.chats[m.chat]?.antinuke) return;

    const botNumber = global.botnumber + '@s.whatsapp.net';
    const ownersBot = global.owner.map(o => o[0] + '@s.whatsapp.net');

    const executor = m.sender;
    const commandName = command?.command?.toLowerCase();

    if (!['promuovi', 'p', 'mettiadmin', 'retrocedi', 'r', 'togliadmin'].includes(commandName)) return;

    // Ignora il bot stesso e gli owner
    if (executor === botNumber || ownersBot.includes(executor)) return;

    let target = m.quoted?.sender || (m.mentionedJid && m.mentionedJid[0]) || m.text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    if (!target) return;

    // Se il target è Owner, ripristina
    if (ownersBot.includes(target)) {
        await conn.groupParticipantsUpdate(m.chat, [target], 'promote');
        await conn.sendMessage(m.chat, { text: `🛡️ ANTINUKE: Gli Owner non possono essere retrocessi!` });
        return;
    }

    // Altri utenti: blocca e manda alert
    await conn.sendMessage(m.chat, { text: `🛡️ ANTINUKE: ${executor} (${await conn.getName(executor)}) ha provato a modificare gli admin senza permessi!` });
    // Ripristina il target se necessario
    const restoreAction = commandName.startsWith('r') ? 'promote' : 'demote';
    await conn.groupParticipantsUpdate(m.chat, [target], restoreAction);
}