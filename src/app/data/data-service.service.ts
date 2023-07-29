import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { tasks } from './mockTasks';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }

  setTask(taskData: Partial<Task>): Partial<Task> {
    let biggestId: number = 0;

    tasks.forEach(task => {
      biggestId = +task.id > biggestId ? +task.id : biggestId;
    })

    taskData.id = String(biggestId + 1);
    tasks.push(taskData);

    return taskData;
  }
}
