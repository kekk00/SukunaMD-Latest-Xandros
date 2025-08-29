import fs from 'fs';

const FILE = './db.json';

export const db = {
  load() {
    if (!fs.existsSync(FILE)) {
      return { gruppi: {} };
    }
    return JSON.parse(fs.readFileSync(FILE, 'utf8'));
  },

  save(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  }
};