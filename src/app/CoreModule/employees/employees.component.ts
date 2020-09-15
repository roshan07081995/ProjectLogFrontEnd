import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../../Services/employees.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'organization',
    'designation',
    'actions',
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public EmployeeService: EmployeesService,
    private router: Router
  ) {
    this.getEmployees();
  }

  cars: any = [];
  ngOnInit(): void {}

  getEmployees(): void {
    this.EmployeeService.getEmployees().then((res: any) => {
      for (var i = 0; i < res.length; i++) {
        this.ELEMENT_DATA.push(res[i]);
        this.dataSource = this.ELEMENT_DATA;
      }
    });
  }
  goToAdd() {
    this.router.navigate(['/employee-add']);
  }

  editemployee(id) {
    this.router.navigate(['/employee-add/'], { queryParams: { id: id } });
  }

  deleteemployee(id) {
    var data = { deleted: '1' };
    this.EmployeeService.deleteEmployee(data, id).then((res) =>
      console.log(res)
    );
    window.location.reload();
  }
}
