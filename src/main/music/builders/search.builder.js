const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, } = require("discord.js");
const Color = require("../../../common/utils/Color");

module.exports = {
  SearchSlashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("search")
      .setDescription("Search some songs to play!")
      .addStringOption((option) =>
        option
          .setName("song")
          .setDescription("Input the song name")
          .setRequired(true)
      );
    return builder
  },
  SelectSearchPlayButtonBuilder:(songnumber = -1, songArr) => {
    const builder = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setLabel(`${songnumber}`)
    if(songnumber === -1){
      builder.setCustomId(`selecttoplay`)
    }
    else{
      builder.setCustomId(`selecttoplay ${songArr.url}`)
    }
    return builder
  }
};
