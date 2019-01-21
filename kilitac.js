const ms = require('ms');
const ayarlar = require('../ayarlar.json');



var prefix = ayarlar.prefix

exports.run = (client, message, args) => {
    let mlg = message.guild.channels.find("name", "mod-log")

    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: true
    }).then(() => {
      message.channel.send(`:white_check_mark: **Ba�ar�l� ��lem** \n Kanal�n kilidi ${message.author.username} Taraf�ndan Ba�ar�yla a��ld�!`);
      mlg.send(`${message.channel} Adl� Kanal Kilidi Ba�ar�yla ${message.author.username} Taraf�ndan a��ld�`)

    }).catch(error => {
      console.log(error);
    });
  };
   exports.conf = {
     enabled: true,
     guildOnly: false,
     aliases: ['unlock', 'kilita�'],
     permLevel: 3
   };
   
   exports.help = {
     name: 'kilita�',
     description: 'Odan�n Kilidini Kald�r�r',
     usage: 'kilita�'
   };