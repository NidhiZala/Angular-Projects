import { Injectable } from '@nestjs/common';
import { Event } from './event.model';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';

@Injectable()
export class EventService {
  public events: Event[] = [];
  private filePath ='/Users/viren/JARVIS/jarvis_data_eng-NidhiZala/angular-frontend/Full-Stack-Event/nest/backend/src/data.json';

  getAllEvents(): Event[] {
    const events = this.getEventsFromFile();
    return events;
  }

  getEventById(eventId: number): Event {
    const events = this.getEventsFromFile();
    return events.find((event) => event.id === eventId);
  }

  private getEventsFromFile(): Event[] {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  createEvent(event: Event): Event {
    const newEvent: Event = {
      id: Date.now(),
      ...event,
    };
    this.events.push(newEvent);
    this.saveEventsToFile();
    return newEvent;
  }
  
  searchEvents(query: string): Event[] {
    return this.events.filter((event) =>
      event.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  async updateEvent(id: number, updatedEvent: Event): Promise<Event> {
    const events = await this.getEventsFromFile();
    const eventIndex = events.findIndex(event => event.id === id);
    if (eventIndex > -1) {
      events[eventIndex] = { ...updatedEvent, id };
      await this.saveEventsToFileUpdate(events);
      return events[eventIndex];
    } else {
      throw new Error(`Event with ID ${id} not found`);
    }
  }

  private async saveEventsToFileUpdate(events: Event[]): Promise<void> {
    const fileData = JSON.stringify(events, null, 2);
    await fsPromises.writeFile(this.filePath, fileData);
  }

  deleteEvent(eventId: number): void {
    const index = this.events.findIndex((event) => event.id === eventId);
    this.events.splice(index, 1);
    this.saveEventsToFile();
    
  }  

  private saveEventsToFile(): void {
    const data = JSON.stringify(this.events, null, 2);
    fs.writeFileSync(this.filePath, data); // Update the file path if necessary
  }
  
}

