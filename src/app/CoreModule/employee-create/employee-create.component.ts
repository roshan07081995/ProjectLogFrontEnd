import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeesService } from '../../Services/employees.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public EmployeeService: EmployeesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.EmployeeService.getSingleEmployeedata(id).then(
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
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      organization: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      salary: ['', [Validators.required]],
    });
  }

  submitForm() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.EmployeeService.updateEmployee(this.myForm.value, id).then((res) =>
          console.log(res)
        );
        this.router.navigate(['/employees']);
      } else {
        this.EmployeeService.addEmployee(this.myForm.value)
          .then((data: any) => {
            if (data) {
            }
            //for refresh
          })
          .catch((err) => {});
        this.router.navigate(['/employees']);
      }
    });
  }
}
