import { Module } from '@nestjs/common';
import { VotesGateway } from './gateway';

@Module({
  providers: [VotesGateway],
  exports: [VotesGateway],
})
export class VotesGatewayModule {}
