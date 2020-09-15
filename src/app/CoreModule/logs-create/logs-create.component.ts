import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LogService } from '../../Services/log.service';
import { EmployeesService } from '../../Services/employees.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logs-create',
  templateUrl: './logs-create.component.html',
  styleUrls: ['./logs-create.component.css'],
})
export class LogsCreateComponent implements OnInit {
  myForm: FormGroup;
  EmployeeList: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    public LogService: LogService,
    public EmployeeService: EmployeesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.LogService.getSingleLogdata(id).then(
          (res: any) => {
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
    console.log(this.myForm.value);

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
