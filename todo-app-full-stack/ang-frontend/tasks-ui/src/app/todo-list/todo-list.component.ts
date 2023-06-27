import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
interface Task {
  id: number;
  name: string;
  completed: boolean;
}
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
    tasks: Task[];
    task: string;
  
    constructor(private taskService: TasksService,  private authService: AuthService, private http: HttpClient) {
      this.tasks = [];
      this.task = '';
    }
  
    title = 'task-ui';
  
    ngOnInit() {
      this.taskService.getTasks().subscribe((data: Object) => {
        console.log(data);
        this.tasks = data as Task[];
      });
    }
  
    addTask(task: string) {
      this.taskService.createTasks(task).subscribe(() => {
        this.task = '';
        this.taskService.getTasks().subscribe((data: Object) => {
          console.log(data);
          this.tasks = data as Task[];
        });
      });
    }
  
    deleteTask(id: number) {
      this.taskService.deleteTasks(id).subscribe(() => {
        console.log(`Task with ID ${id} deleted.`);
        this.taskService.getTasks().subscribe((data: Object) => {
          console.log(data);
          this.tasks = data as Task[];
        });
      });
    }
    signOut(): void {
      this.http.get('/api/auth/signout').subscribe(
        () => {
          console.log('Signed out successfully');
          // Perform any additional actions after sign-out, such as redirecting to the login page.
          // You can use the Angular Router for navigation.
        },
        (error) => {
          console.log('Error occurred during sign-out', error);
        }
      );
    }
    
}
  

