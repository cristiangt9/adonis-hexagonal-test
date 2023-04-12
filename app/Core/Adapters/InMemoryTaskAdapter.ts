import { Task } from '../Domain/Task'
import { TaskPort } from '../Ports/TaskPort'

export class InMemoryTaskAdapter implements TaskPort {
  private tasks: Task[] = []

  public async getAll(): Promise<Task[]> {
    return this.tasks
  }

  public async getById(id: number): Promise<Task | null> {
    const task = this.tasks.find((t) => t.id === id)
    return task || null
  }

  public async create(task: Task): Promise<Task> {
    const newTask = { ...task, id: this.tasks.length + 1 }
    this.tasks.push(newTask)
    return newTask
  }

  public async update(id: number, task: Task): Promise<Task | null> {
    const index = this.tasks.findIndex((t) => t.id === id)
    if (index === -1) {
      return null
    }
    const updatedTask = { ...task, id }
    this.tasks[index] = updatedTask
    return updatedTask
  }

  public async delete(id: number): Promise<boolean> {
    const index = this.tasks.findIndex((t) => t.id === id)
    if (index === -1) {
      return false
    }
    this.tasks.splice(index, 1)
    return true
  }
}
