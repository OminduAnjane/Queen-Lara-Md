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
                displayText: "đŦ Video",
            },
            type: 1,
    },
        {
            buttonId: `${prefix}ytmp3 ${anu.url}`,
            buttonText: {
                displayText: "đļ Audio",
            },
            type: 1,
    },
        {

            url: `${prefix}ytmp3 ${anu.url}`,

            buttonText: {

                displayText: "đļ Audio",

            },

            type: "url",
  ];
    let buttonMessage = {
        image: {
            url: anu.thumbnail,
        },
        caption: `
â­ââââââââââââââââ
âđŠ *${tlang().title} Youtube Player* â¨
â
âđ *Title:* ${anu.title}
ââ° *Duration:* ${anu.timestamp}
âđ *Viewers:* ${anu.views}
âđ¤ *Uploaded:* ${anu.ago}
âđđģ ${anu.Likes} ${like}\n\n +
âđ¤ *Author:* ${anu.author.name}
âđ *Url* : ${anu.url}
ââšī¸ *Category* : ${anu.Category} ${ytVidInfo.category}\n\n +
âđ *Description* : ${anu.Description}\n${ytVidInfo.description}
â°âââââââââââââââââ
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

