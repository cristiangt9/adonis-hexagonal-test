/*
|--------------------------------------------------------------------------
| Application middleware
|--------------------------------------------------------------------------
|
| This file is used to define middleware for HTTP requests. You can register
| middleware as a `closure` or an IoC container binding. The bindings are
| preferred, since they keep this file clean.
|
*/

import Server from '@ioc:Adonis/Core/Server'

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| An array of global middleware, that will be executed in the order they
| are defined for every HTTP requests.
|
*/
Server.middleware.register([() => import('@ioc:Adonis/Core/BodyParser')])

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key-value pair. The value is the namespace
| or middleware function and key is the alias. Later you can use these
| alias on individual routes. For example:
|
| { auth: () => import('App/Middleware/Auth') }
|
| and then use it as follows
|
| Route.get('dashboard', 'UserController.dashboard').middleware('auth')
|
*/
Server.middleware.registerNamed({})

import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { InMemoryTaskAdapter } from 'App/Core/Adapters/InMemoryTaskAdapter'
import { TaskService } from 'App/Services/TaskService'
import TaskController from 'App/Http/Controllers/TaskController'

export default class Kernel {
  public static async bootstrap(app: ApplicationContract) {
    console.log('ejecutando el boostrap')

    app.container.singleton('TaskPort', () => new InMemoryTaskAdapter())
    app.container.singleton('TaskService', (app) => new TaskService(app.use('TaskPort')))
    app.container.singleton('TaskController', (app) => new TaskController(app.use('TaskService')))
  }
}
