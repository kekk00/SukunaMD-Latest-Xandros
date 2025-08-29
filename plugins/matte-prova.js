import fs from 'fs';

const FALLBACK = [
  { modello: "air jordan 4 thunder", nome: "Air Jordan 4 Retro Thunder (2023)", sku: "DH6927-017", prezzo: "280", immagine: "https://images.stockx.com/images/Air-Jordan-4-Retro-Thunder-2023-Product.jpg", link: "https://stockx.com/air-jordan-4-retro-thunder-2023" },
  { modello: "nike dunk low panda", nome: "Nike Dunk Low Retro White Black Panda", sku: "DD1391-100", prezzo: "160", immagine: "https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-Panda-Product.jpg", link: "https://stockx.com/nike-dunk-low-retro-white-black-2021" },
  { modello: "adidas yeezy 350 zebra", nome: "adidas Yeezy Boost 350 V2 Zebra", sku: "CP9654", prezzo: "290", immagine: "https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Zebra-Product.jpg", link: "https://stockx.com/adidas-yeezy-boost-350-v2-zebra" },
  { modello: "air jordan 1 lost and found", nome: "Air Jordan 1 Retro High OG Chicago Lost & Found", sku: "DZ5485-612", prezzo: "400", immagine: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-Lost-and-Found-Product.jpg", link: "https://stockx.com/air-jordan-1-retro-high-og-chicago-lost-and-found" },
  { modello: "travis scott 1 low reverse mocha", nome: "Jordan 1 Retro Low OG SP Travis Scott Reverse Mocha", sku: "DM7866-162", prezzo: "680", immagine: "https://images.stockx.com/images/Air-Jordan-1-Retro-Low-OG-SP-Travis-Scott-Reverse-Mocha-Product.jpg", link: "https://stockx.com/jordan-1-retro-low-og-sp-travis-scott-reverse-mocha" },
  { modello: "nike air force 1 white", nome: "Nike Air Force 1 '07 White", sku: "CW2288-111", prezzo: "120", immagine: "https://images.stockx.com/images/Nike-Air-Force-1-07-White-Product.jpg", link: "https://stockx.com/nike-air-force-1-07-white" },
  { modello: "new balance 550 white green", nome: "New Balance 550 White Green", sku: "BB550WT1", prezzo: "180", immagine: "https://images.stockx.com/images/New-Balance-550-White-Green-Product.jpg", link: "https://stockx.com/new-balance-550-white-green" },
  { modello: "adidas samba og black white", nome: "adidas Samba OG Black White", sku: "B75807", prezzo: "120", immagine: "https://images.stockx.com/images/adidas-Samba-OG-Black-White-Product.jpg", link: "https://stockx.com/adidas-samba-og-black-white" },
  { modello: "air jordan 4 military black", nome: "Air Jordan 4 Retro Military Black", sku: "DH6927-111", prezzo: "430", immagine: "https://images.stockx.com/images/Air-Jordan-4-Retro-Military-Black-Product.jpg", link: "https://stockx.com/air-jordan-4-retro-military-black" },
  { modello: "nike sb dunk low ben and jerrys", nome: "Nike SB Dunk Low Ben & Jerry’s Chunky Dunky", sku: "CU3244-100", prezzo: "1400", immagine: "https://images.stockx.com/images/Nike-SB-Dunk-Low-Ben-Jerrys-Chunky-Dunky-Product.jpg", link: "https://stockx.com/nike-sb-dunk-low-ben-jerrys-chunky-dunky" }
];

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const HEADERS = { "User-Agent": UA, "Accept": "text/html,application/json", "Accept-Language": "en-US,en;q=0.9", "Cache-Control": "no-cache" };

async function fetchHTML(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return await res.text();
}

function safeJsonSlice(html) {
  const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/i);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch { return null; }
}

function deepCollectProducts(obj, acc) {
  if (!obj) return;
  if (Array.isArray(obj)) { for (const it of obj) deepCollectProducts(it, acc); return; }
  if (typeof obj === "object") {
    const keys = Object.keys(obj);
    const looksLike = ("name" in obj) && (("url" in obj) || ("productUrl" in obj) || ("slug" in obj));
    if (looksLike) {
      const name = String(obj.name || "").trim();
      let url = obj.url || obj.productUrl || null;
      if (!url && obj.slug) url = "https://stockx.com/" + obj.slug;
      let image = obj.image || obj.imageUrl || obj.mediaUrl || null;
      let sku = obj.sku || obj.styleId || obj.productId || obj.style || null;
      if (name && url) acc.push({ name, url: url.startsWith("http") ? url : "https://stockx.com" + url, image, sku });
    }
    for (const k of keys) deepCollectProducts(obj[k], acc);
  }
}

async function stockxSearchNames(q) {
  const html = await fetchHTML("https://stockx.com/search?s=" + encodeURIComponent(q));
  const next = safeJsonSlice(html);
  const tmp = [];
  deepCollectProducts(next, tmp);
  const seen = new Set();
  const names = [];
  for (const p of tmp) {
    const n = p.name.trim();
    if (!seen.has(n)) { seen.add(n); names.push({ name: n, url: p.url, image: p.image || null, sku: p.sku || null }); }
  }
  if (names.length) return names;
  const rough = Array.from(html.matchAll(/"name":"([^"]+)"/g)).map(x => ({ name: x[1] }));
  return rough.slice(0, 30);
}

async function stockxFindFirst(query) {
  const results = await stockxSearchNames(query);
  if (!results.length) return null;
  const first = results[0];
  try {
    const html = await fetchHTML(first.url);
    const ld = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)).map(m => m[1]);
    let meta = null;
    for (const block of ld) {
      try {
        const j = JSON.parse(block);
        if (j && (j["@type"] === "Product" || (Array.isArray(j) && j.find(x => x["@type"] === "Product")))) { meta = j; break; }
      } catch {}
    }
    let name = first.name;
    let sku = first.sku || null;
    let image = first.image || null;
    let price = null;
    let url = first.url;
    const take = (o) => {
      if (!o) return;
      if (o.name && !name) name = o.name;
      if (o.sku && !sku) sku = o.sku;
      if (o.image && !image) image = Array.isArray(o.image) ? o.image[0] : o.image;
      if (o.offers && o.offers.price && !price) price = String(o.offers.price);
      if (o.url) url = o.url.startsWith("http") ? o.url : "https://stockx.com" + o.url;
    };
    if (Array.isArray(meta)) meta.forEach(take); else take(meta);
    return { nome: name || query, sku: sku || "N/A", prezzo: price || "N/A", immagine: image || null, link: url };
  } catch {
    return { nome: first.name, sku: first.sku || "N/A", prezzo: "N/A", immagine: first.image || null, link: first.url };
  }
}

const pagerState = new Map();

async function handleScarpe(m, conn, pageArg) {
  const page = Math.max(1, parseInt(pageArg || "1", 10) || 1);
  let names = [];
  try {
    const seed = ["jordan", "dunk", "yeezy", "new balance", "samba"][Math.floor(Math.random() * 5)];
    const res = await stockxSearchNames(seed);
    names = res.map(r => r.name);
  } catch {
    names = FALLBACK.map(x => x.nome);
  }
  if (!names.length) names = FALLBACK.map(x => x.nome);
  const perPage = 5;
  const total = names.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const p = Math.min(page, pages);
  const start = (p - 1) * perPage;
  const slice = names.slice(start, start + perPage);
  pagerState.set(m.chat, names);
  const lista = slice.map((n, i) => `${start + i + 1}. ${n}`).join('\n');
  const msg = `┏━━━━━━━━━━━━┓\n┃  LISTA SCARPE  ┃\n┗━━━━━━━━━━━━┛\nPagina ${p}/${pages}\n\n${lista}\n\nSuggerimento: usa .listino <nome>\nNuove scarpe in arrivo`;
  const buttons = [];
  if (p > 1) buttons.push({ buttonId: `.scarpe ${p - 1}`, buttonText: { displayText: '⬅️ Indietro' }, type: 1 });
  if (p < pages) buttons.push({ buttonId: `.scarpe ${p + 1}`, buttonText: { displayText: '➡️ Avanti' }, type: 1 });
  return conn.sendMessage(m.chat, { text: msg, buttons, footer: 'Seleziona una pagina', headerType: 1 }, { quoted: m });
}

async function handleListino(m, conn, args) {
  if (!args.length) return m.reply('Scrivi solo il nome. Esempio: .listino jordan 4 thunder');
  const q = args.join(' ').trim();
  let found = null;
  try { found = await stockxFindFirst(q); } catch { found = null; }
  if (!found) {
    const f = FALLBACK.find(s => s.nome.toLowerCase().includes(q.toLowerCase()) || s.modello.includes(q.toLowerCase()));
    if (!f) return m.reply('❌ Scarpa non trovata.');
    found = { nome: f.nome, sku: f.sku, prezzo: f.prezzo, immagine: f.immagine, link: f.link };
  }
  const caption = `👟 ${found.nome}\n🆔 SKU: ${found.sku}\n💸 Prezzo: ${found.prezzo}\n🔗 ${found.link}`;
  if (found.immagine && /^https?:\/\//i.test(found.immagine)) {
    return conn.sendMessage(m.chat, { image: { url: found.immagine }, caption }, { quoted: m });
  } else {
    return conn.sendMessage(m.chat, { text: caption }, { quoted: m });
  }
}

let handler = async (m, { conn, args, command }) => {
  try {
    if (/^scarpe$/i.test(command)) {
      const pageArg = args[0] || "1";
      return await handleScarpe(m, conn, pageArg);
    }
    if (/^listino$/i.test(command)) {
      return await handleListino(m, conn, args);
    }
  } catch (e) {
    return m.reply('⚠️ Errore temporaneo. Riprova tra poco.');
  }
};

handler.command = /^(scarpe|listino)$/i;
handler.help = ['scarpe [pagina]', 'listino <nome>'];
handler.tags = ['shop'];

export default handler;