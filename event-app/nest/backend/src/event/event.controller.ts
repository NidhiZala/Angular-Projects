import { Controller, Get,Put, Delete,Param, Post,Patch, Body, Query } from '@nestjs/common';
import { Event } from './event.model'
import { EventService } from './event.service';

@Controller('/')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getAllEvents(): Event[] {
    return this.eventService.getAllEvents();
  }
  
  @Get(':id')
  getEventById(@Param('id') id: string) {
    const eventId = parseInt(id);
    return this.eventService.getEventById(eventId);
  }

  @Post('')
  createEvent(@Body() event: Event): Event {
    return this.eventService.createEvent(event);
  }

  @Patch(':id')
  async updateEvent(@Param('id') id: string, @Body() updatedEvent: Event): Promise<Event> {
    return this.eventService.updateEvent(parseInt(id, 10), updatedEvent);
  }

  @Delete(':id')
  deleteEvent(@Param('id') eventId: number): void {
    this.eventService.deleteEvent(eventId);
  }
  
  @Get('search')
  searchEvents(@Query('q') query: string): Event[] {
    return this.eventService.searchEvents(query);
  }
}
