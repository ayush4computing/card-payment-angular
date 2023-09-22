import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task: Task = { id: 0, title: '', description: '', done: false, priority: 'medium', dueDate: null };

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  
  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(taskId) || { id: 0, title: '', description: '', done: false, priority: 'medium', dueDate: null };
  }

  saveTask(): void {
    if (this.task.id === 0) {
      this.taskService.addTask(this.task);
    } else {
      this.taskService.updateTask(this.task);
    }
    this.router.navigate(['/tasks']);
  }

  deleteTask(): void {
    if (this.task.id !== 0) {
      this.taskService.deleteTask(this.task.id);
    }
    this.router.navigate(['/tasks']);
  }
}
