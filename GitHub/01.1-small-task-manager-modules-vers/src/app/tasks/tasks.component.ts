import { Component, Input } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  standalone: false,
})
export class TasksComponent {
  @Input({ required: true }) userId?: string;
  @Input({ required: true }) name?: string;
  isAddingTasks = false;

  constructor(private tasksService: TasksService) {}

  get SelectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId!);
  }

  onStartAddTask() {
    this.isAddingTasks = true;
  }

  onCloseAddTask() {
    this.isAddingTasks = false;
  }
}
