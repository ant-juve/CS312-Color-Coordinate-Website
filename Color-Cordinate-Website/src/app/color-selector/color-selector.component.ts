import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  public colorID: number = 0;
  public name: string = '';
  public hexvalue: string = '';


  phpUrl = 'https://github.com/ant-juve/CS312-Color-Coordinate-Website/blob/main/api_colors.php'; //change after php file is made

  loadColorsUrl = 'https://github.com/ant-juve/CS312-Color-Coordinate-Website/blob/main/api_colors.php';

  message ='';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.addForm = this.fb.group({
      name: ['name'],
      hexvlue: ['hexvalue']
    });

    this.editForm = this.fb.group({
      id: ['colorID'],
      name: ['name'],
      hexvalue: ['hexvalue']
    })

    this.deleteForm = this.fb.group({
      id: ['colorID']
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
      hexvlue: this.addForm.value.hexvalue
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
