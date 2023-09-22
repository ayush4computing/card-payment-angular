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
  sortOrder: string = ''; // Default sorting by title
  filterStatus: string = ''; // Default filter: All

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    }

  sortTasks(): void {
  }

  filterTasksByStatus(): void {

  }

  private sortFilteredTasks(): void {

  }
}
