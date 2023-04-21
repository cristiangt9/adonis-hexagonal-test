import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { InMemoryTaskAdapter } from 'App/Core/Adapters/InMemoryTaskAdapter'
import { TaskRepository } from 'App/Core/Adapters/TaskRepository'
import { Task } from 'App/Core/Domain/Task'
import { TaskService } from 'App/Services/TaskService'

export default class TaskController {
  private taskService: TaskService
  constructor() {
    const repository = new TaskRepository(new InMemoryTaskAdapter())
    this.taskService = new TaskService(repository)
  }

  public async index({ response }: HttpContextContract) {
    const tasks = await this.taskService.getAllTasks()
    return response.ok(tasks)
  }

  public async store({ request, response }: HttpContextContract) {
    const task = request.body() as Task
    const newTask = await this.taskService.createTask(task)
    return response.created(newTask)
  }

  public async show({ params, response }: HttpContextContract) {
    const task = await this.taskService.getTaskById(params.id)
    if (!task) {
      return response.notFound()
    }
    return response.ok(task)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const task = request.body() as Task
    const updatedTask = await this.taskService.updateTask(params.id, task)
    if (!updatedTask) {
      return response.notFound()
    }
    return response.ok(updatedTask)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const deleted = await this.taskService.deleteTask(params.id)
    if (!deleted) {
      return response.notFound()
    }
    return response.noContent()
  }
}
