import { Router } from 'express';
import { WarehouseController } from '../controladores/warehouses.controladores.js';


const router = Router();
const warehouse_controller= new WarehouseController()
//obtener una lista
router.get('/', warehouse_controller.getAll)
//obtener uno
router.get('/:id',warehouse_controller.getOne)
//post
router.post('/', warehouse_controller.created)
//put
router.put('/:id',warehouse_controller.updated)
//delete
router.delete('/:id',warehouse_controller.deleted)
export default router;