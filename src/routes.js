import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderStudentController from './app/controllers/HelpOrderStudentController';
import HelpOrderController from './app/controllers/HelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

if (process.env.DELAY > 0) {
  routes.use((req, res, next) => {
    setTimeout(() => {
      next();
    }, process.env.DELAY);
  });
}

routes.get('/students/:id/checkin', CheckinController.index);
routes.post('/students/:id/checkin', CheckinController.store);
routes.get('/students/:id/help-orders', HelpOrderStudentController.index);
routes.post('/students/:id/help-orders', HelpOrderStudentController.store);
routes.get('/student/:id', StudentController.unique);

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

/**
 * Rotas para os Estudantes
 */
routes.post('/student', StudentController.store);
routes.put('/student/:id', StudentController.update);
routes.get('/students', StudentController.index);
routes.delete('/students/:id', StudentController.delete);

/**
 * Rotas para os Planos
 */
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

/**
 * Rotas para as Matriculas
 */
routes.get('/registrations', RegistrationController.index);
routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

/**
 * Rotas para Help Orders
 */
routes.get('/help-orders', HelpOrderController.index);
routes.post('/help-orders/:id/answer', HelpOrderController.store);

export default routes;
