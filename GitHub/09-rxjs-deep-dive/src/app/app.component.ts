import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { interval, map, Observable } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount); // converts signal to observable
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 }); // converts observable to signal

  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);

  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      if (timesExecuted === 5) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      subscriber.next({ message: "New value" });
      timesExecuted++;
    }, 2000);
  });
  private destroyRef = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log(`Click count: ${this.clickCount()}`);
    // });
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.interval.update((prev) => prev + 1);
    //   console.log("interval", this.interval());
    //   console.log("double interval", this.doubleInterval());
    // }, 1000);
    // const subscription = interval(1000)
    //   .pipe(map((value) => value * 2))
    //   .subscribe({
    //     next: (value) => {
    //       console.log(value);
    //     },
    // });
    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
    this.customInterval$.subscribe({
      next: (value) => {
        console.log(value);
      },
      complete: () => {
        console.log("complete");
      },
    });
    const subscription = this.clickCount$.subscribe({
      next: (value) => {
        console.log(value);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onCLick() {
    this.clickCount.update((prev) => prev + 1);
  }
}
