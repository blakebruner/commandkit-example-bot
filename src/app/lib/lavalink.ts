import { setLavalinkManager } from "commandkit-plugin-lavalink-client"
import { Client } from "discord.js"
import { LavalinkManager } from "lavalink-client"
import { MusicStore } from "../structures/MusicStore"
import redis from "./redis"

export function startLavalink(client: Client) {

  const lavalink = new LavalinkManager({
    nodes: [
      {
        authorization: process.env.LAVALINK_SERVER_PASSWORD!,
        host: process.env.LAVALINK_HOST!,
        port: 2333,
        id: "main",
      },
    ],
    sendToShard: (guildId, payload) => client.guilds.cache.get(guildId)?.shard?.send(payload),
    autoSkip: true,
    client: {
      id: "1417269992285540515",
      username: "Commandkit Example",
    },
    queueOptions: {
      maxPreviousTracks: 10,
      queueStore: new MusicStore(redis),
    },
  })

  // forward voice updates to Lavalink
  client.on("raw", data => lavalink.sendRawData(data))

  setLavalinkManager(lavalink)

  return lavalink
}
