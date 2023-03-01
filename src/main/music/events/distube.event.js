const WNClient = require("../../../common/classes/WNClient");
const PlayBuilder = require("../builders/embeds/distube-event.embed");

/**
 *
 * @param {WNClient} client
 */
module.exports = (client) => {
  client.distube.on("playSong", (queue, song) => {
    if (queue.autoplay) return;
    queue.textChannel.send({
      embeds: [PlayBuilder.PlaySong(song)],
    });
  });

  client.distube.on("addList", (queue, playlist) => {
    queue.textChannel.send({
      embeds: [PlayBuilder.AddPlaylist(playlist)],
    });
  });

  client.distube.on("addSong", (queue, song) => {
    queue.textChannel.send({
      embeds: [PlayBuilder.AddSong(song)],
    });
  });

  client.distube.on("noRelated", (queue) => {
    console.log(queue);
    // TODO
  });
  /*
  client.distube.on("deleteQueue", (queue) => {
    console.log(queue)
    // TODO
  })

  client.distube.on("disconnect", (queue) => {
    console.log(queue)
    // TODO
  })

  client.distube.on("finish", (queue) => {
    console.log(queue)
    // TODO
  })

  client.distube.on("empty", (queue) => {
    console.log(queue)
    // TODO
  })

  client.distube.on("error", (channel, error) => {
    console.log(channel, error)
    // TODO
  })

  client.distube.on("initQueue", (queue) => {
    console.log(queue)
    // TODO
  })

  client.distube.on("searchCancel", (message, query) => {
    console.log(message, query)
    // TODO
  })

  client.distube.on("searchDone", (message, answer, query) => {
    console.log(message, answer, query)
    // TODO
  })

  client.distube.on("searchInvalidAnswer", (message, answer, query) => {
    console.log(message, answer, query)
    // TODO
  })

  client.distube.on("searchNoResult", (message, query) => {
    console.log(message, query)
    // TODO
  })

  client.distube.on("searchResult", (message, results, query) => {
    console.log(message, results, query)
    // TODO
  })
  */
};
