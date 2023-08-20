import { Router } from 'express'
import LaunchesController from '../controllers/LaunchesController'

const routes = Router()

routes.get('/', LaunchesController.greetings)
routes.get('/get', LaunchesController.synchronize)
routes.get('/launches', LaunchesController.getAll)
routes.get('/launches/stats', LaunchesController.getStats)

export default routes