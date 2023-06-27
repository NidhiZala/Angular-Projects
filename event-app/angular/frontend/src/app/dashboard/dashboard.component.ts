import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';
import { Event } from '../event.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  events: Event[] = [];
  editingEventId: number | null = null;
  editingEvent: Event | null = null;
  maxId: number = 0;
  displayedColumns: string[] = ['name', 'host', 'date', 'actions'];
  
  newEvent: Event = {
    id: 0,
    name: '',
    host: '',
    date: ''
  };
  searchQuery: string = '';
  constructor(
    private http: HttpClient, 
    private router: Router, 
    private authService: AuthService, 
    private eventService: EventService) {}
  
    ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  createEvent() {
    this.eventService.getEvents().subscribe(events => {
      // Find the maximum ID from the existing events
      const maxId = Math.max(...events.map(event => event.id));
  
      // Increment the maxId value
      this.maxId = maxId !== -Infinity ? maxId + 1 : 1;
  
      // Assign the incremented ID to the new event
      this.newEvent.id = this.maxId;
  
      this.eventService.createEvent(this.newEvent).subscribe(
        createdEvent => {
          this.events.push(createdEvent);
          this.newEvent = {
            id: 0,
            name: '',
            host: '',
            date: ''
          };
          console.log('Created Event:', createdEvent);
          this.loadEvents();
        },
        error => {
          console.error('Error creating event:', error);
        }
      );
    });
  }
  
  
  
  
  
  searchEvents() {
    if (this.searchQuery.trim() === '') {
      // If the search query is empty or contains only whitespace, load all events
      this.loadEvents();
    } else{
    this.eventService.searchEvents(this.searchQuery).subscribe(events => {
      const matchingEvent = events.find(event => event.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
      if (matchingEvent) {
        this.events = [matchingEvent];
      } else {
        // Handle case when no matching event is found
        this.events = [];
        console.log('No event found for search query:', this.searchQuery);
      }
      console.log('Search Query:', this.searchQuery); // Log the search query
    });}  
  } 
  
  editEvent(event: Event): void {
    this.editingEventId = event.id;
    this.editingEvent = { ...event };
  }
  
  saveEvent(event: Event): void {
    console.log('Entered value:', event);
    console.log('Event ID:', event.id);
  
    if (event && event.id) {
      this.eventService.updateEvent(event).subscribe(
        updatedEvent => {
          console.log('Updated Event:', updatedEvent);
          const eventIndex = this.events.findIndex(e => e.id === updatedEvent?.id);
          console.log('Event Index:', eventIndex);
          if (eventIndex !== -1) {
            this.events[eventIndex] = updatedEvent;
            this.editingEventId = null; // Disable editing mode
            this.editingEvent = null; // Reset the editing event object
            console.log('Event updated successfully:', updatedEvent);
            console.log('this.events:', this.events);
            console.log('updatedEvent:', updatedEvent);
            this.loadEvents();
          } else {
            console.error('Error: Updated event not found in the events array');
          }
        },
        error => {
          console.error('Error updating event:', error);
        }
      );
    } else {
      this.editingEventId = null;
      this.editingEvent = null;
    }
  }
  
  
  
  

  cancelEdit(event: Event): void {
    this.editingEventId = null;
    this.editingEvent = null;
    this.loadEvents();
  }
  deleteEvent(event: Event): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(event).subscribe(
        () => {
          this.events = this.events.filter(e => e.id !== event.id);
          console.log('Event deleted successfully:', event);
          this.loadEvents();
        },
        error => {
          console.error('Error deleting event:', error);
        }
      );
    }
  }
  
  signOut(): void {
    this.http.post<any>('http://localhost:3000/auth/sign-out', {}).subscribe(
      () => {
        // Handle successful sign-out
        console.log('User signed out successfully');
      },
      (error) => {
        // Handle sign-out error
        console.error('Error signing out:', error);
      }
    );
   }
}
