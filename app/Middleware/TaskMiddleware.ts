import { InMemoryTaskAdapter } from 'App/Core/Adapters/InMemoryTaskAdapter'
import { TaskRepository } from 'App/Core/Adapters/TaskRepository'
import TaskController from 'App/Http/Controllers/TaskController'
import { TaskService } from 'App/Services/TaskService'

module.exports = class TaskMiddleware {
  public async handle(httpContext, next) {
    const repository = new TaskRepository(new InMemoryTaskAdapter())
    const service = new TaskService(repository)
    const Controller = new TaskController(service)
    await next(Controller.index(httpContext))
  }
}
