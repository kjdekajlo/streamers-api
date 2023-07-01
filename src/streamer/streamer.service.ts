import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Streamer } from './streamer.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class StreamerService {
  constructor(
    @InjectModel(Streamer.name)
    private streamerModel: mongoose.Model<Streamer>,
  ) {}

  async findAll(): Promise<Streamer[]> {
    const streamers = await this.streamerModel.find();
    return streamers;
  }

  async create(streamer: Streamer): Promise<Streamer> {
    const res = await this.streamerModel.create(streamer);
    return res;
  }

  async findById(id: string): Promise<Streamer> {
    const streamer = await this.streamerModel.findById(id);

    if (!streamer) {
      throw new NotFoundException('Streamer not found');
    }

    return streamer;
  }

  async updateById(id: string, streamer: Streamer): Promise<Streamer> {
    return await this.streamerModel.findByIdAndUpdate(id, streamer, {
      new: true,
      runValidators: true,
    });
  }

  async vote(id: string): Promise<Streamer> {
    const streamer = this.findById(id);

    (await streamer).upvotes++;

    const res = await this.create(await streamer);
    return res;
  }
}
