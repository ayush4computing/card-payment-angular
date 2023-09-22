import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TasksComponent } from "./tasks.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("TasksComponent", () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      imports: [
        RouterModule,
        FormsModule,
        BrowserDynamicTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set default sortOrder to "title"', () => {
    expect(component.sortOrder).toBe("title");
  });

  it('should set default filterStatus to "all"', () => {
    expect(component.filterStatus).toBe("all");
  });

  it("should filter tasks when filterTasksByStatus is called", () => {
    component.filterStatus = "done";
    component.tasks = [
      {
        description: "abc",
        done: true,
        dueDate: null,
        id: 1,
        priority: "high",
        title: "Test 1",
      },
    ];
    component.filterTasksByStatus();
    expect(component.filteredTasks.length).toBeGreaterThan(0);
  });

  it("should sort tasks when sortTasks is called", () => {
    component.sortOrder = "done";
    component.tasks = [
      {
        description: "abc",
        done: true,
        dueDate: null,
        id: 1,
        priority: "high",
        title: "Test 1",
      },
      {
        description: "aaaaaa",
        done: true,
        dueDate: null,
        id: 1,
        priority: "high",
        title: "Test 1",
      },
    ];
    component.filterTasksByStatus();
    component.sortTasks();
    expect(component.filteredTasks[0].done).toBeTruthy();
  });
});
