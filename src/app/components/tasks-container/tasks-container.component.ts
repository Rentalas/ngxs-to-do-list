import { ChangeDetectorRef, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Id } from 'src/app/abstraction/common.abstraction';
import { UpdateTaskData } from 'src/app/abstraction/task.abstraction';
import { Task } from 'src/app/models/task';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { CreateTask } from 'src/app/state/actions/create-task';
import { DeleteTask } from 'src/app/state/actions/delete-task';
import { GetTasks } from 'src/app/state/actions/get-tasks';
import { UpdateTask } from 'src/app/state/actions/update-task';

@Component({
  selector: 'app-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss'],
  providers: [UnsubscribeService]
})
export class TasksContainerComponent {
  @Select((state) => state.todo.tasks) tasks$: Observable<Task[]>;
  tasks: Task[] = [];

  constructor(
    private store: Store,
    private unsubscribeService: UnsubscribeService,
    ) {
  }

  ngOnInit() {
    this.tasks$.pipe(
      takeUntil(this.unsubscribeService.unsubscribe$)
    ).subscribe(tasks => {
      this.tasks = tasks;
    })

    this.getTasks();
  }

  private getTasks(): void {
   this.store.dispatch(new GetTasks());
  }

  createTask(): void {

    this.store.dispatch(new CreateTask())
  }

  updateTask(updateData: UpdateTaskData<keyof Task>): void {
    this.store.dispatch(new UpdateTask(updateData))
  }

  deleteTask(id: Id): void {
    this.store.dispatch(new DeleteTask(id))
  }
}
