import { Router } from 'express'
import LaunchesController from '../controllers/LaunchesController'

const routes = Router()

routes.get('/', LaunchesController.greetings)
routes.get('/launches', LaunchesController.getAll)
routes.get('/launches/stats', LaunchesController.getStats)
routes.get('/rockets', LaunchesController.getRockets)
routes.get('/sincronize', LaunchesController.synchronizeController)
export default routes