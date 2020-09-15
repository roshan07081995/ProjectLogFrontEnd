import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LogService } from '../../Services/log.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  dateSelected: string;
  timeLogged: string;
  projectId: string;
  employeeId: string;
}

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})
export class LogsComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = [
    'dateSelected',
    'timeLogged',
    'projectId',
    'employeeId',
    'actions',
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public LogService: LogService, private router: Router) {
    this.getLogs();
  }

  cars: any = [];
  ngOnInit(): void {}

  getLogs(): void {
    this.LogService.getLogs().then((res: any) => {
      for (var i = 0; i < res.length; i++) {
        this.ELEMENT_DATA.push(res[i]);
        this.dataSource = this.ELEMENT_DATA;
      }
    });
  }
  goToAdd() {
    this.router.navigate(['/log-add']);
  }

  editlog(id) {
    this.router.navigate(['/log-add/'], { queryParams: { id: id } });
  }

  deletelog(id) {
    var data = { deleted: '1' };
    this.LogService.deleteLog(data, id).then((res) => console.log(res));
    window.location.reload();
  }
}
