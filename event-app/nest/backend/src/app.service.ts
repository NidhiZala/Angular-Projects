import { Injectable } from '@nestjs/common';
import * as fs from 'fs'; 

@Injectable()
export class AppService {
  //const path = '/Users/viren/JARVIS/jarvis_data_eng-NidhiZala/angular-frontend/Full-Stack-Event/nest/backend/src/data.json';
  getHello(): string {
    try {
      const data = fs.readFileSync('/Users/viren/JARVIS/jarvis_data_eng-NidhiZala/angular-frontend/Full-Stack-Event/nest/backend/src/data.json', 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading data.json:', error);
      return 'Error retrieving data.';
    }
  }
}