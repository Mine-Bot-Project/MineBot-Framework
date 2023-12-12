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

let start = (async () => {
  client.cluster = new ClusterClient(client)

  //Core.callFunction('Log.add', ['info'])

  let state = await Core.callFunction('Log.addState', ['white', `Cluster ${client.cluster.id}`, 'Starting Cluster'])

  client.on('ready', () => {
    Core.callFunction('Log.finishState', [state, 'green', 'Cluster Ready'])
  })

  client.login(getInfo().DISCORD_TOKEN)
})()
