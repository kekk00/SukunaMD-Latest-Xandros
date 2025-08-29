import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('*[ ℹ️ ] Inserisci il testo da cercare su Xnxx*');

  try {
    const jid = m.chat;
    const searchUrl = `https://www.xnxx.com/search/${encodeURIComponent(text)}`;

    const html = await fetch(searchUrl, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      }
    }).then(res => res.text());

    const $ = cheerio.load(html);
    const cards = [];

    $('a[href^="/video-"]').slice(0, 15).each((i, el) => {
      const link = 'https://www.xnxx.com' + $(el).attr('href');

      // Titolo resiliente
      let title = $(el).attr('title')?.trim() || '';
      if (!title) title = $(el).find('div.title').text().trim();
      if (!title) title = $(el).find('strong').text().trim();
      if (!title) title = $(el).text().trim();
      if (!title) title = 'Titolo non disponibile';

      // Thumbnail: usa solo data-src o src come prima
      const thumbnail = $(el).find('img').attr('data-src') || $(el).find('img').attr('src') || '';

      // Info extra
      const info = $(el).find('.metadata').text().trim() || '';

      // Aggiungi card solo se c'è link e thumbnail
      if (link && thumbnail) {
        cards.push({
          image: { url: thumbnail },
          title,
          body: info,
          footer: `${link}`,
          buttons: [
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({ display_text: 'Guarda Video', url: link })
            }
          ]
        });
      }
    });

    if (cards.length === 0) return m.reply('*[ ❌ ] Nessun risultato trovato. Prova a ispezionare la pagina per aggiornare i selettori.*');

    await conn.sendMessage(
      jid,
      {
        text: `Risultati per: ${text}`,
        title: '',
        subtitle: 'Risultati della ricerca',
        footer: '❀',
        cards
      },
      { quoted: m }
    );

  } catch (err) {
    console.error(err);
    m.reply('*[ ❌ ] Errore nel recuperare i risultati. Potrebbe essere dovuto a cambiamenti nel sito o blocchi.*');
  }
};

handler.command = ['xnxxs', 'xnxxsearch'];
handler.premium = false;

export default handler;