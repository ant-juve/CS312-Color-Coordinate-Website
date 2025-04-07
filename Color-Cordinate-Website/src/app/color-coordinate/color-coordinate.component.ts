import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-color-coordinate',
  imports: [ReactiveFormsModule],
  templateUrl: './color-coordinate.component.html',
  styleUrl: './color-coordinate.component.css'
})
export class ColorCoordinateComponent {

  userForm: FormGroup;
  row = 0;
  col = 0;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      row: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      column: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  onSubmit() {
    if (this.userForm.value) {
      console.log(this.userForm.value);
      // Perform actions with the form data, e.g., send to an API
    }
  }

}
