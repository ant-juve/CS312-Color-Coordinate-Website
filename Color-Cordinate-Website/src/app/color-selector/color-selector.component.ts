import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-selector',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './color-selector.component.html',
  styleUrl: './color-selector.component.css'
})
export class ColorSelectorComponent implements OnInit{
  addForm: FormGroup;
  editForm: FormGroup;
  deleteForm: FormGroup;
  colors: any[] =[];

  phpUrl = 'TODO'; //change after php file is made

  loadColorsUrl = 'TODO';

  message ='';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.addForm = this.fb.group({
      name: [''],
      hex: ['']
    });

    this.editForm = this.fb.group({
      id: [''],
      name: [''],
      hex: ['']
    })

    this.deleteForm = this.fb.group({
      id: ['']
    });
  }


  ngOnInit(): void {
  this.loadColors();
  }
  loadColors(): void {
    this.http.get<any[]>(this.loadColorsUrl).subscribe(data => this.colors = data);
  }

  addColor(): void {
    const colorData = {
      action: 'add',
      name: this.addForm.value.name,
      hex: this.addForm.value.hex
    };
  
    this.http.post<any>(this.phpUrl, colorData).subscribe(response => {
      
      if (response.success) {
        this.message = 'Color added.';
        this.addForm.reset();
        this.loadColors();
      } else {
        this.message = response.message || 'Color already exists';
      }
    });
  }
  
  editColor(): void {

  }

  deleteColor(): void {
    
  }
}
