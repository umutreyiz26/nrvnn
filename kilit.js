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
  .addField(':warning: Uyarý :warning:', '`kilit` adlý komutu özel mesajlarda kullanamazsýn.')
  return message.author.sendEmbed(ozelmesajuyari); }
  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return message.reply(':arrows_counterclockwise: **Geçersiz Ýþlem** \n Doðru kullaným: ' + prefix + 'kilit <süre örneðin: 2 min>');

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      message.channel.send('Kanal kilidi açýldý.');
      mlg.send(`${message.channel} Adlý Kanal Kilidi Baþarýyla açýldý`)
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.send(`:white_check_mark: **Baþarýlý Ýþlem!** \n ${message.channel} Adlý Kanal Baþarýyla kilitlendi. ${ms(ms(time), { long:true })}`).then(() => {
        mlg.send(`${message.channel} Adlý Kanal **Kilit**lendi  (**${ms(ms(time), { long:true })}**)`)
        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.send(`:checkered_flag:  **Sorunsuz Ýþlem** \n ${message.channel} Ýsimli Kanalýn kilidi açýldý.`)).catch(console.error);
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
  description: 'Kanalý istediðiniz kadar süreyle kitler.',
  usage: 'kilit <süre>'
};