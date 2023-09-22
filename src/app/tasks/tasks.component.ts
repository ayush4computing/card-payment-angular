import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  sortOrder: string = 'title'; // Default sorting by title
  filterStatus: string = 'all'; // Default filter: All

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks; // Initialize filteredTasks with all tasks
  }

  sortTasks(): void {
    this.sortFilteredTasks();
    console.log(this.filteredTasks, this.sortOrder);
  }

  filterTasksByStatus(): void {
    console.log(this.tasks);
    if (this.filterStatus === 'all') {
      // Show all tasks
      this.filteredTasks = this.tasks;
    } else {
      // Filter by status
      this.filteredTasks = this.tasks.filter((task) => {
        return (this.filterStatus === 'pending' && !task.done) || (this.filterStatus === 'done' && task.done);
      });
    }

    // Sort the filtered tasks based on the selected sortOrder
    this.sortFilteredTasks();
  }

  private sortFilteredTasks(): void {
    this.filteredTasks.sort((a, b) => {
      if (this.sortOrder === 'title') {
        return a.title.localeCompare(b.title);
      } else if (this.sortOrder === 'done') {
        return a.done === b.done ? 0 : a.done ? 1 : -1;
      }
      return 0;
    });
  }
}
