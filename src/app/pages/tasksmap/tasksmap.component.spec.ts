import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksmapComponent } from './tasksmap.component';

describe('TasksmapComponent', () => {
  let component: TasksmapComponent;
  let fixture: ComponentFixture<TasksmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
