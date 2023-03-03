const { EmbedBuilder } = require("discord.js");
const Color = require("../../../../common/utils/Color");
const Emoji = require("../../../../common/utils/Emoji");

module.exports = {
  AlrAutoplay: () => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.search} - ᴀᴜᴛᴏᴘʟᴀʏ ɪs ᴀʟʀᴇᴀᴅʏ ᴏɴ`)
      .addFields([
        {
          name: "———",
          value:
            "ʏᴏᴜ ᴄᴀɴ'ᴛ ᴜsɪɴɢ `ʀᴇᴘᴇᴀᴛ` ᴄᴏᴍᴍᴀɴᴅ ᴡʜᴇɴ `ᴀᴜᴛᴏᴘʟᴀʏ` ɪs ᴏɴ.\nᴛᴜʀɴ ɪᴛ **ᴏғғ** ғɪʀsᴛ ʙʏ ᴜsɪɴɢ: `/ᴀᴜᴛᴏᴘʟᴀʏ ᴏғғ`.\n———",
        },
      ])
      .setColor(Color.SECONDARY.DARK)
      .setTimestamp();

    return embed;
  },

  SongRepeatMode: (queue) => {
    const embed = new EmbedBuilder();
    return embed;
  },
};
