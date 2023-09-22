import { TestBed } from "@angular/core/testing";
import { TaskService } from "./task.service";

describe("TaskService", () => {
  let taskService: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    taskService = TestBed.inject(TaskService);
  });

  it("should initially have an empty task list", () => {
    const tasks = taskService.getTasks();
    expect(tasks).toEqual([]);
  });

  it("should add a task to the task list", () => {
    const task = {
      description: "abc",
      done: true,
      dueDate: null,
      id: 1,
      title: "Test 1",
    };
    taskService.addTask(task);

    const tasks = taskService.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toEqual(task);
  });

  it("should get a task by its ID", () => {
    const task = {
      description: "abc",
      done: true,
      dueDate: null,
      id: 1,

      title: "Test 1",
    };
    taskService.addTask(task);

    const retrievedTask = taskService.getTaskById(1);
    expect(retrievedTask).toEqual(task);
  });

  it("should update a task in the task list", () => {
    const task = {
      description: "abc",
      done: true,
      dueDate: null,
      id: 1,

      title: "Test 1",
    };
    taskService.addTask(task);

    const updatedTask = {
      description: "abc",
      done: true,
      dueDate: null,
      id: 1,
      title: "Updated task",
    };
    taskService.updateTask(updatedTask);

    const tasks = taskService.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toEqual(updatedTask);
  });

  it("should delete a task from the task list", () => {
    const task = {
      description: "abc",
      done: true,
      dueDate: null,
      id: 1,

      title: "Test 1",
    };
    taskService.addTask(task);

    taskService.deleteTask(1);

    const tasks = taskService.getTasks();
    expect(tasks.length).toBe(0);
  });

  it("should return undefined when trying to get a non-existent task", () => {
    const retrievedTask = taskService.getTaskById(999);
    expect(retrievedTask).toBeUndefined();
  });

  it("should not update a non-existent task", () => {
    const task = {
      description: "abc",
      done: true,
      dueDate: null,
      id: 1,

      title: "Test 1",
    };
    taskService.addTask(task);

    const updatedTask = {
      id: 999,
      title: "Updated Task",
      description: "Updated Description",
      done: true,
      dueDate: null,
    };
    taskService.updateTask(updatedTask);

    const tasks = taskService.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toEqual(task);
  });

  it("should not delete a non-existent task", () => {
    const task = {
      description: "abc",
      done: true,
      dueDate: null,
      id: 1,

      title: "Test 1",
    };
    taskService.addTask(task);

    taskService.deleteTask(999);

    const tasks = taskService.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toEqual(task);
  });
});
