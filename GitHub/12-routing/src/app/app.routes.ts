import { inject } from "@angular/core";
import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { TasksComponent } from "./tasks/tasks.component";
import {
  resolveUserName,
  UserTasksComponent,
} from "./users/user-tasks/user-tasks.component";
import { routes as usersRoutes } from "./users/users.routes";

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 1) {
    return true;
  }

  return new RedirectCommand(router.parseUrl("/unauthorized"));
};

export const routes: Routes = [
  {
    path: "",
    component: NoTaskComponent,
    title: "No Task Selected",
  },
  {
    path: "users/:userId",
    component: UserTasksComponent,
    children: usersRoutes,
    canMatch: [dummyCanMatch],
    resolve: { userName: resolveUserName },
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
