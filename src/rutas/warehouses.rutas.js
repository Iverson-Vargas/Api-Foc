import { Router } from 'express';
import { WarehouseController } from '../controladores/warehouses.controladores.js';
import { validateFields } from '../middlewares/validate-fields.middleware.js';
import { WarehouseValidator } from '../validators/warehouses.validator.js';

const router = Router();
const warehouse_controller= new WarehouseController()
const warehouse_validator = new WarehouseValidator();

//obtener una lista
router.get('/', warehouse_controller.getAll)
//obtener uno
router.get(
    '/:id',
    ...warehouse_validator.validateWarehouseId,
    validateFields,
    warehouse_controller.getOne
)
//post
router.post(
    '/',
    ...warehouse_validator.validateWarehouse,
    validateFields,
    warehouse_validator.validateIfNameIsUse,
    warehouse_controller.created
)
//put
router.put(
    '/:id',
    ...warehouse_validator.validateWarehouseId,
    ...warehouse_validator.validateWarehouse,
    validateFields,
    warehouse_validator.validateIfNameIsUse,
    warehouse_controller.updated
)
//delete
router.delete(
    '/:id',
    ...warehouse_validator.validateWarehouseId,
    validateFields,
    warehouse_controller.deleted
)
export default router;