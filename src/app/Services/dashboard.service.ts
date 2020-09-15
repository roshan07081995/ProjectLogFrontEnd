import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  apiURL: string = 'http://localhost:5000/api/v1/';
  constructor(private http: HttpClient) {}
  public getData() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.apiURL}` + 'employees', { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            console.log(err);
          }
        );
    });
  }
}
