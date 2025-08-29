import { db } from './db.js';

export async function trackMessage(m, conn) {
  if (!m.key?.remoteJid?.endsWith('@g.us')) return; // solo gruppi

  let chatId = m.key.remoteJid;
  let data = db.load();

  if (!data.gruppi[chatId]) {
    data.gruppi[chatId] = { nome: '', membri: 0, messaggi: 0 };
  }

  // incrementa i messaggi
  data.gruppi[chatId].messaggi++;

  try {
    let meta = await conn.groupMetadata(chatId);
    data.gruppi[chatId].membri = meta.participants.length;
    data.gruppi[chatId].nome = meta.subject || chatId;
  } catch (e) {
    console.log("❌ Errore nel leggere i membri:", e.message);
  }

  db.save(data);

  console.log(
    `💾 [${new Date().toLocaleTimeString()}] Salvato gruppo: ${data.gruppi[chatId].nome || chatId}\n` +
    `   → Messaggi: ${data.gruppi[chatId].messaggi}\n` +
    `   → Membri: ${data.gruppi[chatId].membri}`
  );
}