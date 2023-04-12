// app/Core/Adapters/TaskRepository.ts

import { Task } from '../Domain/Task'
import { TaskPort } from '../Ports/TaskPort'

export class TaskRepository implements TaskPort {
  constructor(private taskPort: TaskPort) {}

  public async getAll(): Promise<Task[]> {
    return this.taskPort.getAll()
  }

  public async getById(id: number): Promise<Task | null> {
    return this.taskPort.getById(id)
  }

  public async create(task: Task): Promise<Task> {
    return this.taskPort.create(task)
  }

  public async update(id: number, task: Task): Promise<Task | null> {
    return this.taskPort.update(id, task)
  }

  public async delete(id: number): Promise<boolean> {
    return this.taskPort.delete(id)
  }
}
