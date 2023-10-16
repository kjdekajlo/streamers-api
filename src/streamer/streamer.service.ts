import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Streamer } from './streamer.schema';
import * as mongoose from 'mongoose';
import { VotesGateway } from 'src/gateway/gateway';

@Injectable()
export class StreamerService {
  constructor(
    @InjectModel(Streamer.name)
    private streamerModel: mongoose.Model<Streamer>,
    private readonly votesGateway: VotesGateway,
  ) {}

  async findAll(): Promise<Streamer[]> {
    const streamers = await this.streamerModel.find();
    return streamers;
  }

  async create(streamer: Streamer): Promise<Streamer> {
    const res = await this.streamerModel.create(streamer);
    this.emitDataChanged();
    return res;
  }

  async deleteById(id: string): Promise<Streamer[]> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id');
    }

    const isStreamerDeleted = await this.streamerModel.deleteOne(
      await this.findById(id),
    );

    if (!isStreamerDeleted) {
      throw new NotFoundException('Streamer not found');
    }

    this.emitDataChanged();

    return await this.findAll();
  }

  async findById(id: string): Promise<Streamer> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id');
    }

    const streamer = await this.streamerModel.findById(id);

    if (!streamer) {
      throw new NotFoundException('Streamer not found');
    }

    return streamer;
  }

  async updateById(id: string, streamer: Streamer): Promise<Streamer> {
    this.emitDataChanged();
    return await this.streamerModel.findByIdAndUpdate(id, streamer, {
      new: true,
      runValidators: true,
    });
  }

  async upvote(id: string): Promise<Streamer> {
    const streamer = await this.findById(id);

    streamer.upvotes++;

    const res = await this.create(streamer);
    return res;
  }

  async downvote(id: string): Promise<Streamer> {
    const streamer = await this.findById(id);

    streamer.downvotes++;

    const res = await this.create(streamer);
    return res;
  }

  async emitDataChanged() {
    this.votesGateway.onStreamersChanged();
  }
}
