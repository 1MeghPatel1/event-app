import {
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiProperty({
    description: 'Title of the event',
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Title must be less than 255 characters.' })
  title?: string;

  @ApiProperty({ description: 'Description of the event', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Array of image URLs for the event',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ description: 'Start date of the event', required: false })
  @IsOptional()
  @IsDate({ message: 'Start date must be a valid date.' })
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({ description: 'End date of the event', required: false })
  @IsOptional()
  @IsDate({ message: 'End date must be a valid date.' })
  @Type(() => Date)
  endDate?: Date;

  @ApiProperty({
    description: 'Total number of guests for the event',
    required: false,
  })
  @IsOptional()
  @IsString()
  totalGuests?: number;
}
