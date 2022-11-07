
const { tlang,botpic } = require('../../lib')
module.exports = {
    name: 'repo',
    category: 'general',
    alias: ["script", "git", "sc"],
    desc: 'Sends Queen Lara Md github repo link.',
    async exec(citel, Void) {
        
        let buttonMessaged = {
            image: { url: await botpic() },
            caption: `Hey ${citel.pushName}\n*This is Secktor Repo*\n\n*Repo:* https://github.com/OminduAnjane/Queen-Lara-Md\n\n*Whatsapp Group:* https://chat.whatsapp.com/Bl2F9UTVU4CBfZU6eVnrbCl\n\n*Deploy Your Own:*-\nwabot.queenlora/deply `,
            footer: ` ` + tlang().footer,
            headerType: 4,
            contextInfo: {
              externalAdReply: {
                title: "Queen Lara-Repo",
                body: "Easy to Use",
                thumbnail: log0,
                mediaType: 2,
                mediaUrl: `https://github.com/OminduAnjane/Queen-Lara-Md`,
                sourceUrl: `https://github.com/OminduAnjane/Queen-Lara-Md`,
              },
            },
          };
          await Void.sendMessage(citel.chat, buttonMessaged, {
            quoted: citel,
          });
 
    }
 }
      
