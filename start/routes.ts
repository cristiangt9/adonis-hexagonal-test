/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { InMemoryTaskAdapter } from 'App/Core/Adapters/InMemoryTaskAdapter'
import { TaskRepository } from 'App/Core/Adapters/TaskRepository'
import TaskController from 'App/Http/Controllers/TaskController'
import { TaskService } from 'App/Services/TaskService'

Route.get('/', async () => {
  return { hello: 'world' }
})
const port = new InMemoryTaskAdapter()
const repository = new TaskRepository(port)
const service = new TaskService(repository)
const Controller = new TaskController(service)


// Route.resource('/task', 'TaskController').apiOnly()
Route.get('/task', (httpContext) => {
  return Controller.index(httpContext)
})
