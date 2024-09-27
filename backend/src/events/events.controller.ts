import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EventService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { createResponse } from 'src/utils/createResponse';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Event } from './entities/events.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import * as fs from 'fs';
import cloudinary from 'src/config/cloudinary.config';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // Create a new event with image upload
  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions)) // Local upload
  @ApiOperation({ summary: 'Create an event' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Event created successfully.',
    type: Event,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @UseGuards(JwtAuthGuard)
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createEventDto: CreateEventDto,
    @Request() req,
  ) {
    const user = req.user;

    // Convert totalGuests to integer
    createEventDto.totalGuests = parseInt(
      createEventDto.totalGuests as any,
      10,
    );

    const imageUploadPromises = files.map((file) => {
      return cloudinary.uploader
        .upload(file.path, {
          folder: 'events', // Specify a folder in Cloudinary
        })
        .then((result) => {
          // Delete the file from local storage after upload
          fs.unlinkSync(file.path);
          return result.secure_url; // Get the Cloudinary URL
        });
    });

    const images = await Promise.all(imageUploadPromises);
    createEventDto.images = images;

    const event = await this.eventService.create(createEventDto, user);
    return createResponse(
      true,
      HttpStatus.CREATED,
      'Event created successfully',
      event,
    );
  }

  // Other existing methods remain unchanged...

  // Get all events
  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Events retrieved successfully.',
    type: [Event],
  })
  async findAll() {
    const events = await this.eventService.findAll();
    return createResponse(
      true,
      HttpStatus.OK,
      'Events retrieved successfully',
      events,
    );
  }

  // Get all events by user ID
  @Get('eventsByUser')
  @ApiOperation({ summary: 'Get events by user ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Events retrieved successfully.',
    type: [Event],
  })
  @UseGuards(JwtAuthGuard)
  async findAllByUserId(@Request() req) {
    const user = req.user;
    const events = await this.eventService.findAllByUserId(user.id);
    return createResponse(
      true,
      HttpStatus.OK,
      'Events retrieved successfully',
      events,
    );
  }

  // Get a single event by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get an event by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the event to retrieve',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Event retrieved successfully.',
    type: Event,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Event not found.',
  })
  async findOne(@Param('id') id: number) {
    const event = await this.eventService.findOne(id);
    if (!event) {
      return createResponse(false, HttpStatus.NOT_FOUND, 'Event not found');
    }
    return createResponse(
      true,
      HttpStatus.OK,
      'Event retrieved successfully',
      event,
    );
  }

  // Update an event by ID
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  async update(
    @Param('id') id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateEventDto: UpdateEventDto,
    @Request() req,
  ) {
    const user = req.user;

    const imageUploadPromises = files.map((file) => {
      return cloudinary.uploader
        .upload(file.path, {
          folder: 'events',
        })
        .then((result) => {
          fs.unlinkSync(file.path);
          return result.secure_url;
        });
    });

    const images = await Promise.all(imageUploadPromises);
    updateEventDto.images = images;

    const updatedEvent = await this.eventService.update(
      id,
      updateEventDto,
      user,
    );
    return createResponse(
      true,
      HttpStatus.OK,
      'Event updated successfully',
      updatedEvent,
    );
  }

  // Delete an event by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the event to delete',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Event deleted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Event not found.',
  })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number, @Request() req) {
    const user = req.user;
    await this.eventService.remove(id, user);
    return createResponse(
      true,
      HttpStatus.NO_CONTENT,
      'Event deleted successfully',
    );
  }
}
