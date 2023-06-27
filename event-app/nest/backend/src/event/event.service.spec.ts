import { EventService } from './event.service';
import { Event } from './event.model';
import * as fs from 'fs';

describe('EventService', () => {
  let eventService: EventService;
  let fs: any;

  beforeEach(() => {
    fs = require('fs');
    eventService = new EventService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return all events', () => {
    const events: Event[] = [
      { id: 1, name: 'Event 1', host: 'host 1', date: '2023-06-19T14:28:08.608Z' },
      { id: 2, name: 'Event 2', host: 'host 2', date: '2023-06-19T14:28:08.608Z' },
    ];

    const readFileSyncMock = jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(events));
    const getEventsFromFileMock = jest.spyOn(eventService as any, 'getEventsFromFile');

    const allEvents = eventService.getAllEvents();

    expect(getEventsFromFileMock).toHaveBeenCalled();
    expect(allEvents.length).toEqual(events.length);
    expect(allEvents).toEqual(events);
    readFileSyncMock.mockRestore();
  });

  it('should create a new event', () => {
    const event: Event = { id: 1, name: 'New Event', host: 'New Host', date: '2023-06-19T14:28:08.608Z' };

    const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');
    const getEventsFromFileMock = jest.spyOn(eventService as any, 'getEventsFromFile').mockReturnValue([]);
    const saveEventsToFileMock = jest.spyOn(eventService as any, 'saveEventsToFile');
    const createdEvent = eventService.createEvent(event);
    expect(saveEventsToFileMock).toHaveBeenCalled();
    expect(createdEvent).toEqual(event);
    writeFileSyncMock.mockRestore();
  });
  
  it('should delete an existing event', () => {
    const eventId = 1;
    const events: Event[] = [
      { id: 1, name: 'Event 1', host: 'host 1', date: '2023-06-19T14:28:08.608Z' },
      { id: 2, name: 'Event 2', host: 'host 2', date: '2023-06-19T14:28:08.608Z' },
    ];
  
    const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');
    const getEventsFromFileMock = jest.spyOn(eventService as any, 'getEventsFromFile');
    const saveEventsToFileMock = jest.spyOn(eventService as any, 'saveEventsToFile');
  
    eventService.deleteEvent(eventId);
  
    // Expect that the event with the given ID is removed from the events array
    expect(eventService.events).not.toContainEqual(events[0]);
  
    // Expect that the saveEventsToFile method was called
    expect(saveEventsToFileMock).toHaveBeenCalled();
  
    writeFileSyncMock.mockRestore();
  });
  
  describe('updateEvent', () => {
    it('should update an existing event and return the updated event', async () => {
      const eventId = 1;
      const updatedEvent = { id: eventId, name: 'Updated Event', host: 'Updated Host', date: '2023-06-19T14:28:08.608Z' };

      jest.spyOn(eventService as any, 'getEventsFromFile').mockReturnValue([
        { id: 1, name: 'Event 1', host: 'Host 1', date: '2023-06-19T14:28:08.608Z' },
        { id: 2, name: 'Event 2', host: 'Host 2', date: '2023-06-19T14:28:08.608Z' },
      ]);

      const updatedEventResult = await eventService.updateEvent(eventId, updatedEvent);

      expect(updatedEventResult).toEqual(updatedEvent);
    });

    it('should throw an error if the event to update is not found', async () => {
      const eventId = 1;
      const updatedEvent = { id: eventId, name: 'Updated Event', host: 'Updated Host', date: '2023-06-19T14:28:08.608Z' };

      jest.spyOn(eventService as any, 'getEventsFromFile').mockReturnValue([
        { id: 2, name: 'Event 2', host: 'Host 2', date: '2023-06-19T14:28:08.608Z' },
      ]);

      await expect(eventService.updateEvent(eventId, updatedEvent)).rejects.toThrowError(`Event with ID ${eventId} not found`);
    });
  });

  describe('searchEvents', () => {
    it('should return matching events based on the query', () => {
      const query = 'Event 1';
      const events: Event[] = [
        { id: 1, name: 'Event 1', host: 'Host 1', date: '2023-06-19T14:28:08.608Z' },
        { id: 2, name: 'Event 2', host: 'Host 2', date: '2023-06-20T14:28:08.608Z' },
        { id: 3, name: 'Another Event', host: 'Host 3', date: '2023-06-21T14:28:08.608Z' },
      ];

      eventService.events = events;

      const searchResults = eventService.searchEvents(query);

      // Expect that only events with names containing 'event' are returned
      expect(searchResults).toEqual([
        { id: 1, name: 'Event 1', host: 'Host 1', date: '2023-06-19T14:28:08.608Z' },
      ]);
    });

    it('should return an empty array if no matching events are found', () => {
      const query = 'nonexistent';
      const events: Event[] = [
        { id: 1, name: 'Event 1', host: 'Host 1', date: '2023-06-19T14:28:08.608Z' },
        { id: 2, name: 'Event 2', host: 'Host 2', date: '2023-06-20T14:28:08.608Z' },
        { id: 3, name: 'Another Event', host: 'Host 3', date: '2023-06-21T14:28:08.608Z' },
      ];

      eventService.events = events;

      const searchResults = eventService.searchEvents(query);

      expect(searchResults).toEqual([]);
    });
  });

});
