import { Task } from '../models/task';
import { Id } from './common.abstraction';

export type UpdateTaskData<T extends keyof Task> = {
  id: Id;
  propName: T;
  value: Task[T];
  temporaryId?: Symbol;
};
