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
[x: string]: any;

  userForm: FormGroup;
  row = 0;
  col = 0;
  colors = 0;


  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      row: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(1000)]],
      column: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(702)]],
      colors: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(10)]]
    });
  }

  onSubmit() {
    if (this.userForm.value) {
      console.log(this.userForm.value);
    }
  }
  rows: any[] = [];
  columns: string[] = [];
  columns2: string[] = [];
  color: string[] = [];
  numRows: number = 0;
  numCols: number = 0;
  numColors: number = 0;

  createTable1() {
    let numCols2: number = 2;
    this.rows = Array(this.numColors).fill(null);
    this.columns2 = Array(numCols2).fill(null);
  }

  createTable2() {
    this.rows = Array(this.numRows).fill(null);
    this.columns = Array.from({ length: this.numCols }, (_, i) => this.letter(i));
  }

  runScripts(): void {
    this.createTable1();
    this.createTable2();
  }
  clickedMessage: string = '';
  clickedRow: number | null = null;
  clickedCol: string | null = null;
  
  cellClick(row: number, col: string): void {
    this.clickedMessage = `${col}${row}`;
    this.clickedRow = row;
    this.clickedCol = col;
  }
  currentLetter = '@';

  letter(i: number) {
    let charNum = i +65;
    let index = 0; 
    if(charNum > 90) {
      index = Math.floor((charNum-65) / 26);
      charNum = (charNum - (index*26));
      return this.currentLetter = String.fromCharCode(index +64) + String.fromCharCode(charNum);
    }
    return this.currentLetter = String.fromCharCode(i +65);
  }
  printPage(): void {
    window.print();
  }

}
