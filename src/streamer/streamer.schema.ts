import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Platform {
  'youtube' = 'youtube',
  'twitch' = 'twitch',
  'tiktok' = 'tiktok',
  'kick' = 'kick',
  'rumble' = 'rumble',
}

@Schema({})
export class Streamer {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  downvotes: number;

  @Prop()
  upvotes: number;

  @Prop()
  platform: Platform;
}

export const StreamerSchema = SchemaFactory.createForClass(Streamer);
