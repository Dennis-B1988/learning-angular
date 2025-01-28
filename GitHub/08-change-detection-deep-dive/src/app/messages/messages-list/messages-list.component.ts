import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from "@angular/core";
import { MessagesService } from "../messages.service";

@Component({
  selector: "app-messages-list",
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: "./messages-list.component.html",
  styleUrl: "./messages-list.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  private messagesService = inject(MessagesService);
  // messages$ = this.messagesService.messages$;

  // private cdRef = inject(ChangeDetectorRef);
  // private destroyRef = inject(DestroyRef);

  // messages: string[] = [];
  messages = this.messagesService.allMessages;
  // get messages() {
  //   return this.messagesService.allMessages;
  // }

  // ngOnInit() {
  //   const subscription = this.messagesService.messages$.subscribe(
  //     (messages) => {
  //       this.messages = messages;
  //       this.cdRef.markForCheck();
  //     }
  //   );
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return "MessagesList Component Debug Output";
  }
}
