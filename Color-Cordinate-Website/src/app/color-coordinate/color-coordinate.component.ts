import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  
@Component({
  selector: 'app-color-coordinate',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './color-coordinate.component.html',
  styleUrl: './color-coordinate.component.css'
})
export class ColorCoordinateComponent {
  userForm: FormGroup;

  numRows: number = 0;
  numCols: number = 0;
  numColors: number = 0;
  
  colorsList: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'brown', 'black', 'teal'];
  selColors: string[] = [];
  selRowIn: number = 0;

  colorrows: any[] = [];
  grcolumns: string[] = [];
  grrows: number[] = [];

  Message: string = '';


  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      row: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(1000)]],
      column: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(702)]],
      colors: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(10)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.numRows = this.userForm.value['row'];
      this.numCols = this.userForm.value['column'];
      this.numColors = this.userForm.value['colors'];

      this.createTable1();
      this.createTable2();
    }
  }

  createTable1() {
    const optionColors = this.colorsList.slice(0, this.numColors);
    this.colorrows = optionColors.map((color, i) => ({
      selected: i === 0,
      color: color
    }));
    this.selColors = [...optionColors];
    this.selRowIn = 0;
  }

  createTable2() {
    this.grcolumns = Array.from({ length: this.numCols }, (_, i) => this.letter(i));
    this.grrows = Array.from({ length: this.numRows }, (_, i) => (i + 1));
  }


  Radiobutton(index: number): void {
    this.selRowIn = index;
    this.colorrows.forEach((row, i) => row.selected = i === index);
  }

  ColorChange(index: number, event: any): void {
    const newColor = event.target.value;
    const prevColor = this.colorrows[index].color;

    const otherColors = this.colorrows.filter((_, i) => i !== index).map( row => row.color);

    if (otherColors.includes(newColor)) {
      event.target.value = prevColor;
      return;
    }

    this.colorrows[index].color = newColor;
    this.selColors = this.colorrows.map(row => row.color);
  }
  
  cellClick(row: number, col: string): void {
    this.Message = `${col}${row}`;
  }

  letter(index: number): string {
    let label = '';
    while (index >= 0){
      label = String.fromCharCode((index % 26) + 65) + label;
      index = Math.floor(index / 26) - 1;
    }
    return label;
  }


  printPage(): void {
    window.print();
  }

}
