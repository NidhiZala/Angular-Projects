import { Event } from './event.model';
import { EventService } from './event.service';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    getAllEvents(): Event[];
    getEventById(id: string): Event;
    createEvent(event: Event): Event;
    updateEvent(id: string, updatedEvent: Event): Promise<Event>;
    deleteEvent(eventId: number): void;
    searchEvents(query: string): Event[];
}
