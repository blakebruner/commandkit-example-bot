import type { ChatInputCommand, CommandData } from "commandkit"
import { MessageFlags } from "discord.js"

export const command: CommandData = {
  name: "profile",
  description: "View your profile.",
}

export const chatInput: ChatInputCommand = async ctx => {
await ctx.interaction.deferReply({
  flags: [ MessageFlags.Ephemeral ]
})

setTimeout(async () => {
  await ctx.interaction.editReply("Loading your profile...")
}, 2000)

}
