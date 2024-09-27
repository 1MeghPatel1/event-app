import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Event } from './entities/events.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../auth/entities/users.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto, user: User): Promise<Event> {
    const event = this.eventRepository.create({ ...createEventDto, user });
    return this.eventRepository.save(event);
  }

  async findAll(): Promise<any[]> {
    const storedEvents = await this.eventRepository.find({
      relations: ['user'],
    });
    const events = storedEvents.map((event) => {
      return {
        ...event,
        user: {
          id: event.user.id,
          name: event.user.name,
          email: event.user.email,
        },
      };
    });

    return events;
  }

  async findAllByUserId(userId: number): Promise<Event[]> {
    return this.eventRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(
    id: number,
    updateEventDto: UpdateEventDto,
    user: User,
  ): Promise<UpdateResult> {
    // Fetch event with relations
    const event = await this.eventRepository.update(
      { id },
      { ...updateEventDto, user },
    );

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async remove(id: number, user: User): Promise<void> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    if (event.user.id !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to delete this event',
      );
    }

    await this.eventRepository.remove(event);
  }
}
