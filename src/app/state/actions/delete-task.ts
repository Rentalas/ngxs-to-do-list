import { Id } from "src/app/abstraction/common.abstraction";

export class DeleteTask {
    static readonly type = 'Delete Task';

    constructor(public id: Id) {

    }
}