import { prisma } from "../config/prisma.config.js";

const ProductsServices = {
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
};

export { ProductsServices };
