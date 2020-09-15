import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../Services/dashboard.service';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  first_name: string;
  last_name: string;
  projectName: string;
  projectDescription: string;
  totalEstimate: string;
  time: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'projectName',
    'projectDescription',
    'totalEstimate',
    'time',
  ];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public DashboardService: DashboardService) {
    this.DashboardService.getData().then((res: any) => {
      for (var i = 0; i < res.length; i++) {
        this.ELEMENT_DATA.push(res[i]);
        this.dataSource = this.ELEMENT_DATA;
      }
    });
  }

  ngOnInit(): void {}
  searchProject(val) {
    this.DashboardService.getProjectData(val).then((res: any) => {
      if (res.length) {
        this.ELEMENT_DATA = [];
        for (var i = 0; i < res.length; i++) {
          this.ELEMENT_DATA.push(res[i]);
          this.dataSource = this.ELEMENT_DATA;
        }
      } else {
        this.dataSource = [];
      }
    });
  }
  searchEmployee(val) {
    this.DashboardService.getEmployeeData(val).then((res: any) => {
      if (res.length) {
        this.ELEMENT_DATA = [];
        for (var i = 0; i < res.length; i++) {
          this.ELEMENT_DATA.push(res[i]);
          this.dataSource = this.ELEMENT_DATA;
        }
      } else {
        this.dataSource = [];
      }
    });
  }
}
