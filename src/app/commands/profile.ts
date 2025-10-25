import type { ChatInputCommand, CommandData } from "commandkit"

export const command: CommandData = {
  name: "profile",
  description: "View your profile.",
}

export const chatInput: ChatInputCommand = async ctx => {
  // const pagination = ctx.commandkit.plugins.getPlugin("PaginationPlugin") as PaginationPlugin

  // const sessionKey = `profile:${ctx.interaction.user.id}`

  // await pagination.start<ProfileParams, ProfileData>(
  //   "profile",
  //   {
  //     key: sessionKey,
  //     response: ctx.interaction,
  //     params: {
  //       guildId: ctx.interaction.guildId!,
  //       user: ctx.interaction.user,
  //     },
  //   },
  //   { commandkit: ctx.commandkit }
  // )

}
