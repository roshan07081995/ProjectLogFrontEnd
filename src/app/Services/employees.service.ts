import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  apiURL: string = 'http://localhost:5000/api/v1/';
  constructor(private http: HttpClient) {}
  public getEmployees() {
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
  public addEmployee(data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.apiURL}` + 'employees', JSON.stringify({ ...data }), {
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

  getSingleEmployeedata(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiURL}` + 'employees/' + id).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  updateEmployee(data, id) {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.apiURL}` + 'employees/' + id, data).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteEmployee(data, id) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.apiURL}` + 'employees/' + id, data).subscribe(
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
