import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Color {
  name: string;
  hexvalue: string;
}
@Injectable({
  providedIn: 'root'
})

export class CommonapiService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://www.cs.colostate.edu:4444/~antjuve/api_colors.php';

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(this.apiUrl);
  }

  addColor(name: string, hexvalue: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      action: 'add',
      name,
      hexvalue
    });
  }

  editColor(originalName: string, newName: string, newHex: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      action: 'edit',
      name: originalName,
      editName: newName,
      editHexValue: newHex
    });
  }
  deleteColor(name: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      action: 'delete',
      name
    });
  }
}
