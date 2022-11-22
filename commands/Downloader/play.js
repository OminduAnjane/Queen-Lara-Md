const { tlang } = require('../../lib')
const { prefix } = require('../../config')
const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
const isYT = ytIdRegex.exec(input)
module.exports = {
    name: "play",
    alias: ['searchyt','ytsearch'],
    category: 'downloader',
    desc: 'Sends info about the query(of youtube video/audio).',
    use: '<text>',
    async exec(citel, Void,args,command) {
    if (!args.join(" ")) return citel.reply(`Use ${command} Back in Black`);
    let yts = require("yt-search");
    let search = await yts(args.join(" "));
    let anu = search.videos[0];
    let ytVidInfo = (await ytdl.getInfo(input)).videoDetails
    let buttons = [
        {
            buttonId: `${prefix}ytmp4 ${anu.url}`,
            buttonText: {
                displayText: "🎬 Video",
            },
            type: 1,
    },
        {
            buttonId: `${prefix}ytmp3 ${anu.url}`,
            buttonText: {
                displayText: "🎶 Audio",
            },
            type: 1,
    },
  ];
    let buttonMessage = {
        image: {
            url: anu.thumbnail,
        },
        caption: `
╭───────────────◆
│🎩 *${tlang().title} Youtube Player* ✨
│
│🌐 *Title:* ${anu.title}
│⏰ *Duration:* ${anu.timestamp}
│📗 *Viewers:* ${anu.views}
│📤 *Uploaded:* ${anu.ago}
│👍🏻 ${anu.Likes} ${like}\n\n +
│👤 *Author:* ${anu.author.name}
│📃 *Url* : ${anu.url}
│ℹ️ *Category* : ${anu.Category} ${ytVidInfo.category}\n\n +
│📖 *Description* : ${anu.Description}\n${ytVidInfo.description}
╰────────────────◆
`,
        footer: tlang().footer,
        buttons: buttons,
        headerType: 4,
    };
    Void.sendMessage(citel.chat, buttonMessage, {
        quoted: citel,
    });
 
    }
 }

