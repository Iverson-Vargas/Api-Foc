import { body, param } from 'express-validator';
import { ProductsServices } from '../servicios/products.servicios.js';
import { CategoryServices } from '../servicios/categories.servicios.js';
import { AreasServices } from '../servicios/areas.servicios.js';

class ProductValidator {

  validateProduct = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('name').isString().withMessage('El nombre debe ser una cadena de texto'),

    body('price').notEmpty().withMessage('El precio es requerido'),
    body('price').isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor que 0'),

    body('quantity').notEmpty().withMessage('La cantidad es requerida'),
    body('quantity').isInt({ gt: -1 }).withMessage('La cantidad debe ser un número entero igual o mayor que 0'),

    body('category_id').notEmpty().withMessage('El ID de categoría es requerido'),
    body('category_id').isInt().withMessage('El ID de categoría debe ser un número entero'),
    body('category_id').custom(async (id) => {
      if (isNaN(Number(id))) {
        throw new Error(`El parámetro category_id: ${id} debe ser un número`);
      }
      const { status } = await CategoryServices.getById(Number(id));
      if (status === 404) {
        throw new Error('El ID de categoría no se encuentra en los registros');
      }
      return true;
    }),

    body('area_id').notEmpty().withMessage('El ID de área es requerido'),
    body('area_id').isInt().withMessage('El ID de área debe ser un número entero'),
    body('area_id').custom(async (id) => {
      if (isNaN(Number(id))) {
        throw new Error(`El parámetro area_id: ${id} debe ser un número`);
      }
      const { status } = await AreasServices.getById(Number(id));
      if (status === 404) {
        throw new Error('El ID de área no se encuentra en los registros');
      }
      return true;
    }),
  ];

  validateProductId = [
    param('id').notEmpty().withMessage('El id es requerido'),
    param('id').isInt().withMessage('El id debe ser un número'),
    param('id').custom(async (id) => {
      if (isNaN(Number(id))) {
        throw new Error(`El parámetro id: ${id} debe ser un número`);
      }
      const { status } = await ProductsServices.getById(Number(id));
      if (status === 404) {
        throw new Error('El id de producto no se encuentra en los registros');
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

    const { status, data } = await ProductsServices.getByName(name);

    if (status === 200) {
      const product = data.product;

      if (!id) {
        return res.status(400).json({
          errors: [
            {
              type: 'field',
              msg: `El nombre de producto '${name}' ya está en uso.`,
              path: 'name',
              location: 'body',
            },
          ],
        });
      }
      else {
        if (id != product.id) {
          return res.status(400).json({
            errors: [
              {
                type: 'field',
                msg: `El nombre de producto '${name}' ya está en uso por otro registro.`,
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

export { ProductValidator };