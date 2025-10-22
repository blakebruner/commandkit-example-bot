import type { ChatInputCommand, CommandData, MessageCommand } from "commandkit"
import type { PaginationPlugin } from "commandkit-plugin-pagination"
import { MusicParams, TrackLike } from "../pages/music-queue"

export const command: CommandData = {
  name: "ping",
  description: "Ping the bot to check if it's online.",
}

export const chatInput: ChatInputCommand = async ctx => {
  // const latency = (ctx.client.ws.ping ?? -1).toString()
  // const response = `Pong! Latency: ${latency}ms`

  const pagination = ctx.commandkit.plugins.getPlugin("PaginationPlugin") as PaginationPlugin

  const sessionKey = `music-queue:${ctx.interaction.guildId}`

  await pagination.start<MusicParams, TrackLike>(
    "music-queue",
    {
      key: sessionKey,
      response: ctx.interaction,
      params: { guildId: ctx.interaction.guildId! },
    },
    { commandkit: ctx.commandkit }
  )

  // await ctx.interaction.reply({
  //   content: response,
  //   flags: [ MessageFlags.Ephemeral ],
  // })
}

export const message: MessageCommand = async ctx => {
  const latency = (ctx.client.ws.ping ?? -1).toString()
  const response = `Pong! Latency: ${latency}ms`

  await ctx.message.reply(response)
}
