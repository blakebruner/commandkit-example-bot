import { TextDisplay } from "commandkit"
import { getLavalinkManager } from "commandkit-plugin-lavalink-client"
import type { BaseBuildCtx, PageDefinition } from "commandkit-plugin-pagination"
import { Track, UnresolvedTrack } from "lavalink-client"

export interface MusicParams {
  guildId: string
}

export type TrackLike = Track | UnresolvedTrack

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
  { info: { title: "Sample Track 10" } } as Track,
]

const musicQueuePage: PageDefinition<MusicParams, TrackLike> = {
  name: "music-queue",
  perPage: 5,

  async build(_base: BaseBuildCtx, _params: MusicParams) {
    // if you need to warm caches or wire listeners for this static page, do it here
  },

  async fetch({ guildId }) {
    const manager = getLavalinkManager()
    const player = manager.getPlayer(guildId)
    // return player ? player.queue.tracks : []
    return testData
  },

  async renderItem(track, index, pageIndex) {
    return <TextDisplay content={`#${index + 1} • ${track.info.title}`} />
  },

  async renderTitle({ guildId }) {
    return <TextDisplay content={`🎵 Queue for ${guildId}`} />
  },
}

export default musicQueuePage
