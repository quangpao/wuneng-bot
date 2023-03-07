const { EmbedBuilder } = require("discord.js");
const Color = require("../../../../common/utils/Color");
const Emoji = require("../../../../common/utils/Emoji");

module.exports = {
  VolumeInfo: (number, up = true) => {
    const embed = new EmbedBuilder()
      .setTitle(`${up ? Emoji.volume : Emoji.lowVolume} - ᴠᴏʟᴜᴍᴇ ɪɴғᴏᴍᴀᴛɪᴏɴ`)
      .setDescription(`sᴏɴɢ ᴠᴏʟᴜᴍᴇ ᴄᴏɴᴛʀᴏʟʟᴇʀ`)
      .addFields([
        {
          name: "———",
          value: `ᴠᴏʟᴜᴍᴇ: [${number}/100]\n**${volumeBar(number)}**\n———`,
        },
      ])
      .setColor(Color.INFO.DARK)
      .setTimestamp();

    return embed;
  },
};

function volumeBar(number) {
  let mask = "───────────────────";
  const position = parseInt(number / 5);
  mask = mask.slice(0, position) + "●" + mask.slice(position);

  return mask;
}
