import type { Redis } from "ioredis"
import type { QueueStoreManager, StoredQueue } from "lavalink-client"

export class MusicStore implements QueueStoreManager {
  private redis: Redis

  public constructor(redisClient: Redis) {
    this.redis = redisClient
  }

  public async get(guildId: string): Promise<any> {
    return await this.redis.get(this.id(guildId))
  }

  public async set(
    guildId: string,
    stringifiedQueueData: StoredQueue | string
  ): Promise<any> {
    if (typeof stringifiedQueueData !== "string") {
      stringifiedQueueData = JSON.stringify(stringifiedQueueData)
    }
    return await this.redis.set(this.id(guildId), stringifiedQueueData)
  }

  public async delete(guildId: string): Promise<any> {
    return await this.redis.del(this.id(guildId))
  }

  public async parse(
    stringifiedQueueData: StoredQueue | string
  ): Promise<Partial<StoredQueue>> {
    if (typeof stringifiedQueueData !== "string") {
      return stringifiedQueueData
    }
    return JSON.parse(stringifiedQueueData)
  }

  public async stringify(parsedQueueData: StoredQueue | string): Promise<any> {
    return JSON.stringify(parsedQueueData)
  }

  private id(guildId: string): string {
    return `lavalinkqueue_${guildId}`
  }
}
