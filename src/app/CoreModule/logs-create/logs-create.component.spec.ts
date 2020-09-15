import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsCreateComponent } from './logs-create.component';

describe('LogsCreateComponent', () => {
  let component: LogsCreateComponent;
  let fixture: ComponentFixture<LogsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
