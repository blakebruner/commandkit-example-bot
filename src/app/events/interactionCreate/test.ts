import { EventHandler } from "commandkit"
import { Events } from "discord.js"

const handler: EventHandler<Events.InteractionCreate> = async interaction => {
  if (!interaction.isButton()) {
    return
  }

  const customId = interaction.customId
  console.log("Button interaction received with customId:", customId)

}

export default handler
