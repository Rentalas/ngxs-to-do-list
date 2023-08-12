import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Task } from "../models/task";
import { TaskDaoService } from "../services/task-dao.service";
import { CreateTask } from "./actions/create-task";
import { DeleteTask } from "./actions/delete-task";
import { GetTasks } from "./actions/get-tasks";
import { UpdateTask } from "./actions/update-task";

@State({
    name: 'todo',
    defaults:  {
        tasks: [],
    }
})
@Injectable()
export class ToDoState {

    constructor(private taskDaoService: TaskDaoService) {

    }

    @Action(GetTasks)
    getTasks(ctx: StateContext<{tasks: Task[]}>, action: GetTasks) {
        const state = ctx.getState();
        this.taskDaoService.getTasks().subscribe(tasks => {
            ctx.setState({
                ...state,
                tasks,
            })
        })
    }

    @Action(UpdateTask)
    updateTask(ctx: StateContext<{tasks: Task[]}>, action: UpdateTask) {
        const { id, propName, value, temporaryId } = action.updateTaskData;
        const state = ctx.getState();
        const taskToUpdate = state.tasks.find(task => {
            if (temporaryId) {
                return task.temporaryId === temporaryId;
            }

            return task.id === id;
        });

        if(!taskToUpdate.isValid()) {
            return;
        }

        if (!taskToUpdate.isExisted) {
            this.registerTask(taskToUpdate, ctx, temporaryId);
            return;
        }

        const clonedTask = taskToUpdate.clone();
        (clonedTask as any)[propName] = value;
        this.taskDaoService.updateTask(clonedTask);
        const newTasks = state.tasks.map(task => task.id === id ? clonedTask : task)


        ctx.setState({
            ...state,
            tasks: newTasks,
        });
    }

    @Action(CreateTask)
    createTask(ctx: StateContext<{tasks: Task[]}>, action: CreateTask) {
        const state = ctx.getState();
        const newTask = new Task({});
        newTask.isExisted = false;

        ctx.setState({
            ...state,
            tasks: [...state.tasks, newTask]
        })
    }

    @Action(DeleteTask)
    deleteTask(ctx: StateContext<{tasks: Task[]}>, action: DeleteTask) {
        const state = ctx.getState();
        this.taskDaoService.deleteTask(action.id);
        const newTasks = state.tasks.filter(task => task.id !== action.id);
        ctx.setState({
            ...state,
            tasks: newTasks,
        });
    }

    private registerTask(
        taskToUpdate: Task,
        ctx: StateContext<{tasks: Task[]}>,
        taskIdentifier: Symbol,
    ) {
        const state = ctx.getState();
        this.taskDaoService.createTask(taskToUpdate).subscribe(taskData => {
            const newTask = new Task(taskData);
            const newTasks = state.tasks.map(
                task => task.temporaryId === taskIdentifier ? newTask : task
            );
            ctx.setState({
                ...state,
                tasks: newTasks,
            });
        })
    }
}