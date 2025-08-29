import fs from 'fs';
import path from 'path';
import yts from 'yt-search';
import ytdl from 'ytdl-core';

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text || !text.trim()) 
      return conn.reply(m.chat, '💣 Inserisci il nome del video o audio.', m);

    // Cerca il video su YouTube
    const search = await yts(text);
    if (!search.all.length) return m.reply('Nessun risultato trovato.');

    const video = search.all[0];
    const { title, url, thumbnail } = video;

    // Recupera thumbnail
    const thumb = (await conn.getFile(thumbnail))?.data;

    await conn.sendMessage(m.chat, { text: '_🌐 Download in corso, attendere..._' }, { quoted: m });

    // Percorso file temporaneo
    const tmpDir = './tmp';
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
    const filePath = path.join(tmpDir, `${Date.now()}.${command === 'play1' ? 'mp3' : 'mp4'}`);

    // Stream con ytdl
    const streamOptions = command === 'play1' 
      ? { filter: 'audioonly', quality: 'highestaudio' } 
      : { quality: 'highestvideo' };

    const writeStream = fs.createWriteStream(filePath);
    ytdl(url, streamOptions).pipe(writeStream);

    writeStream.on('finish', async () => {
      if (command === 'play1') {
        await conn.sendMessage(m.chat, {
          audio: fs.readFileSync(filePath),
          mimetype: 'audio/mpeg',
          fileName: `${title}.mp3`,
          caption: `🎵 ${title}`,
          thumbnail: thumb
        }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, {
          video: fs.readFileSync(filePath),
          mimetype: 'video/mp4',
          fileName: `${title}.mp4`,
          caption: `🎬 ${title}`,
          thumbnail: thumb
        }, { quoted: m });
      }
      fs.unlinkSync(filePath); // elimina file temporaneo
    });

    writeStream.on('error', err => {
      console.error(err);
      m.reply('⚠️ Errore durante il download del file.');
    });

  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, `⚠️ Errore: ${error.message}`, m);
  }
};

handler.command = handler.help = ['play1', 'play2', 'ytmp4'];
handler.tags = ['downloader'];

export default handler;