import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  output,
  Output,
  viewChild,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, ButtonComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  // @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  // @Output() add = new EventEmitter<{ title: string; request: string }>();
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  add = output<{ title: string; request: string }>();

  ngOnInit() {
    console.log('On Init');
    console.log(this.form().nativeElement);
  }

  ngAfterViewInit() {
    console.log('After View Init');
    console.log(this.form().nativeElement);
  }

  onSubmit(titleElement: HTMLInputElement, requestElement: HTMLTextAreaElement) {
    this.add.emit({
      title: titleElement.value,
      request: requestElement.value,
    });
    // this.form?.nativeElement.reset();
    this.form().nativeElement.reset();
  }
}
