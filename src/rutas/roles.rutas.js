
import { Router } from 'express';
import { RoleController } from '../controladores/roles.controladores.js';


const router = Router();
const role_controller= new RoleController()
//obtener una lista
router.get('/', role_controller.getAll)
//obtener uno
router.get('/:id',role_controller.getOne)
//post
router.post('/', role_controller.created)
//put
router.put('/:id',role_controller.updated)
//delete
router.delete('/:id',role_controller.deleted)
export default router;