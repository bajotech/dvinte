import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'

import SessionController from './app/controllers/SessionController'
import UserController from './app/controllers/UserController'

const routes = new Router()

//routes.get('/sessions', SessionController.index)

routes.post('/sessions', SessionController.store)
routes.post('/users', UserController.store)

routes.use(authMiddleware)

// routes.get("/users", UserController.index)
// routes.put("/users", UserController.update)

export default routes
