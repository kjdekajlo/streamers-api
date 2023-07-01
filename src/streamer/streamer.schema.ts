import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
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
  platform: 'youtube' | 'twitch' | 'tiktok' | 'kick' | 'rumble';
}

export const StreamerSchema = SchemaFactory.createForClass(Streamer);
