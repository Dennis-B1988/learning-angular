import { AfterViewInit, Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
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
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  ngOnInit() {
    console.log('On Init');
    console.log(this.form().nativeElement);
  }

  ngAfterViewInit() {
    console.log('After View Init');
    console.log(this.form().nativeElement);
  }

  onSubmit(titleElement: HTMLInputElement, requestElement: HTMLTextAreaElement) {
    const title = titleElement.value;
    const request = requestElement.value;
    console.log(title, request);
    // this.form?.nativeElement.reset();
    this.form().nativeElement.reset();
  }
}
