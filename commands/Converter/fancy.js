let { tiny,fancytext,listall } = require('../../lib')

module.exports = {
   name: 'fancy',
   category: 'converter',
   desc: 'Makes stylish/fancy given text.',
   use: '5 Omindu Anjana ',
   async exec(citel, Void,args) {
if (isNaN(args[0])){
let text = tiny(
        "Fancy text generator\n\nExample: .fancy 32 Queen Lara Md Userbot\n\n"
      );
      listall("Queen Lara Md").forEach((txt, num) => {
        text += `${(num += 1)} ${txt}\n`;
      });
      return await citel.reply(text);
}
      
	  let fancytextt = await fancytext(`${args.join(" ").slice(2)}`, args[0])
			citel.reply(fancytextt)

   }
}
