import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-color-coordinate',
  imports: [ReactiveFormsModule, CommonModule],
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
    }
  }
  rows: any[] = [];
  columns: string[] = [];
  numRows: number = 0;
  numCols: number = 0;

  createTable() {
    this.rows = Array(this.numRows).fill(null);
    this.columns = Array(this.numCols).fill(null);
  }
  
}
