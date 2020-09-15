import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LogService } from '../../Services/log.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
  dateSelected: string;
  timeLogged: string;
  projectName: string;
  first_name: string;
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
    'projectName',
    'first_name',
    'actions',
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public LogService: LogService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.getLogs();
  }

  cars: any = [];
  ngOnInit(): void {}

  getLogs(): void {
    this.LogService.getLogs().then((res: any) => {
      for (var i = 0; i < res.length; i++) {
        res[i].dateSelected = this.datePipe.transform(
          res[i].dateSelected,
          'dd-MM-yyyy'
        );
        this.ELEMENT_DATA.push(res[i]);
        console.log(res[i]);
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
