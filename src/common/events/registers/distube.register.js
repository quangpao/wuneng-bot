// eslint-disable-next-line no-unused-vars
const { Client } = require("discord.js");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { DisTube } = require("distube");
const config = require("../../config");
const _64GiB = 67108864;

/**
 * @param {Client} client
 */
module.exports = (client) => {
  client.distube = new DisTube(client, {
    searchSongs: 5,
    searchCooldown: 30,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: false,
    youtubeCookie: config.youtubeCookie,
    ytdlOptions: {
      filter: "audioonly",
      quality: "highestaudio",
      highWaterMark: _64GiB,
    },
    plugins: [
      new SoundCloudPlugin(),
      new SpotifyPlugin({
        parallel: true,
        emitEventsAfterFetching: false,
        api: {
          clientId: config.spotifyCfg.clientId,
          clientSecret: config.spotifyCfg.clientSecret,
          topTracksCountry: config.spotifyCfg.topTracksCountry,
        },
      }),
    ],
  });
};
