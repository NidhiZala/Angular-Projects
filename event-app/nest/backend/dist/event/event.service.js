"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const fs_1 = require("fs");
let EventService = exports.EventService = class EventService {
    constructor() {
        this.events = [];
        this.filePath = '/Users/viren/JARVIS/jarvis_data_eng-NidhiZala/angular-frontend/Full-Stack-Event/nest/backend/src/data.json';
    }
    getAllEvents() {
        const events = this.getEventsFromFile();
        return events;
    }
    getEventById(eventId) {
        const events = this.getEventsFromFile();
        return events.find((event) => event.id === eventId);
    }
    getEventsFromFile() {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }
    createEvent(event) {
        const newEvent = Object.assign({ id: Date.now() }, event);
        this.events.push(newEvent);
        this.saveEventsToFile();
        return newEvent;
    }
    searchEvents(query) {
        return this.events.filter((event) => event.name.toLowerCase().includes(query.toLowerCase()));
    }
    async updateEvent(id, updatedEvent) {
        const events = await this.getEventsFromFile();
        const eventIndex = events.findIndex(event => event.id === id);
        if (eventIndex > -1) {
            events[eventIndex] = Object.assign(Object.assign({}, updatedEvent), { id });
            await this.saveEventsToFileUpdate(events);
            return events[eventIndex];
        }
        else {
            throw new Error(`Event with ID ${id} not found`);
        }
    }
    async saveEventsToFileUpdate(events) {
        const fileData = JSON.stringify(events, null, 2);
        await fs_1.promises.writeFile(this.filePath, fileData);
    }
    deleteEvent(eventId) {
        const index = this.events.findIndex((event) => event.id === eventId);
        this.events.splice(index, 1);
        this.saveEventsToFile();
    }
    saveEventsToFile() {
        const data = JSON.stringify(this.events, null, 2);
        fs.writeFileSync(this.filePath, data);
    }
};
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)()
], EventService);
//# sourceMappingURL=event.service.js.map