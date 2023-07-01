export class CreateStreamerDto {
  readonly name: string;
  readonly description: string;
  readonly downvotes: number;
  readonly upvotes: number;
  readonly platform: 'youtube' | 'twitch' | 'tiktok' | 'kick' | 'rumble';
}
