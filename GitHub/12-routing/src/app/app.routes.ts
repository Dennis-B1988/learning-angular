import { Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { TasksComponent } from "./tasks/tasks.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { routes as usersRoutes } from "./users/users.routes";

export const routes: Routes = [
  {
    path: "",
    component: NoTaskComponent,
  },
  {
    path: "users/:userId",
    component: UserTasksComponent,
    children: usersRoutes,
    // [
    //     {
    //       path: "",
    //       redirectTo: "tasks",
    //       pathMatch: "prefix",
    //     },
    //     {
    //       path: "tasks",
    //       component: TasksComponent,
    //     },
    //     {
    //       path: "tasks/new",
    //       component: NewTaskComponent,
    //     },
    // ],
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
