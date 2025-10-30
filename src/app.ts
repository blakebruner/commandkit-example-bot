import { MemoryQueueDriver, setQueueDriver } from "commandkit-plugin-menu"
import { Client, GatewayIntentBits } from "discord.js"
import { startLavalink } from "./app/lib/lavalink"

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

setQueueDriver(new MemoryQueueDriver())

startLavalink(client)

export default client
