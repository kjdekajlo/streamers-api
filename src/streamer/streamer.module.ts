import { Module } from '@nestjs/common';

import { StreamerService } from './streamer.service';
import { StreamerController } from './streamer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamerSchema } from './streamer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Streamer', schema: StreamerSchema }]),
  ],
  controllers: [StreamerController],
  providers: [StreamerService],
})
export class StreamerModule {}
