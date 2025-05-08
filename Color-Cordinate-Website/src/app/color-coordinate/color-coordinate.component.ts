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
  
  colorsList: string[] = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey', 'Brown', 'Black', 'Teal'];
  selColors: string[] = [];
  selRowIn: number = 0;

  colorrows: any[] = [];
  grcolumns: string[] = [];
  grrows: number[] = [];

  location: { [key: string]: string } = {}; 
  Colorblock: { [color: string]: string[] } = {}; 
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
  
    const movedCoords = this.Colorblock[prevColor] || [];
  
    if (!this.Colorblock[newColor]) {
      this.Colorblock[newColor] = [];
    }
  
    for (const coord of movedCoords) {
      this.location[coord] = newColor;
      this.Colorblock[newColor].push(coord);
    }
  
    this.Colorblock[newColor].sort((a, b) => {
      const [aCol, aRow] = [a.match(/[A-Z]+/g)![0], parseInt(a.match(/\d+/g)![0])];
      const [bCol, bRow] = [b.match(/[A-Z]+/g)![0], parseInt(b.match(/\d+/g)![0])];
      return aCol.localeCompare(bCol) || aRow - bRow;
    });
  
    this.Colorblock[prevColor] = [];
  }
  
  cellClick(row: number, col: string): void {
    const coord = `${col}${row}`;
    const activeColor = this.colorrows[this.selRowIn].color;
  
    this.location[coord] = activeColor;
  
    if (!this.Colorblock[activeColor]) {
      this.Colorblock[activeColor] = [];
    }
    if (!this.Colorblock[activeColor].includes(coord)) {
      this.Colorblock[activeColor].push(coord);
    }
  
    for (const color of Object.keys(this.Colorblock)) {
      if (color !== activeColor) {
        const index = this.Colorblock[color].indexOf(coord);
        if (index !== -1) {
          this.Colorblock[color].splice(index, 1);
        }
      }
    }
  
    this.Colorblock[activeColor].sort((a, b) => {
      const [aCol, aRow] = [a.match(/[A-Z]+/g)![0], parseInt(a.match(/\d+/g)![0])];
      const [bCol, bRow] = [b.match(/[A-Z]+/g)![0], parseInt(b.match(/\d+/g)![0])];
      return aCol.localeCompare(bCol) || aRow - bRow;
    });
  
    this.Message = `Selected: ${coord}`;
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

  colorHexMap: { [key: string]: string } = {
    Red: '#FF0000',
    Orange: '#FFA500',
    Yellow: '#FFFF00',
    Green: '#008000',
    Blue: '#0000FF',
    Purple: '#800080',
    Grey: '#808080',
    Brown: '#A52A2A',
    Black: '#000000',
    Teal: '#008080'
  };

}
