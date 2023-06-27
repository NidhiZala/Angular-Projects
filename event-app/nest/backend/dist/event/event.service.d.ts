import { Event } from './event.model';
export declare class EventService {
    events: Event[];
    private filePath;
    getAllEvents(): Event[];
    getEventById(eventId: number): Event;
    private getEventsFromFile;
    createEvent(event: Event): Event;
    searchEvents(query: string): Event[];
    updateEvent(id: number, updatedEvent: Event): Promise<Event>;
    private saveEventsToFileUpdate;
    deleteEvent(eventId: number): void;
    private saveEventsToFile;
}
