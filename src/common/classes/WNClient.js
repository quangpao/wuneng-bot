const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { DisTube } = require("distube");
const config = require("../config");
const interactionHandler = require("../handlers/interaction.handler");
const _64GiB = 67108864;

class WNClient extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
      ],
      failIfNotExists: false,
      allowedMentions: {
        parse: [ "everyone", "roles", "users" ],
        repliedUser: false,
      },
    });
    this.slashCommands = new Collection();
    this.buttonCommands = new Collection();
    this.slashCommandArray = [];
    this.distube = new DisTube(this, {
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
        new YtDlpPlugin({
          update: false,
        }),
      ],
    });
  }

  start(token) {
    [
      "slash-command.register",
      "events.register.js",
      "button-command.register",
    ].forEach(
      // , "button-command.register"
      (register) => {
        require(`../events/registers/${register}`)(this);
      }
    );

    require("../handlers/client.handler")(this);

    this.on("interactionCreate", (interaction) => {
      interactionHandler(interaction, this);
    });

    this.login(token);
  }
}

module.exports = WNClient;
