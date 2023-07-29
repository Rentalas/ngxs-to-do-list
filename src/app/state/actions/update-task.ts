import { UpdateTaskData } from "src/app/abstraction/task.abstraction";
import { Task } from "src/app/models/task";

export class UpdateTask {
    static readonly type = 'Update Task';

    constructor(public updateTaskData: UpdateTaskData<keyof Task>) {

    }
}