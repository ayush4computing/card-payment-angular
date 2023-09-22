import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private taskIdCounter = 1;

  constructor() {}

  getTasks(): any {
    
  }

  addTask(task: Task): void {

  }

  getTaskById(id: number): any{
  }

  updateTask(updatedTask: Task): void {

  }

  deleteTask(id: number): void {

  }
}
