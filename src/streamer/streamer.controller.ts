import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { StreamerService } from './streamer.service';
import { Streamer } from './streamer.schema';
import { CreateStreamerDto } from './dto/create-streamer.dto';

@Controller()
export class StreamerController {
  constructor(private streamerService: StreamerService) {}

  @Post('streamers')
  async createStreamer(
    @Body()
    streamer: CreateStreamerDto,
  ): Promise<Streamer> {
    return this.streamerService.create(streamer);
  }

  @Get('streamers')
  async getAllStreamers(): Promise<Streamer[]> {
    return this.streamerService.findAll();
  }

  @Get('streamer/:id')
  async getStreamer(
    @Param('id')
    id: string,
  ): Promise<Streamer> {
    return this.streamerService.findById(id);
  }

  @Put('streamer/:id/vote')
  async voteStreamer(
    @Param('id')
    id: string,
  ): Promise<Streamer> {
    return this.streamerService.vote(id);
  }
}
