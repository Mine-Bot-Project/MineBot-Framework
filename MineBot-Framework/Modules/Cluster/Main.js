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

client.cluster = new ClusterClient(client)

client.cluster.on('message', (msg) => {
  if (msg.type === 'getDelay') client.cluster.send({ type: 'setDelay', id: msg.id, startTime: msg.startTime })
})

client.on('ready', () => {
  client.cluster.send({ type: 'ready' })
})

client.login(getInfo().DISCORD_TOKEN)
