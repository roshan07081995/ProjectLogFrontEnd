import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  apiURL: string = 'http://localhost:5000/api/v1/';
  constructor(private http: HttpClient) {}
  public getLogs() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.apiURL}` + 'logtime', { headers: headers })
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
  public addLog(data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.apiURL}` + 'logtime', JSON.stringify({ ...data }), {
          headers: headers,
        })
        .subscribe(
          (res) => {
            resolve(res);
            console.log(res);
          },
          (err) => {
            reject(err);
            console.log(err);
          }
        );
    });
  }

  getSingleLogdata(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiURL}` + 'logtime/' + id).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  updateLog(data, id) {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.apiURL}` + 'logtime/' + id, data).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteLog(data, id) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.apiURL}` + 'logtime/' + id, data).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
