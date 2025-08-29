let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, {
        text: 'by Kekko', // credits invisibili
        interactiveButtons: [
            {
                name: 'payment_info',
                buttonParamsJson: JSON.stringify({
                    payment_settings: [
                        {
                            type: 'pix_static_code',
                            pix_static_code: {
                                merchant_name: 'Kekko',
                                key: '+393297570233',
                                key_type: 'PHONE'
                            }
                        }
                    ]
                })
            }
        ]
    }, { quoted: m });
};

handler.command = /^assistenzakekko$/i;

export default handler;