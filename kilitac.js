const ms = require('ms');
const ayarlar = require('../ayarlar.json');



var prefix = ayarlar.prefix

exports.run = (client, message, args) => {
    let mlg = message.guild.channels.find("name", "mod-log")

    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: true
    }).then(() => {
      message.channel.send(`:white_check_mark: **Baþarýlý Ýþlem** \n Kanalýn kilidi ${message.author.username} Tarafýndan Baþarýyla açýldý!`);
      mlg.send(`${message.channel} Adlý Kanal Kilidi Baþarýyla ${message.author.username} Tarafýndan açýldý`)

    }).catch(error => {
      console.log(error);
    });
  };
   exports.conf = {
     enabled: true,
     guildOnly: false,
     aliases: ['unlock', 'kilitaç'],
     permLevel: 3
   };
   
   exports.help = {
     name: 'kilitaç',
     description: 'Odanýn Kilidini Kaldýrýr',
     usage: 'kilitaç'
   };