let handler = async (_0x534187, {
  conn: _0x1226e2,
  usedPrefix: _0x1705f8,
  command: _0x13a6ba,
  args: _0x2dbd57,
  isOwner: _0x4b91af,
  isAdmin: _0x54956f,
  isROwner: _0x267760
}) => {
  const _0x42342c = ("> 𝐃𝐢𝐠𝐢𝐭𝐚 " + _0x1705f8 + "𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐢 𝐩𝐞𝐫 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞𝐥𝐥𝐞 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐢 𝐚𝐭𝐭𝐢𝐯𝐚𝐛𝐢𝐥𝐢 / 𝐝𝐢𝐬𝐚𝐭𝐭𝐢𝐯𝐚𝐛𝐢𝐥𝐢 ").trim();
  let _0x152cab = /true|Enable|attiva|(turn)?on|1/i.test(_0x13a6ba);
  let _0x2bc059 = global.db.data.chats[_0x534187.chat];
  let _0x3a892f = global.db.data.settings[_0x1226e2.user.jid] || {};
  let _0x582955 = (_0x2dbd57[0] || '').toLowerCase();
  let _0x56f892 = false;
  switch (_0x582955) {
    case "benvenuto":
      if (!_0x534187.isGroup) {
        if (!_0x4b91af) {
          global.dfail("group", _0x534187, _0x1226e2);
          throw false;
        }
      } else {
        if (!_0x54956f) {
          global.dfail("admin", _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.welcome = _0x152cab;
      break;
    case 'detect':
      if (!_0x534187.isGroup) {
        if (!_0x4b91af) {
          global.dfail("group", _0x534187, _0x1226e2);
          throw false;
        }
      } else {
        if (!_0x54956f) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.detect = _0x152cab;
      break;
    case "delete":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059["delete"] = _0x152cab;
      break;
    case "chatgpt":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.chatgpt = _0x152cab;
      break;
    case 'bestemmiometro':
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.bestemmiometro = _0x152cab;
      break;
    case 'comandieseguiti':
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.comandieseguiti = _0x152cab;
      break;
    case "antielimina":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.antielimina = !_0x152cab;
      break;
    case "public":
      _0x56f892 = true;
      if (!_0x267760) {
        global.dfail("rowner", _0x534187, _0x1226e2);
        throw false;
      }
      global.opts.self = !_0x152cab;
      break;
    case 'antilink':
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.antiLink = _0x152cab;
      break;
    case "antilinkgp":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail("admin", _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.antilinkbase = _0x152cab;
      break;
    case "antilinkhard":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.antilinkbase2 = _0x152cab;
      break;
    case 'autosticker':
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.autosticker = _0x152cab;
      break;
    case "antispam":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.antiSpam = _0x152cab;
      break;
    case "antiviewonce":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.antiviewonce = _0x152cab;
      break;
    case "modoadmin":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail("admin", _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.soloadmin = _0x152cab;
      break;
    case 'audios':
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.audios = _0x152cab;
      break;
    case "restrict":
      _0x56f892 = true;
      if (!_0x4b91af) {
        global.dfail('owner', _0x534187, _0x1226e2);
        throw false;
      }
      _0x3a892f.restrict = _0x152cab;
      break;
    case "jadibot":
      _0x56f892 = true;
      if (!_0x4b91af) {
        global.dfail('owner', _0x534187, _0x1226e2);
        throw false;
      }
      _0x3a892f.jadibot = _0x152cab;
      break;
    case 'autoread':
      _0x56f892 = true;
      if (!_0x267760) {
        global.dfail("rowner", _0x534187, _0x1226e2);
        throw false;
      }
      global.opts.autoread = _0x152cab;
      break;
    case 'pconly':
    case "soloprivato":
      _0x56f892 = true;
      if (!_0x267760) {
        global.dfail("rowner", _0x534187, _0x1226e2);
        throw false;
      }
      global.opts.pconly = _0x152cab;
      break;
    case "gconly":
    case "sologruppo":
      _0x56f892 = true;
      if (!_0x267760) {
        global.dfail("rowner", _0x534187, _0x1226e2);
        throw false;
      }
      global.opts.gconly = _0x152cab;
      break;
    case "swonly":
    case "statusonly":
      _0x56f892 = true;
      if (!_0x267760) {
        global.dfail("rowner", _0x534187, _0x1226e2);
        throw false;
      }
      global.opts.swonly = _0x152cab;
      break;
    case "anticall":
      _0x56f892 = true;
      if (!_0x267760) {
        global.dfail("rowner", _0x534187, _0x1226e2);
        throw false;
      }
      _0x3a892f.antiCall = _0x152cab;
      break;
    case "antiprivato":
      _0x56f892 = true;
      if (!_0x267760) {
        global.dfail("rowner", _0x534187, _0x1226e2);
        throw false;
      }
      _0x3a892f.antiPrivate = _0x152cab;
      break;
    case 'gpt':
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.gpt = _0x152cab;
      break;
    case "antitrava":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.antiTraba = _0x152cab;
      break;
    case 'risposte':
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.risposte = _0x152cab;
      break;
    case "antiinsta":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail("admin", _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.antiinsta = _0x152cab;
    case "antitiktok":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.antitiktok = _0x152cab;
      break;
    case "antitelegram":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.antitelegram = _0x152cab;
      break;
    case "antiporno":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.antiporno = _0x152cab;
    case "antipaki":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) {
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      case "antiflood":
      if (_0x534187.isGroup) {
        if (!(_0x54956f || _0x4b91af)) { // solo admin o owner
          global.dfail('admin', _0x534187, _0x1226e2);
          throw false;
        }
      }
      _0x2bc059.antiflood = _0x152cab;
      break;
      case "antinuke":
  _0x56f892 = true
  if (!_0x267760) { // isROwner
    global.dfail("rowner", _0x534187, _0x1226e2)
    throw false
  }
  _0x2bc059.antinuke = _0x152cab // on/off
  break
      
      _0x2bc059.antiArab = _0x152cab;
      break;
      
    default:
      let _0x15ff44 = {
        'key': {
          'participants': "0@s.whatsapp.net",
          'fromMe': false,
          'id': 'Halo'
        },
        'message': {
          'locationMessage': {
            'name': "𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐧𝐨𝐧 𝐭𝐫𝐨𝐯𝐚𝐭𝐨 ✗",
            'jpegThumbnail': fs.readFileSync("./settings.png"),
            'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=15395490858:+1 (539) 549-0858\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
          }
        },
        'participant': "0@s.whatsapp.net"
      };
      if (!/[01]/.test(_0x13a6ba)) {
        return await _0x1226e2.sendMessage(_0x534187.chat, {
          'text': _0x42342c
        }, {
          'quoted': _0x15ff44
        });
      }
      throw false;
  }
  let _0xd796cd = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': 'Halo'
    },
    'message': {
      'locationMessage': {
        'name': "𝐒𝐭𝐚𝐭𝐨 𝐚𝐭𝐭𝐮𝐚𝐥𝐞 𝐝𝐞𝐥𝐥𝐚 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐞 »",
        'jpegThumbnail': await (await fetch('https://telegra.ph/file/de558c2aa7fc80d32b8c3.png')).buffer(),
        'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=15395490858:+1 (539) 549-0858\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
      }
    },
    'participant': "0@s.whatsapp.net"
  };
  let _0x20fab7 = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': 'Halo'
    },
    'message': {
      'locationMessage': {
        'name': "𝐒𝐭𝐚𝐭𝐨 𝐚𝐭𝐭𝐮𝐚𝐥𝐞 𝐝𝐞𝐥𝐥𝐚 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐞 »",
        'jpegThumbnail': await (await fetch("https://telegra.ph/file/00edd0958c94359540a8f.png")).buffer(),
        'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=15395490858:+1 (539) 549-0858\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
      }
    },
    'participant': "0@s.whatsapp.net"
  };
  _0x1226e2.reply(_0x534187.chat, "𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐞 𝐌𝐨𝐝𝐢𝐟𝐢𝐜𝐚𝐭𝐚 » _" + _0x582955 + '_\n> 𝐏𝐞𝐫 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐢 𝐭𝐮𝐭𝐭𝐞 𝐥𝐞 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐢 𝐦𝐨𝐝𝐢𝐟𝐢𝐜𝐚𝐛𝐢𝐥𝐢 𝐞𝐬𝐞𝐠𝐮𝐢 .𝐦𝐞𝐧𝐮𝐬𝐢𝐜𝐮𝐫𝐞𝐳𝐳𝐚', null, {
    'quoted': _0x152cab ? _0x20fab7 : _0xd796cd
  });
};
handler.help = ["attiva", "disabilita"].map(_0x284db7 => _0x284db7 + "<option>");
handler.tags = ["group", "owner"];
handler.command = /^((attiva|disabilita)|(turn)?[01])$/i;
export default handler;