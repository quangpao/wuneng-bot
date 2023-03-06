const { EmbedBuilder } = require("discord.js");
const Color = require("../../../../common/utils/Color");
const Emoji = require("../../../../common/utils/Emoji");

module.exports = {
  ShuffeItSelf: () => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.shuffle} - sʜᴜғғʟᴇᴅ`)
      .setDescription("ʏᴏᴜ sʜᴜғғʟᴇᴅ ᴛʜᴇ sᴏɴɢ ᴡɪᴛʜ ɪᴛ sᴇʟғ... ʙᴜᴛ ᴡʜʏ?")
      .setColor(Color.ERROR.DARK)
      .setTimestamp();
    return embed;
  },
};
