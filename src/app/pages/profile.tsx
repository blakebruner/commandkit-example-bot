import { Section, TextDisplay, Thumbnail } from "commandkit"
import type { BaseBuildCtx, PageDefinition } from "commandkit-plugin-pagination"
import { User } from "discord.js"

export interface ProfileParams {
  guildId: string
  user: User
}

export interface ProfileData {
  info: {
    title: string
  }
}

const testData : ProfileData[] = [
  { info: { title: "Sample Profile Data 1" } },
  { info: { title: "Sample Profile Data 2" } },
  { info: { title: "Sample Profile Data 3" } },
  { info: { title: "Sample Profile Data 4" } },
  { info: { title: "Sample Profile Data 5" } },
  { info: { title: "Sample Profile Data 6" } },
  { info: { title: "Sample Profile Data 7" } },
  { info: { title: "Sample Profile Data 8" } },
  { info: { title: "Sample Profile Data 9" } },
  { info: { title: "Sample Profile Data 10" } },
]

const profilePage: PageDefinition<ProfileParams, ProfileData> = {
  name: "profile",
  perPage: 5,

  async build(_base: BaseBuildCtx, _params: ProfileParams) {
    // if you need to warm caches or wire listeners for this static page, do it here
  },

  async fetch({ guildId, user }) {
    return testData
  },

  async renderItem(profile, index, pageIndex) {
    return <TextDisplay content={`#${index + 1} • ${profile.info.title}`} />
  },

  async renderTitle({ user }) {
    return (
      <Section>
        <TextDisplay content={`# 🗂️ Profile  ▬  Viewing ${user}`} />
        <TextDisplay content={`This profile was **created on** <t:${Math.floor(user.createdTimestamp / 1000)}:f>`} />
        <Thumbnail url={user.displayAvatarURL()} />
      </Section>
    )
  },
}

export default profilePage
