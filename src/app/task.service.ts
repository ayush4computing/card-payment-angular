import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private taskIdCounter = 1;

  constructor() {}

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    task.id = this.taskIdCounter++;
    this.tasks.push(task);
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  deleteTask(id: number): void {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
