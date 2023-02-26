const WNClient = require("../../../common/classes/WNClient");
const PlayBuilder = require("../builders/play.builder");

/**
 *
 * @param {WNClient} client
 */
module.exports = (client) => {
  client.distube.on("playSong", (queue, song) => {
    console.log(queue, song);
    queue.textChannel.send({
      embeds: [PlayBuilder.embedBuilder(song, song.member)],
    });
  });
};
