/**
 * CAPA DE SERVICIOS - PRODUCTS
 * 
 * Esta capa contiene toda la lógica de negocio y acceso a la base de datos para el módulo de Productos.
 * Los servicios se comunican con Prisma para realizar operaciones CRUD.
 * 
 * Responsabilidades:
 * - Realizar consultas a la base de datos usando Prisma.
 * - Aplicar lógica de negocio (validaciones, transformaciones).
 * - Retornar respuestas estructuradas: { message, status, data }.
 */

import { prisma } from "../config/prisma.config.js";

const ProductsServices = {
  /**
   * Obtiene todos los productos activos (status = true).
   */
  getAll: async () => {
    try {
      const products = await prisma.products.findMany({
        where: { status: true },
      });
      if (products.length === 0) {
        return {
          message: `No se encontraron registros`,
          status: 404,
          data: {
            products: [],
            total: 0,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          products,
          total: products.length,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },

  /**
   * Obtiene un producto por su ID.
   * @param {number} id - ID del producto a buscar.
   */
  getById: async (id) => {
    try {
      const product = await prisma.products.findUnique({
        where: {
          id: id,
          status: true,
        },
      });
      if (!product) {
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {},
        };
      } else {
        return {
          message: `Registro encontrado`,
          status: 200,
          data: {
            product,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },

  /**
   * Crea un nuevo producto.
   * @param {object} productData - Datos del producto a crear.
   */
  create: async (productData) => {
    try {
      const newProduct = await prisma.products.create({
        data: {
          name: productData.name,
          price: productData.price,
          quantity: productData.quantity,
          category_id: productData.category_id,
          area_id: productData.area_id,
        },
      });
      return {
        message: `Registro creado exitosamente`,
        status: 201,
        data: {
          product: newProduct,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },

  /**
   * Actualiza un producto existente.
   * @param {number} id - ID del producto a actualizar.
   * @param {object} productData - Datos a actualizar.
   */
  update: async (id, productData) => {
    try {
      const product = await prisma.products.update({
        where: { id: id },
        data: {
          name: productData.name,
          price: productData.price,
          quantity: productData.quantity,
          category_id: productData.category_id,
          area_id: productData.area_id,
          updated_at: new Date(),
          status: productData.status !== undefined ? productData.status : true,
        },
      });
      return {
        message: `Registro actualizado exitosamente`,
        status: 200,
        data: {
          product,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },

  /**
   * Elimina un producto (soft delete).
   * @param {number} id - ID del producto a eliminar.
   */
  delete: async (id) => {
    try {
      const product = await prisma.products.update({
        where: { id: id },
        data: {
          status: false,
          deleted_at: new Date(),
        },
      });
      return {
        message: `Registro eliminado exitosamente`,
        status: 204,
        data: {
          product,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },

  /**
   * Busca un producto por su nombre (case-insensitive).
   * Se usa en las validaciones para verificar nombres únicos.
   * @param {string} name - Nombre del producto a buscar.
   */
  getByName: async (name) => {
    try {
      const product = await prisma.products.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive',
          },
        },
      });

      if (!product) {
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: { product },
        };
      } 
      else {
        return {
          message: `Registro encontrado`,
          status: 200,
          data: { product },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },
};

export { ProductsServices };
