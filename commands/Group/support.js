const { tlang } = require('../../lib')

module.exports = {
    name: 'support',
    category: 'weeb',
    desc: 'Sends Queen Lara Md userbot group link.',
    async exec(citel, Void,args) {
        citel.reply(`*Check your Pm ${tlang().greet}*`);
        await Void.sendMessage(`${citel.sender}`, {
          image: log0,
          caption: `*Group Name: Queen Lara Md-Support*\n*Group Link:* https://chat.whatsapp.com/FXqHL1gyWaP8WAGno9HZgM`,
        });
 
    }
 }
