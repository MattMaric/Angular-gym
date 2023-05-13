import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassScheduleDialogComponent } from './class-schedule-dialog.component';

describe('ClassScheduleDialogComponent', () => {
  let component: ClassScheduleDialogComponent;
  let fixture: ComponentFixture<ClassScheduleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassScheduleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
