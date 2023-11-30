const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const { Client, GatewayIntentBits } = require('discord.js')

const client = new Client({
  shards: getInfo().SHARD_LIST,
  shardCount: getInfo().TOTAL_SHARDS,

	intents: [
    GatewayIntentBits.Guilds
	]
})

client.cluster = new ClusterClient(client) // initialize the Client, so we access the .broadcastEval()

client.login(getInfo().DISCORD_TOKEN)

client.cluster.request({ type: 'hi' })
