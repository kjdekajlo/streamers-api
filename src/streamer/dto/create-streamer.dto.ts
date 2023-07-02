import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { Platform } from '../streamer.schema';

export class CreateStreamerDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly downvotes: number;

  @IsNotEmpty()
  @IsNumber()
  readonly upvotes: number;

  @IsNotEmpty()
  @IsEnum(Platform, { message: 'Please enter correct platform name' })
  readonly platform: Platform;
}
