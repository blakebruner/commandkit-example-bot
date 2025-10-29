import { defineConfig } from "commandkit/config"
import { lavalinkClient } from "commandkit-plugin-lavalink-client"
import { menu } from "commandkit-plugin-menu"

export default defineConfig({
  plugins: [menu(), lavalinkClient()]
})
