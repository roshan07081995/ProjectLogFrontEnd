import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectService } from '../../Services/project.service';
export interface PeriodicElement {
  projectName: string;
  projectDescription: string;
  totalEstimate: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = [
    'projectName',
    'projectDescription',
    'totalEstimate',
    'actions',
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private router: Router, public ProjectService: ProjectService) {
    this.getProjects();
  }

  ngOnInit(): void {}

  getProjects(): void {
    this.ProjectService.getProjects().then((res: any) => {
      for (var i = 0; i < res.length; i++) {
        this.ELEMENT_DATA.push(res[i]);
        this.dataSource = this.ELEMENT_DATA;
      }
    });
  }
  goToAdd() {
    this.router.navigate(['/project-add']);
  }
  editproject(id) {
    this.router.navigate(['/project-add/'], { queryParams: { id: id } });
  }

  deleteproject(id) {
    var data = { deleted: '1' };
    this.ProjectService.deleteProject(data, id).then((res) => console.log(res));
    window.location.reload();
  }
}
