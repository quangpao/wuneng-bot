const { EmbedBuilder } = require("discord.js");
const { ERROR } = require("../utils/Color");

module.exports = {
  InsufficientPermissionEmbedBuilder: (permission) => {
    const embed = new EmbedBuilder()
      .setTitle("ɪɴsᴜғғɪᴄɪᴇɴᴛ ᴘᴇʀᴍɪssɪᴏɴ")
      .setDescription(
        `ᴛʜᴇ ʙᴏᴛ ɴᴇᴇᴅ ${permission} ᴘᴇʀᴍɪssɪᴏɴ ᴛᴏ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ`
      )
      .setColor(ERROR.LIGHT);
    return embed;
  },

  NotInVoiceChannelEmbedBuilder: () => {
    const embed = new EmbedBuilder()
      .setTitle("ɴᴏᴛ ɪɴ ᴀ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ")
      .setDescription("ᴘʟᴇᴀsᴇ ᴊᴏɪɴ ᴀ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ ᴛᴏ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ")
      .setColor(ERROR.DARK);
    return embed;
  },
};
