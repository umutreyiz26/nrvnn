const ms = require('ms');
const ayarlar = require('../ayarlar.json');



var prefix = ayarlar.prefix

exports.run = (client, message, args) => {
    let mlg = message.guild.channels.find("name", "mod-log")
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyar� :warning:', '`kilit` adl� komutu �zel mesajlarda kullanamazs�n.')
  return message.author.sendEmbed(ozelmesajuyari); }
  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return message.reply(':arrows_counterclockwise: **Ge�ersiz ��lem** \n Do�ru kullan�m: ' + prefix + 'kilit <s�re �rne�in: 2 min>');

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      message.channel.send('Kanal kilidi a��ld�.');
      mlg.send(`${message.channel} Adl� Kanal Kilidi Ba�ar�yla a��ld�`)
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.send(`:white_check_mark: **Ba�ar�l� ��lem!** \n ${message.channel} Adl� Kanal Ba�ar�yla kilitlendi. ${ms(ms(time), { long:true })}`).then(() => {
        mlg.send(`${message.channel} Adl� Kanal **Kilit**lendi  (**${ms(ms(time), { long:true })}**)`)
        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.send(`:checkered_flag:  **Sorunsuz ��lem** \n ${message.channel} �simli Kanal�n kilidi a��ld�.`)).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });
    });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ld'],
  permLevel: 3
};

exports.help = {
  name: 'kilit',
  description: 'Kanal� istedi�iniz kadar s�reyle kitler.',
  usage: 'kilit <s�re>'
};