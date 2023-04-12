// app/Core/Ports/TaskPort.ts

import { Task } from '../Domain/Task'

export interface TaskPort {
  getAll(): Promise<Task[]>
  getById(id: number): Promise<Task | null>
  create(task: Task): Promise<Task>
  update(id: number, task: Task): Promise<Task | null>
  delete(id: number): Promise<boolean>
}
