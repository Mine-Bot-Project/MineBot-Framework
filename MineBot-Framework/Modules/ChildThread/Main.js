const { ClusterClient, getInfo } = require('discord-hybrid-sharding')
const { Client, GatewayIntentBits } = require('discord.js')

const client = new Client({
  shards: getInfo().SHARD_LIST,
  shardCount: getInfo().TOTAL_SHARDS,

  intents: [
    GatewayIntentBits.Guilds
  ]
})

module.exports = client

const Core = require('./Core')

client.cluster = new ClusterClient(client)

client.on('ready', () => {
  Core.callFunction('Log.add', ['complete', 'hi'])
})

client.login(getInfo().DISCORD_TOKEN)
