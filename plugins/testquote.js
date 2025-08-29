// plugins/cercapl.mjs
import { join } from 'path';
import { readdirSync, statSync, readFileSync } from 'fs';

const toBold = (str) => {
    const boldChars = {
        a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', 
        j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', 
        s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
        A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', 
        J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', 
        S: '𝗦', T: '𝗧', U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭', 
        0: '𝟬', 1: '𝟭', 2: '𝟮', 3: '𝟯', 4: '𝟰', 5: '𝟱', 6: '𝟲', 7: '𝟳', 8: '𝟴', 9: '𝟵'
    };
    return str.split('').map(c => boldChars[c] || c).join('');
};

const formatFileSize = (size) => {
    const units = ['B', 'KB', 'MB'];
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
        size /= 1024;
        i++;
    }
    return `${size.toFixed(1)}${units[i]}`;
};

let handler = async (m, { __dirname, args }) => {
    try {
        if (!args[0]) return m.reply('🔍 Specifica una stringa da cercare. Es: .cercapl gay');

        const searchTerm = args.join(' ').toLowerCase();
        const pluginsPath = join(__dirname, '../plugins');
        const files = readdirSync(pluginsPath).filter(f => f.endsWith('.js') || f.endsWith('.mjs'));

        let results = [];

        for (const file of files) {
            const filePath = join(pluginsPath, file);
            const content = readFileSync(filePath, 'utf8');
            const lines = content.split('\n');
            const stats = statSync(filePath);
            const sizeKB = (stats.size / 1024).toFixed(1);

            lines.forEach((line, index) => {
                const col = line.toLowerCase().indexOf(searchTerm);
                if (col !== -1) {
                    results.push(`file: ${file}\nrigo: ${index + 1}:${col + 1}\npeso: ${sizeKB}KB`);
                }
            });
        }

        if (results.length === 0) return m.reply(`❌ Nessun comando trovato per: ${toBold(searchTerm)}`);

        // Limitiamo il messaggio a 4000 caratteri (WhatsApp)
        let replyText = results.join('\n\n');
        if (replyText.length > 4000) replyText = replyText.slice(0, 3997) + '...';

        m.reply(replyText);

    } catch (err) {
        m.reply(`⛔ Errore: ${err.message}`);
    }
};

handler.help = ['cercapl <string>'];
handler.tags = ['owner'];
handler.command = /^cercapl$/i;
handler.owner = true;

export default handler;