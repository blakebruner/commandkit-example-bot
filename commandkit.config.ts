import { lavalinkClient } from "commandkit-plugin-lavalink-client"
import { pagination } from "commandkit-plugin-pagination"
import { defineConfig } from "commandkit/config"

export default defineConfig({
  plugins: [
    pagination(),
    lavalinkClient(),
  ],
})
