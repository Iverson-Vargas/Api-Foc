import { Router } from 'express';
import { CategoryController } from '../controladores/categories.controladores.js';


const router = Router();
const category_controller= new CategoryController()
//obtener una lista
router.get('/', category_controller.getAll)
//obtener uno
router.get('/:id',category_controller.getOne)
//post
router.post('/', category_controller.created)
//put
router.put('/:id',category_controller.updated)
//delete
router.delete('/:id',category_controller.deleted)
export default router;