import { WarehouseServices } from '../servicios/warehouses.servicios.js';
import { body, param } from 'express-validator';

class WarehouseValidator {

  validateWarehouse = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('name').isString().withMessage('El nombre debe ser una cadena de texto'),
  ];

  validateWarehouseId = [
    param('id').notEmpty().withMessage('El id es requerido'),
    param('id').isInt().withMessage('El id debe ser un número'),
    param('id').custom(async (id) => {
      if (isNaN(Number(id))) {
        throw new Error(`El parámetro id: ${id} debe ser un número`);
      }
      const { status } = await WarehouseServices.getById(Number(id));
      if (status === 404) {
        throw new Error('El id de almacén no se encuentra en los registros');
      }
      return true;
    }),
  ];

  validateIfNameIsUse = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return next();
    }

    const { status, data } = await WarehouseServices.getByName(name);

    if (status === 200) {
      const warehouse = data.warehouse;

      if (!id) {
        return res.status(400).json({
          errors: [
            {
              type: 'field',
              msg: `El nombre de almacén '${name}' ya está en uso.`,
              path: 'name',
              location: 'body',
            },
          ],
        });
      }
      else {
        if (id != warehouse.id) {
          return res.status(400).json({
            errors: [
              {
                type: 'field',
                msg: `El nombre de almacén '${name}' ya está en uso por otro registro.`,
                path: 'name',
                location: 'body',
              },
            ],
          });
        }
      }
    }
    next();
  };
}

export { WarehouseValidator };