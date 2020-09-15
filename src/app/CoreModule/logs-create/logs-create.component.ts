import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LogService } from '../../Services/log.service';
import { EmployeesService } from '../../Services/employees.service';
import { ProjectService } from '../../Services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-logs-create',
  templateUrl: './logs-create.component.html',
  styleUrls: ['./logs-create.component.css'],
})
export class LogsCreateComponent implements OnInit {
  myForm: FormGroup;
  EmployeeList: any;
  ProjectList: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    public LogService: LogService,
    public EmployeeService: EmployeesService,
    public ProjectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.LogService.getSingleLogdata(id).then(
          (res: any) => {
            console.log(res[0]);
            this.myForm.patchValue(res[0]);
          },
          (err) => {}
        );
      }
    });
  }

  ngOnInit(): void {
    this.reactiveForm();
    this.EmployeeService.getEmployees().then((res) => {
      this.EmployeeList = res;
    });
    this.ProjectService.getProjects().then((res) => {
      this.ProjectList = res;
    });
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      dateSelected: ['', [Validators.required]],
      timeLogged: ['', [Validators.required]],
      projectId: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
    });
  }

  submitForm() {
    this.myForm.value.dateSelected = this.datePipe.transform(
      this.myForm.value.dateSelected,
      'yyyy-MM-dd'
    );
    this.activatedRoute.queryParams.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.LogService.updateLog(this.myForm.value, id).then((res) =>
          console.log(res)
        );
        this.router.navigate(['/logs']);
      } else {
        this.LogService.addLog(this.myForm.value)
          .then((data: any) => {
            if (data) {
              console.log(data);
            }
            //for refresh
          })
          .catch((err) => {
            console.log(err);
          });
        this.router.navigate(['/logs']);
      }
    });
  }
}
