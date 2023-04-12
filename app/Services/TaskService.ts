import { Task } from 'App/Core/Domain/Task'
import { TaskRepository } from 'App/Core/Adapters/TaskRepository'

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  public async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAll()
  }

  public async getTaskById(id: number): Promise<Task | null> {
    return this.taskRepository.getById(id)
  }

  public async createTask(task: Task): Promise<Task> {
    return this.taskRepository.create(task)
  }

  public async updateTask(id: number, task: Task): Promise<Task | null> {
    return this.taskRepository.update(id, task)
  }

  public async deleteTask(id: number): Promise<boolean> {
    return this.taskRepository.delete(id)
  }
}
