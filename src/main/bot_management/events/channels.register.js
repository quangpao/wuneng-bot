/**
 *
 * @param {WNClient} client
 */
module.exports = (client) => {
  client.mngChannel.set('logs', this.channels.cache.get("1084882642182352946"))
  client.mngChannel.set('issues', this.channels.cache.get("1084882642182352946"))
  client.mngChannel.set('report', this.channels.cache.get("1084882642182352946"))
  client.mngChannel.set('future', this.channels.cache.get("1084882642182352946"))
};
