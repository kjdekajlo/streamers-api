import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
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
    summary: 'Delete a streamer by their id.',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Please enter correct id.',
  })
  @ApiResponse({
    status: 404,
    description: 'Streamer not found.',
  })
  @Delete('streamer/:id')
  async deleteStreamerById(
    @Param('id')
    id: string,
  ): Promise<Streamer[]> {
    return this.streamerService.deleteById(id);
  }

  @ApiTags('streamer')
  @ApiOperation({
    summary: 'Upvote a streamer by id. / Give a streamer one like ',
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
  @Put('streamer/:id/upvote')
  async upvoteStreamerById(
    @Param('id')
    id: string,
  ): Promise<Streamer> {
    return this.streamerService.upvote(id);
  }

  @ApiTags('streamer')
  @ApiOperation({
    summary:
      "Downvote a streamer by id. / Decrease the streamer's likes by one",
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
  @Put('streamer/:id/downvote')
  async downvoteStreamerById(
    @Param('id')
    id: string,
  ): Promise<Streamer> {
    return this.streamerService.downvote(id);
  }
}
