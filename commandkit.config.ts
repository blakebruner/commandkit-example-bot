import { defineConfig } from "commandkit/config"
import { lavalinkClient } from "commandkit-plugin-lavalink-client"

export default defineConfig({
  plugins: [
    lavalinkClient(),
  ],
})
