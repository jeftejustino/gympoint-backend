import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

const routes = new Router();

routes.post('/session', SessionController.store);
routes.post('/student', StudentController.store);

export default routes;
