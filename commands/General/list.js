const discordjs = require("@discordjs/collection")
const moment = require("moment-timezone")
const fs = require("fs")
const Config = require('../../config')
let { fancytext,fancy,botpic,tlang,runtime,formatp } = require("../../lib");
const os = require('os')
module.exports = {
    name: "list",
    alias: ["l", "cmdlist", "listmenu"],
    category: "general",
    async exec(citel, Void, args,pushname) {
const prefix = Config.prefix       
const { commands } = discordjs;
 const cmds = commands.keys()
            let category = [];
            for (let cmd of cmds) {
                let info = commands.get(cmd);
                if (!cmd) continue;
category.push(info)
  }
let str = `
╭━━〘 `+ fancytext(Config.botname.split(' ')[0],58) +` 〙━━──⊷`      
str += `
┃ 💻╭──────────────      
┃ 👩‍💻│ *User:-* ${citel.pushName}
┃ 🧑‍💻│ *Theme:-* ${tlang().title}
┃ 📑│ *Prefix:-* ${Config.prefix}
┃ 📒│ *Owner:-* _${Config.ownername}_
┃ ◼│ *Commands:* _${category.length}_
┃ 🔏│ *Uptime:* _${runtime(process.uptime())}_
┃ 🔃│ *Mem -* _${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}_
┃ 🧰│  
┃ 📘╰───────────
╰━━━━━━━━━━━──⊷\n`
str += `╭━━━━━━━━━━━────⊷\n`
str += `┃ 💻 ╭─────────────\n`
for (let i = 0; i < category.length; i++ ) {
  str+=`┃ 📓 │ ➛ ${i+1}. `+category[i].name+'\n'
}
str += `┃ 🪄 ╰─────────────\n`
str += `╰━━━━━━━━━━━───⊷\n`
Void.sendMessage(citel.chat,{ image: { url : process.env.THUMB_IMAGE },caption: str})
}
}
