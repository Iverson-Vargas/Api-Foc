/**
 * CAPA DE SERVICIOS - CATEGORIES
 * 
 * Esta capa contiene toda la lógica de negocio y acceso a la base de datos para el módulo de Categorías.
 * Los servicios se comunican con Prisma para realizar operaciones CRUD.
 * 
 * Responsabilidades:
 * - Realizar consultas a la base de datos usando Prisma.
 * - Aplicar lógica de negocio (validaciones, transformaciones).
 * - Retornar respuestas estructuradas: { message, status, data }.
 */

import { prisma } from '../config/prisma.config.js';

const CategoryServices = {
    /**
     * Obtiene todas las categorías activas (status = true).
     */
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

    /**
     * Obtiene una categoría por su ID.
     * @param {number} id - ID de la categoría a buscar.
     */
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

    /**
     * Crea una nueva categoría.
     * @param {object} categoryData - Datos de la categoría a crear { name }.
     */
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

    /**
     * Actualiza una categoría existente.
     * @param {number} id - ID de la categoría a actualizar.
     * @param {object} categoryData - Datos a actualizar { name, status? }.
     */
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

    /**
     * Elimina una categoría (soft delete).
     * @param {number} id - ID de la categoría a eliminar.
     */
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

    /**
     * Busca una categoría por su nombre (case-insensitive).
     * Se usa en las validaciones para verificar nombres únicos.
     * @param {string} name - Nombre de la categoría a buscar.
     */
    getByName: async (name) => {
        try {
            const category = await prisma.categories.findFirst({
                where: {
                    name: {
                        equals: name,
                        mode: 'insensitive',
                    },
                },
            });

            if (!category) {
                return {
                    message: `Registro no encontrado`,
                    status: 404,
                    data: { category },
                };
            } 
            else {
                return {
                    message: `Registro encontrado`,
                    status: 200,
                    data: { category },
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

export { CategoryServices };
