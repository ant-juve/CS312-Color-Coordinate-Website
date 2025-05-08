import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonapiService } from '../commonapi.service';

@Component({
  selector: 'app-color-selector',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, JsonPipe],
  templateUrl: './color-selector.component.html',
  styleUrl: './color-selector.component.css',
  providers: [CommonapiService],
})
export class ColorSelectorComponent implements OnInit {
  public data: any
  addForm: FormGroup;
  editForm: FormGroup;
  deleteForm: FormGroup;
  colors: any[] = [];
  colorID: number = 0;
  name: string = '';
  hexvalue: string = '';
  message = '';

  constructor(private fb: FormBuilder, public common: CommonapiService){  
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      hexvalue: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/), Validators.minLength(6), Validators.maxLength(6)]]
    });
    

    this.editForm = this.fb.group({
      name: ['name',[Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      editName: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      editHexValue: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/), Validators.minLength(6), Validators.maxLength(6)]]
      });
      
    this.deleteForm = this.fb.group({
      name: new FormControl('name')
    });
  }

  ngOnInit(): void {
    this.loadColors();
  }

  loadColors(): void {
    this.common.getColors().subscribe(
      (colors: any) => {
        this.colors = colors;
        console.log(this.colors);
      },
      () => {}
    );
  }

  addColor(): void {
    const name = this.addForm.value.name;
    const hexvalue = this.addForm.value.hexvalue;

    this.common.addColor(name, hexvalue).subscribe({
      next: (response) => {
        this.message = 'Color added.';
        this.addForm.reset();
        this.loadColors();
      },
      error: (err) => {
        this.message = 'Error adding color.';
      }
    });
  }

  editColor(): void {
    const originalName = this.editForm.value.name;
    const newName = this.editForm.value.editName;
    const newHex = this.editForm.value.editHexValue;

    this.common.editColor(originalName, newName, newHex).subscribe({
      next: () => {
        this.message = 'Color updated.';
        this.editForm.reset();
        this.loadColors();
      },
      error: () => {
        this.message = 'Error editing color.';
      }
    });
  }

  deleteColor(): void {
    const name = this.deleteForm.value.name;

    const confirmed = window.confirm(`Are you sure you want to delete the color "${name}"?`);
  if (!confirmed) {
    this.message = 'Deletion canceled.';
    return;
  }
  if (this.colors.length <= 2) {
    this.message = '2 Colors must be in database';
    return;
  }
    this.common.deleteColor(name).subscribe({
      next: () => {
        this.message = 'Color deleted.';
        this.deleteForm.reset();
        this.loadColors();
      },
      error: () => {
        this.message = 'Error deleting color.';
      }
    });
  }

}
