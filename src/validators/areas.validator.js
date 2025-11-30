import { AreasServices } from '../servicios/areas.servicios.js';
import { body, param } from 'express-validator';
import { WarehouseServices } from '../servicios/warehouses.servicios.js';

class AreasValidator {

  validateArea = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('name').isString().withMessage('El nombre debe ser una cadena de texto'),
    body('warehouse_id').notEmpty().withMessage('El ID del almacén es requerido'),
    body('warehouse_id').isInt().withMessage('El ID del almacén debe ser un número entero'),
    body('warehouse_id').custom(async (id) => {
      if (isNaN(Number(id))) {
        throw new Error(`El parámetro warehouse_id: ${id} debe ser un número`);
      }
      const { status } = await WarehouseServices.getById(Number(id));
      if (status === 404) {
        throw new Error('El ID del almacén no se encuentra en los registros');
      }
      return true;
    }),
  ];

  validateAreaId = [
    param('id').notEmpty().withMessage('El id es requerido'),
    param('id').isInt().withMessage('El id debe ser un número'),
    param('id').custom(async (id) => {
      if (!id) {
        throw new Error('El parámetro id es requerido para la verificación');
      }
      if (isNaN(Number(id))) {
        throw new Error(`El parámetro id: ${id} debe ser un número`);
      }
      const { status } = await AreasServices.getById(Number(id));
      if (status === 404) {
        throw new Error('El id no se encuentra en los registros');
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

    const { status, data } = await AreasServices.getByName(name);

    if (status === 200) {
      const area = data.area;

      if (!id) {
        return res.status(400).json({
          errors: [
            {
              type: 'field',
              msg: `El nombre de área '${name}' ya está en uso.`,
              path: 'name',
              location: 'body',
            },
          ],
        });
      }
      else {
        if (id != area.id) {
          return res.status(400).json({
            errors: [
              {
                type: 'field',
                msg: `El nombre de área '${name}' ya está en uso por otro registro.`,
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

export { AreasValidator };