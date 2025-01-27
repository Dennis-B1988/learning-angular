import { bootstrapApplication } from "@angular/platform-browser";

import { InjectionToken } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { TasksService } from "./app/tasks/tasks.service";
// import { TasksService } from './app/tasks/tasks.service';

export const TasksServiceToken = new InjectionToken<TasksService>(
  "task-service-token",
);

// bootstrapApplication(AppComponent, { providers: [TasksService] }).catch((err) => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [{ provide: TasksServiceToken, useClass: TasksService }],
}).catch((err) => console.error(err));
// bootstrapApplication(AppComponent).catch((err) => console.error(err));
