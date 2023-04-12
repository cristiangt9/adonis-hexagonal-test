import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { TaskRepository } from 'App/Core/Adapters/TaskRepository'
import { InMemoryTaskAdapter } from 'App/Core/Adapters/InMemoryTaskAdapter'
import { TaskService } from 'App/Services/TaskService'

export default class TaskServiceProvider {
  public static async register(application: ApplicationContract) {
    application.container.singleton('App/Core/Ports/TaskPort', () => {
      return new InMemoryTaskAdapter()
    })

    application.container.singleton('App/Core/Adapters/TaskRepository', () => {
      const taskPort = application.container.use('App/Core/Ports/TaskPort')
      return new TaskRepository(taskPort)
    })

    application.container.singleton('App/Services/TaskService', () => {
      const taskRepository = application.container.use('App/Core/Adapters/TaskRepository')
      return new TaskService(taskRepository)
    })
  }
}
