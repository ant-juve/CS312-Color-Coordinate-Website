import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonapiService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://www.cs.colostate.edu:4444/~c837317580/api_colors.php';

  public fetchMe() {
    return this.http.get(this.apiUrl);
  }

  public pushMe(colorData: any) {
    return this.http.post(this.apiUrl, colorData);
  }

  public putMe(colorData: any) : Observable<any> {
    return this.http.put<any>(this.apiUrl, colorData);
  }

  public deleteMe(colorData: any) {
    return this.http.delete<any>(this.apiUrl, colorData);
  }
}
