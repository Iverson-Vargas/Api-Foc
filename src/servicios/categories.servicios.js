import { prisma } from '../config/prisma.config.js';

const CategoryServices = {
    getAll: async () => {
        try {
            const categories = await prisma.categories.findMany({
                where: { status: true },
            });
            if (categories.length === 0) {
                return {
                    message: `No se encontraron registros`,
                    status: 404,
                    data: {
                        categories: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Registros encontrados`,
                status: 200,
                data: {
                    categories,
                    total: categories.length
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
            const category = await prisma.categories.findUnique({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!category) {
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
                        category,
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

    create: async (categoryData) => {
        try {
            const newCategory = await prisma.categories.create({
                data: {
                    name: categoryData.name,
                },
            });
            return {
                message: `Registro creado exitosamente`,
                status: 201,
                data: {
                    category: newCategory,
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

    update: async (id, categoryData) => {
        try {
            const category = await prisma.categories.update({
                where: { id: id },
                data: {
                    name: categoryData.name,
                    updated_at: new Date(),
                    status: categoryData.status !== undefined ? categoryData.status : true,
                },
            });
            return {
                message: `Registro actualizado exitosamente`,
                status: 200,
                data: {
                    category,
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
            const category = await prisma.categories.update({
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
                    category,
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

export { CategoryServices };
