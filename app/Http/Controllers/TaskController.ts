import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Task } from 'App/Core/Domain/Task'
import { TaskService } from 'App/Services/TaskService'

export default class TaskController {
  constructor(private taskService: TaskService) {}

  public async index({ response }: HttpContextContract) {
    const tasks = await this.taskService.getAllTasks()
    return response.ok(tasks)
  }

  public async show({ params, response }: HttpContextContract) {
    const task = await this.taskService.getTaskById(params.id)
    if (!task) {
      return response.notFound()
    }
    return response.ok(task)
  }

  public async store({ request, response }: HttpContextContract) {
    const task = request.body() as Task
    const newTask = await this.taskService.createTask(task)
    return response.created(newTask)
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
