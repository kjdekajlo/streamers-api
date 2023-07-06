import { Module } from '@nestjs/common';

import { StreamerService } from './streamer.service';
import { StreamerController } from './streamer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamerSchema } from './streamer.schema';
import { VotesGatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Streamer', schema: StreamerSchema }]),
    VotesGatewayModule,
  ],
  controllers: [StreamerController],
  providers: [StreamerService],
})
export class StreamerModule {}
