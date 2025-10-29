import type { ChatInputCommand, CommandData, MessageCommand } from "commandkit"
import { menuManager } from "commandkit-plugin-menu"
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
    },
    preloadAll: true,
  })

  const components = await menu.render()

  console.log(menu)

  await ctx.interaction.reply({
    components: [components],
    flags: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2]
  })
}

export const message: MessageCommand = async ctx => {
  const latency = (ctx.client.ws.ping ?? -1).toString()
  const response = `Pong! Latency: ${latency}ms`

  await ctx.message.reply(response)
}
