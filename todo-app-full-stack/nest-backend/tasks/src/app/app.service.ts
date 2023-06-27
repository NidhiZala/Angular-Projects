// // import { Injectable } from '@nestjs/common';
// // import * as fs from 'fs';

// // //create an interface of rules
// // export interface Tasks {
// //   id: number;
// //   name: string;
// //   completed: boolean;
// // }

// // @Injectable()
// // export class AppService {
// //   private tasks: Array<Tasks>;

// //   constructor() {
// //     this.tasks = JSON.parse(
// //       fs.readFileSync(
// //         'src/tasks.json',
// //         'utf-8',
// //       ),
// //     );
// //   }
// //   getTasks(): Tasks[] {
// //     return this.tasks;
// //   }
// //   //Take input parameter taskname while creating tasks
// //   createTasks(name: string): Tasks[] {
// //     //set id and completed to false
// //     const newTasks = { id: this.tasks.length + 1, name, completed: false };
// //     this.tasks = [...this.tasks, { ...newTasks }];
// //     fs.writeFileSync('tasks.json', JSON.stringify(this.tasks));
// //     return this.tasks;
// //   }
// //   //delete tasks based on id
// //   deleteTasks(id: number): Tasks[] {
// //     //search for index to be deleted
// //     const index = this.tasks.findIndex((tasks) => tasks.id === id);
// //     this.tasks.splice(index, 1);
// //     return this.tasks;
// //   }
// // }
// import { Injectable } from '@nestjs/common';
// import * as fs from 'fs';

// export interface Tasks {
//   id: number;
//   name: string;
//   completed: boolean;
// }

// @Injectable()
// export class AppService {
//   private tasks: Array<Tasks>;

//   constructor() {
//     this.tasks = JSON.parse(fs.readFileSync('src/tasks.json', 'utf-8'));
//   }

//   getTasks(): Tasks[] {
//     return this.tasks;
//   }

//   createTasks(name: string): Tasks[] {
//     const newTasks = { id: this.tasks.length + 1, name, completed: false };
//     this.tasks = [...this.tasks, { ...newTasks }];
//     fs.writeFileSync('src/tasks.json', JSON.stringify(this.tasks));
//     return this.tasks;
//   }

//   deleteTasks(id: number): Tasks[] {
//     const index = this.tasks.findIndex((task) => task.id === id);
//     this.tasks.splice(index, 1);
//     return this.tasks;
//   }
// }
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

export interface Tasks {
  id: number;
  name: string;
  completed: boolean;
}

@Injectable()
export class AppService {
  private tasks: Array<Tasks>;

  constructor() {
    this.tasks = JSON.parse(fs.readFileSync('src/tasks.json', 'utf-8'));
  }

  getTasks(): Tasks[] {
    return this.tasks;
  }

  createTasks(name: string): Tasks[] {
    const newTasks = { id: this.tasks.length + 1, name, completed: false };
    this.tasks = [...this.tasks, { ...newTasks }];
    fs.writeFileSync('src/tasks.json', JSON.stringify(this.tasks));
    return this.tasks;
  }

  deleteTasks(id: number): Tasks[] {
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(index, 1);
    return this.tasks;
  }
}

