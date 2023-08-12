import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Id, TaskStatus } from 'src/app/abstraction/common.abstraction';
import { UpdateTaskData } from 'src/app/abstraction/task.abstraction';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task: Task;

  @Output() deleteTask = new EventEmitter<Id>();
  @Output() updateTask = new EventEmitter<UpdateTaskData<keyof Task>>();

  taskName = new FormControl();
  taskExpirationDate = new FormControl();
  taskStatus = new FormControl();



  ngOnInit() {
    this.taskName.patchValue(this.task.name);
    this.taskExpirationDate.patchValue(new Date(this.task.expirationDate));
    this.taskStatus.patchValue(this.task.status);
  }

  onDelete(): void {
    this.deleteTask.emit(this.task.id);
  }

  onUpdateName(value: string): void {
    const updateEvent: UpdateTaskData<'name'> = {
      id: this.task.id,
      propName: 'name',
      value,
      ...(!this.task.id ? {temporaryId: this.task.temporaryId} : {}),
    };
    this.updateTask.emit(updateEvent);
  }

  onUpdateStatus(value: boolean): void {
    const status = value ? TaskStatus.done : TaskStatus.inProgress;

    const updateEvent: UpdateTaskData<'status'> = {
      id: this.task.id,
      propName: 'status',
      value: status,
      ...(!this.task.id ? {temporaryId: this.task.temporaryId} : {}),
    };
    this.updateTask.emit(updateEvent);
  }

  onUpdateExpirationDate(value: number): void {
    const updateEvent: UpdateTaskData<'expirationDate'> = {
      id: this.task.id,
      propName: 'expirationDate',
      value,
      ...(!this.task.id ? {temporaryId: this.task.temporaryId} : {}),
    };
    this.updateTask.emit(updateEvent);
  }
}
