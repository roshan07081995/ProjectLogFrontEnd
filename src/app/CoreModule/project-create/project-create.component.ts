import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProjectService } from '../../Services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css'],
})
export class ProjectCreateComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public ProjectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.ProjectService.getSingleProjectdata(id).then(
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
      projectName: ['', [Validators.required]],
      projectDescription: ['', [Validators.required]],
      totalEstimate: ['', [Validators.required]],
    });
  }

  submitForm() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.ProjectService.updateProject(this.myForm.value, id).then((res) =>
          console.log(res)
        );
        this.router.navigate(['/projects']);
      } else {
        this.ProjectService.addProject(this.myForm.value)
          .then((data: any) => {
            if (data) {
              console.log(data);
            }
            //for refresh
          })
          .catch((err) => {
            console.log(err);
          });
        this.router.navigate(['/projects']);
      }
    });
  }
}
