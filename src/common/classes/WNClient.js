const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { DisTube } = require("distube");
const Config = require("../config");
const interactionHandler = require("../handlers/interaction.handler");
const waterMarkRate = 1 << 25;

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
    this.selectmenuCommands = new Collection();
    this.modalCommands = new Collection();
    this.slashCommandArray = [];
    this.slashCommandCategories = [];
    this.slashCommandInformation = new Collection();
    this.cooldown = new Set();
    this.cooldownTime = 1000;

    this.distube = new DisTube(this, {
      searchSongs: 5,
      searchCooldown: 30,
      leaveOnEmpty: false,
      leaveOnFinish: false,
      leaveOnStop: false,
      youtubeCookie: Config.youtubeCookie,
      ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: waterMarkRate,
      },
      emitNewSongOnly: true,
      plugins: [
        new SoundCloudPlugin(),
        new SpotifyPlugin({
          parallel: true,
          emitEventsAfterFetching: false,
          api: {
            clientId: Config.spotifyCfg.clientId,
            clientSecret: Config.spotifyCfg.clientSecret,
            topTracksCountry: Config.spotifyCfg.topTracksCountry,
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
      "button-command.register",
      "selectmenu-command.register",
      "modal-command.register",
      "events.register.js",
    ].forEach((register) => {
      require(`../events/registers/${register}`)(this);
    });

    require("../handlers/client.handler")(this);

    this.on("interactionCreate", (interaction) => {
      interactionHandler(interaction, this);
    });

    this.login(token);
  }
}

module.exports = WNClient;
