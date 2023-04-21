import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { TaskRepository } from 'App/Core/Adapters/TaskRepository'
import { InMemoryTaskAdapter } from 'App/Core/Adapters/InMemoryTaskAdapter'
import { TaskService } from 'App/Services/TaskService'

export default class TaskServiceProvider {
  constructor(protected application: ApplicationContract) {}
  public async register() {
    this.application.container.singleton('App/Core/Ports/TaskPort', () => {
      console.log('InMemoryTaskAdapter')
      return new InMemoryTaskAdapter()
    })

    this.application.container.singleton('App/Core/Adapters/TaskRepository', () => {
      const taskPort = this.application.container.use('App/Core/Ports/TaskPort')
      console.log('taskPort')
      return new TaskRepository(taskPort)
    })

    this.application.container.singleton('App/Services/TaskService', () => {
      const taskRepository = this.application.container.use('App/Core/Adapters/TaskRepository')
      console.log('taskRepository')
      return new TaskService(taskRepository)
    })
  }
  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
