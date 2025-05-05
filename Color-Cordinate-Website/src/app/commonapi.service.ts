import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonapiService {

  constructor() { }

  private http = inject(HttpClient);
  private apiUrl = 'https://www.cs.colostate.edu:4444/~c837317580/api_colors.php';

  public fetchMe() {
    return this.http.get(this.apiUrl);
  }

  public pushMe(colorData: any) {
    return this.http.post(this.apiUrl, colorData);
  }

  public putMe(colorData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.apiUrl, colorData, httpOptions);
  }

  public deleteMe(colorData: any) {
    return this.http.delete(this.apiUrl, colorData);
  }
}
