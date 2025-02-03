import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, RouterLink, RouterOutlet } from "@angular/router";
import { UsersService } from "../users.service";

@Component({
  selector: "app-user-tasks",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./user-tasks.component.html",
  styleUrl: "./user-tasks.component.css",
})
export class UserTasksComponent {
  // Signal version
  userId = input.required<string>();
  private usersService = inject(UsersService);

  userName = computed(
    () => this.usersService.users.find((u) => u.id === this.userId())?.name
  );

  // Observable version

  // export class UserTasksComponent implements OnInit {

  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // userName = "";

  // ngOnInit(): void {
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.userName =
  //         this.usersService.users.find((u) => u.id === paramMap.get("userId"))
  //           ?.name || "";
  //     },
  //   });

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }
}
