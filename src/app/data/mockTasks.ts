import { TaskStatus } from '../abstraction/common.abstraction';
import { Task } from '../models/task';

export const tasks: Partial<Task>[] = [
  {
    id: '1',
    expirationDate: (new Date('2023-01-21')).getTime(),
    status: TaskStatus.inProgress,
    name: 'todo 1',
  },
  {
    id: '2',
    name: 'todo 2',
  },
];
