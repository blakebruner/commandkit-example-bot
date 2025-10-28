import { TextDisplay } from "commandkit"
import { getLavalinkManager } from "commandkit-plugin-lavalink-client"
import { type MenuData, paginationMenu } from "commandkit-plugin-pagination"
import type { Track, UnresolvedTrack } from "lavalink-client"

export type TrackLike = Track | UnresolvedTrack

export interface MusicQueueData extends MenuData {
  params: {
    guildId: string
  }
  item: TrackLike
  session: {
    playerInfo: {
      isPaused: boolean
      volume: number
      currentTrack: TrackLike | null
    }
    lastUpdated: Date
  }
}

const testData: TrackLike[] = [
  { info: { title: "Sample Track 1" } } as Track,
  { info: { title: "Sample Track 2" } } as Track,
  { info: { title: "Sample Track 3" } } as Track,
  { info: { title: "Sample Track 4" } } as Track,
  { info: { title: "Sample Track 5" } } as Track,
  { info: { title: "Sample Track 6" } } as Track,
  { info: { title: "Sample Track 7" } } as Track,
  { info: { title: "Sample Track 8" } } as Track,
  { info: { title: "Sample Track 9" } } as Track,
  { info: { title: "Sample Track 10" } } as Track,
  { info: { title: "Sample Track 1" } } as Track,
  { info: { title: "Sample Track 2" } } as Track,
  { info: { title: "Sample Track 3" } } as Track,
  { info: { title: "Sample Track 4" } } as Track,
  { info: { title: "Sample Track 5" } } as Track,
  { info: { title: "Sample Track 6" } } as Track,
  { info: { title: "Sample Track 7" } } as Track,
  { info: { title: "Sample Track 8" } } as Track,
  { info: { title: "Sample Track 9" } } as Track,
  { info: { title: "Sample Track 10" } } as Track,
  { info: { title: "Sample Track 1" } } as Track,
  { info: { title: "Sample Track 2" } } as Track,
  { info: { title: "Sample Track 3" } } as Track,
  { info: { title: "Sample Track 4" } } as Track,
  { info: { title: "Sample Track 5" } } as Track,
  { info: { title: "Sample Track 6" } } as Track,
  { info: { title: "Sample Track 7" } } as Track,
  { info: { title: "Sample Track 8" } } as Track,
  { info: { title: "Sample Track 9" } } as Track,
  { info: { title: "Sample Track 10" } } as Track
]

export default paginationMenu<MusicQueueData>({
  name: "music-queue",
  color: "#ffeed9",
  perPage: 5,

  async fetch(params) {
    const manager = getLavalinkManager()
    const player = manager.getPlayer(params.guildId)
    return player ? player.queue.tracks : testData
  },

  async onSessionStart(params) {
    const manager = getLavalinkManager()
    const player = manager.getPlayer(params.guildId)

    return {
      playerInfo: {
        isPaused: player?.paused ?? false,
        volume: player?.volume ?? 100,
        currentTrack: player?.queue.current ?? null
      },
      lastUpdated: new Date()
    }
  },

  async renderItem(item, index, pageIndex, ctx) {
    const { playerInfo } = ctx.sessionData
    const isPlaying = playerInfo.currentTrack?.info.title === item.info.title

    return (
      <TextDisplay
        content={`${isPlaying ? "▶️" : ""}#${index + 1} • ${item.info.title}`}
      />
    )
  },

  async renderTitle(ctx) {
    const { playerInfo } = ctx.sessionData
    return (
      <TextDisplay content={`🎵 Queue ${playerInfo.isPaused ? "⏸️" : "▶️"}`} />
    )
  }

  // async onInteraction(interactionId, data, ctx) {
  //   if (interactionId === "toggle-pause") {
  //     ctx.updateSessionData(current => ({
  //       ...current,
  //       playerInfo: {
  //         ...current.playerInfo,
  //         isPaused: !current.playerInfo.isPaused,
  //       },
  //     }))
  //     return { type: "render" }
  //   }
  //   return { type: "render" }
  // },
})
