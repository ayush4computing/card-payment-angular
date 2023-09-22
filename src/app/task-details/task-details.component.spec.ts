import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsComponent } from './task-details.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskDetailsComponent], 
      imports: [RouterModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
