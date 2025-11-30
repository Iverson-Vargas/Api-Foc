import {Router} from 'express'
import { ProductsController } from '../controladores/products.controladores.js';
const router= Router();
const products_controller= new ProductsController()
//obtener una lista
router.get('/', products_controller.getAll)
//obtener uno
router.get('/:id',products_controller.getOne)   
//post
router.post('/', products_controller.created)
//put
router.put('/:id',products_controller.updated)
//delete
router.delete('/:id',products_controller.deleted)
export default router;