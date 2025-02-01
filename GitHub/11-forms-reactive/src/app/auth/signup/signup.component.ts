import { Component } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;
    if (val1 === val2) {
      return null;
    }
    return { valuesNotEqual: true };
  };
}

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl("", {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl("", {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      { validators: [equalValues("password", "confirmPassword")] },
    ),
    firstName: new FormControl("", { validators: [Validators.required] }),
    lastName: new FormControl("", { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl("", { validators: [Validators.required] }),
      number: new FormControl("", { validators: [Validators.required] }),
      postalCode: new FormControl("", { validators: [Validators.required] }),
      city: new FormControl("", { validators: [Validators.required] }),
    }),
    role: new FormControl<
      "student" | "teacher" | "employee" | "founder" | "other"
    >("student", {
      validators: [Validators.required],
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    termsAndConditions: new FormControl(false, {
      validators: [Validators.requiredTrue],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.get("email")?.touched &&
      this.form.get("email")?.dirty &&
      this.form.get("email")?.invalid
    );
  }

  // get passwordIsInvalid() {
  //   return (
  //     this.form.get("password")?.touched &&
  //     this.form.get("password")?.dirty &&
  //     this.form.get("password")?.invalid
  //   );
  // }

  // get confirmPasswordIsInvalid() {
  //   return (
  //     this.form.get("confirmPassword")?.touched &&
  //     this.form.get("confirmPassword")?.dirty &&
  //     this.form.get("confirmPassword")?.invalid
  //   );
  // }

  onSubmit() {
    if (this.form.invalid) {
      console.log("Invalid form");
      return;
    }
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.passwords;
    console.log(enteredEmail, enteredPassword);
  }

  onReset() {
    this.form.reset();
  }
}
