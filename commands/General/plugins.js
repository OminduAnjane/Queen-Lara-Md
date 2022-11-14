const axios = require('axios');
const Lara = require('../../lib');
const fs = require('fs-extra')

const { plugins,plugindb, remove, isUrl,cmd } = require('../../lib')

//---------------------------------------------------------------------------

cmd({

        pattern: "plugins",

        category: "owner",

        desc: "Shows list of all externally installed modules"

    },

    async(Void, citel, text, { isCreator }) => {

        const { tlang } = require('../../lib')

        if (!isCreator) return citel.reply(tlang().owner)

        let allmodtext = `*All Installed Modules are:-*\n\n`

        allmodtext += await plugins()

        citel.reply(allmodtext)

    }

)

//---------------------------------------------------------------------------

cmd({

        pattern: "remove",

        category: "owner",

        desc: "removes external modules."

    },

    async(Void, citel, text,{ isCreator}) => {

        if (!isCreator) return citel.reply(tlang().owner)

        if(text==='all') {

         await plugindb.collection.drop()

         return citel.reply('Deleted all plugins from Secktor.')

        }

        let kill = await remove(text.split(" ")[0])

        return citel.reply(kill)

    }

)

//---------------------------------------------------------------------------

cmd({

        pattern: "install",

        category: "owner",

        desc: "Installs external modules.."
  },
    
  Lara.addCommand({pattern: 'install ?(.*)', fromMe: true, desc: Lang.INSTALL_DESC, usage: '.install https://gist.github.com/Quiec/cd5af0c153a613ba55c24f8c6b6f5565'}, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage('```' + Lang.NEED_URL + '.install https://gist.github.com/Quiec/cd5af0c153a613ba55c24f8c6b6f5565```')

    try {

        var url = new URL(match[1]);

    } catch {

        return await message.sendMessage(Lang.INVALID_URL);

    }

    

    if (url.host === 'gist.github.com') {

        url.host = 'gist.githubusercontent.com';

        url = url.toString() + '/raw'

    } else {

        url = url.toString()

    }

    var response = await got(url);

    if (response.statusCode == 200) {

        // plugin adı

        var plugin_name = response.body.match(/addCommand\({.*pattern: ["'](.*)["'].*}/);

        if (plugin_name.length >= 1) {

            plugin_name = "__" + plugin_name[1];

        } else {

            plugin_name = "__" + Math.random().toString(36).substring(8);

        }

        fs.writeFileSync('./plugins/' + plugin_name + '.js', response.body);

        try {

            require('./' + plugin_name);

        } catch (e) {

            fs.unlinkSync('./' + plugin_name);

            return await message.sendMessage(Lang.INVALID_PLUGIN + ' ```' + e + '```');

        }

        await Db.installPlugin(url, plugin_name);

        await message.client.sendMessage(message.jid, Lang.INSTALLED, MessageType.text);

    }

}));

Lara.addCommand({pattern: 'plugin', fromMe: true, desc: Lang.PLUGIN_DESC}, (async (message, match) => {

    var mesaj = Lang.INSTALLED_FROM_REMOTE;

    var plugins = await Db.PluginDB.findAll();

    if (plugins.length < 1) {

        return await message.sendMessage(Lang.NO_PLUGIN);

    } else {

        plugins.map(

            (plugin) => {

                mesaj += '*' + plugin.dataValues.name + '*: ' + plugin.dataValues.url + '\n';

            }

        );

        return await message.client.sendMessage(message.jid, mesaj, MessageType.text);

    }

}));

Lara.addCommand({pattern: 'remove(?: |$)(.*)', fromMe: true, desc: Lang.REMOVE_DESC}, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_PLUGIN);

    if (!match[1].startsWith('__')) match[1] = '__' + match[1];

    var plugin = await Db.PluginDB.findAll({ where: {name: match[1]} });

    if (plugin.length < 1) {

        return await message.sendMessage(message.jid, Lang.NOT_FOUND_PLUGIN, MessageType.text);

    } else {

        await plugin[0].destroy();

        delete require.cache[require.resolve('./' + match[1] + '.js')]

        fs.unlinkSync('./plugins/' + match[1] + '.js');

        return await message.client.sendMessage(message.jid, Lang.DELETED, MessageType.text);

    }

}));
