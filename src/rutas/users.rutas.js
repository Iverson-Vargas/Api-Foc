import { Router } from 'express';
import { UserController } from '../controladores/users.controladores.js';

const router = Router();
const user_controller = new UserController();

router.get('/', user_controller.getAll);

router.get('/:id', user_controller.getOne);

router.post('/', user_controller.created);

router.put('/:id', user_controller.updated);

router.delete('/:id', user_controller.deleted);

export default router;
