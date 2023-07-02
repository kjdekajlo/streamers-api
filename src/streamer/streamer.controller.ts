import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { StreamerService } from './streamer.service';
import { Streamer } from './streamer.schema';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class StreamerController {
  constructor(private streamerService: StreamerService) {}

  @ApiTags('streamers')
  @ApiOperation({
    summary:
      'Receive new submission of a streamer and store it in the database.',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @Post('streamers')
  async createStreamer(
    @Body()
    streamer: CreateStreamerDto,
  ): Promise<Streamer> {
    return this.streamerService.create(streamer);
  }

  @ApiTags('streamers')
  @ApiOperation({
    summary: 'Read the list of the streamers from the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'The records have been successfully read.',
  })
  @Get('streamers')
  async getAllStreamers(): Promise<Streamer[]> {
    return this.streamerService.findAll();
  }

  @ApiTags('streamer')
  @ApiOperation({
    summary: 'Read a streamer by their id.',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully read.',
  })
  @ApiResponse({
    status: 400,
    description: 'Please enter correct id.',
  })
  @ApiResponse({
    status: 404,
    description: 'Streamer not found.',
  })
  @Get('streamer/:id')
  async getStreamer(
    @Param('id')
    id: string,
  ): Promise<Streamer> {
    return this.streamerService.findById(id);
  }

  @ApiTags('streamer')
  @ApiOperation({
    summary: 'Vote for a streamer by id. / Increase their upvotes by 1.',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully read.',
  })
  @ApiResponse({
    status: 400,
    description: 'Please enter correct id.',
  })
  @ApiResponse({
    status: 404,
    description: 'Streamer not found.',
  })
  @Put('streamer/:id/vote')
  async voteStreamer(
    @Param('id')
    id: string,
  ): Promise<Streamer> {
    return this.streamerService.vote(id);
  }
}
