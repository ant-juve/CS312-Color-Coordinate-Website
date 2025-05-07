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
    this.common.fetchMe().subscribe(
      (colors: any) => {
        this.colors = colors;
        console.log(this.colors);
      },
      () => {}
    );
  }

  addColor(): void {
    const colorData = {
      action: 'add',
      name: this.addForm.value.name,
      hexvalue: this.addForm.value.hexvalue
    }
    this.common.pushMe(colorData).subscribe(response => {
      next: (response: any) => {
        this.message = 'Color added - ' + response;
        this.addForm.reset();
        this.loadColors();
      }
      // error: (error) => {
      // this.message = "Color already exists";
      // this.message = response.message;
      // },
    }
    );
  }

  editColor(): void {
    const colorData = {
      action: 'put',
      name: this.editForm.value.name,
      editName: this.editForm.value.editName,
      editHexValue: this.editForm.value.editHexValue,

    }
    this.common.putMe(colorData).subscribe(response => {

    //   if (response.success) {
        this.message = 'Color updated.';
        this.editForm.reset();
        this.loadColors();
    //   } else {
    //     this.message = "Color already exists";
    //     this.message = response.message;
    //   }
      
    })
    
  }

  deleteColor(): void {
    const colorData = {
      action: 'delete',
      name: this.deleteForm.value.name,
    }
    this.common.deleteMe(colorData).subscribe(response => {

    //   if (response.success) {
        this.message = 'Color deleted.';
        this.deleteForm.reset();
        this.loadColors();
    //   } else {
    //     this.message = "Color already exists";
    //     this.message = response.message;
    //   }
      
    })
  }

}
