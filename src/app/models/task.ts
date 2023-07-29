import { TaskStatus } from "../abstraction/common.abstraction";
import { isEmpty, isNullish, isObject, isString } from "../utilities/common.util";

export class Task {
    static createNewTask() {
        const temporaryName = 'name';
        const data = {
            name: temporaryName,
        };
        const task = new Task(data);

        task.name = '';

        return task;
    }

    id: string;
    name: string;
    expirationDate: number;
    status: TaskStatus;
    isExisted?: boolean = true;
    temporaryId: Symbol;



    constructor(data: Partial<Task>) {
        this.temporaryId = data.id ? null : Symbol('tempId')
        this.id = data.id;
        this.name = data.name;
        this.expirationDate = data.expirationDate;
        this.status = data.status || TaskStatus.inProgress;
    }

    clone() {
        const data = {
            id: this.id,
            name: this.name,
            expirationDate: this.expirationDate,
            status: this.status,
        };

        return new Task(data);
    }

    isValid(): boolean {
        if(isEmpty(this.name, ['']) && !isString(this.name)) {
            return false;
        }

        return true;
    }

}
