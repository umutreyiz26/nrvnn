var Jimp = require('jimp');
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

  var user = message.mentions.users.first() || message.author;
      message.channel.startTyping();
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            image.gaussian(3)
            Jimp.read("https://cdn.discordapp.com/attachments/487986135377772545/536529013058043904/Sniper_scope_multiplayer_overlay_WaW.png", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 0, 0).write(`./img/sniper/${bot.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/sniper/${bot.user.id}-${user.id}.png`));
                }, 1000);
          message.channel.stopTyping();
            });
        });
    };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sniper',
  category: 'eğlence',
  description: 'Sniper Efekti Yapar.',
  usage: 'sniper'
};

