import { Injectable } from '@angular/core';
import { Observable, map, mapTo, of, timer } from 'rxjs';
import { Task } from '../models/task';
import { tasks } from '../data/mockTasks';
import { DataServiceService } from '../data/data-service.service';
import { isIndexExist } from '../utilities/common.util';

@Injectable({
  providedIn: 'root'
})
export class TaskDaoService {

  constructor(private taskController: DataServiceService) { }

  getTasks(): Observable<Task[]> {
    const fetchedTasks = timer(3_000).pipe(mapTo(tasks));

    return fetchedTasks.pipe(
      map(tasks => tasks.map(task => new Task(task))),
    );
  }

  createTask(taskData: Partial<Task>): Observable<Partial<Task>> {
    const newTask = this.taskController.setTask(taskData);
    return timer(2_000).pipe(mapTo(newTask));
  }

  deleteTask(id: string): void {
    const index = tasks.findIndex(el => el.id === id);

    if(!isIndexExist(index)) {
      return;
    }

    tasks.splice(index, 1);
  }

  updateTask(updatedTask: Task) {
    tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
  }
}
