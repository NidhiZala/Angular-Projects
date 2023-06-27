import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './event.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000'; // Update with your API endpoint

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    console.log("i am here");
    return this.http.get<Event[]>(this.apiUrl);
    
  }
  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>('http://localhost:3000/', event);
    
  }
  updateEvent(updatedEvent: Event): Observable<Event> {
    if (!updatedEvent || !updatedEvent.id) {
      throw new Error('Invalid event data');
    }
    const url = `${this.apiUrl}/${updatedEvent.id}`;
    return this.http.patch<Event>(url, updatedEvent);
  }
  deleteEvent(event: Event): Observable<void> {
    const url = `${this.apiUrl}/${event.id}`;
    return this.http.delete<void>(url);
  }
  searchEvents(query: string): Observable<Event[]> {
    return this.http.get<Event[]>(`http://localhost:3000/?q=${query}`);
  }
}
