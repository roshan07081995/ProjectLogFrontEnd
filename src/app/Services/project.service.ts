import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiURL: string = 'http://localhost:5000/api/v1/';
  constructor(private http: HttpClient) {}
  public getProjects() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.apiURL}` + 'projects', { headers: headers })
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
  public addProject(data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.apiURL}` + 'projects', JSON.stringify({ ...data }), {
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

  getSingleProjectdata(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiURL}` + 'projects/' + id).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  updateProject(data, id) {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.apiURL}` + 'projects/' + id, data).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteProject(data, id) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.apiURL}` + 'projects/' + id, data).subscribe(
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
