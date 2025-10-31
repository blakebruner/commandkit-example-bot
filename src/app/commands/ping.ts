import type { ChatInputCommand, CommandData, MessageCommand } from "commandkit"
import { getLavalinkManager } from "commandkit-plugin-lavalink-client"
import { menuManager, menuQueue } from "commandkit-plugin-menu"
import { MessageFlags } from "discord.js"
import type { MusicQueueData } from "../menus/music-queue"

export const command: CommandData = {
  name: "ping",
  description: "Ping the bot to check if it's online."
}

export const chatInput: ChatInputCommand = async ctx => {
  // const latency = (ctx.client.ws.ping ?? -1).toString()
  // const response = `Pong! Latency: ${latency}ms`

  const menu = await menuManager.createSession<MusicQueueData>({
    menu: "music-queue",
    interaction: ctx.interaction,
    params: {
      guildId: ctx.interaction.guildId!
    }
  })

  const components = await menu.render()

  // console.log(menu)

  const message = await ctx.interaction.reply({
    components: [components],
    flags: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2]
  })

  await menu.updateMessageContext(ctx.interaction.user.id, message, ctx.interaction)

  setTimeout(async () => {
    await menuQueue.sendUpdate<MusicQueueData>({
      menu: "music-queue",
      params: {
        guildId: ctx.interaction.guildId!
      },
      refresh: {
        items: true,
      },
      updateSessionData: () => {
        const manager = getLavalinkManager()
        const player = manager.getPlayer(ctx.interaction.guildId!)

        return {
          playerInfo: {
            isPaused: true,
            volume: 50,
            currentTrack: player?.queue.current ?? null
          },
          lastUpdated: new Date()
        }
      }
    })
  }, 5 * 1000)

}

export const message: MessageCommand = async ctx => {
  const latency = (ctx.client.ws.ping ?? -1).toString()
  const response = `Pong! Latency: ${latency}ms`

  await ctx.message.reply(response)
}
