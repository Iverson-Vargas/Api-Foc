/**
 * CAPA DE SERVICIOS - AREAS
 * 
 * Esta capa contiene toda la lógica de negocio y acceso a la base de datos para el módulo de Áreas.
 * Los servicios se comunican con Prisma para realizar operaciones CRUD.
 * 
 * Responsabilidades:
 * - Realizar consultas a la base de datos usando Prisma.
 * - Aplicar lógica de negocio (validaciones, transformaciones).
 * - Retornar respuestas estructuradas: { message, status, data }.
 */

import { prisma } from '../config/prisma.config.js';

const AreasServices = {
    /**
     * Obtiene todas las áreas activas (status = true).
     */
    getAll: async () => {
        try {
            const areas = await prisma.areas.findMany({
                where: { status: true },
            });
            // Si no hay registros, retorna 404
            if (areas.length === 0) {
                return {
                    message: `No se encontraron registros`,
                    status: 404,
                    data: {
                        areas: [],
                        total: 0
                    },
                };
            }
            // Si hay registros, retorna 200 con los datos
            return {
                message: `Registros encontrados`,
                status: 200,
                data: {
                    areas,
                    total: areas.length
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
     * Obtiene un área por su ID.
     * @param {number} id - ID del área a buscar.
     */
    getById: async (id) => {
        try {
            const area = await prisma.areas.findUnique({
                where: {
                    id: id,
                    status: true,
                },
            });
            // Si no existe, retorna 404
            if (!area) {
                return {
                    message: `Registro no encontrado`,
                    status: 404,
                    data: {},
                };
            } else {
                // Si existe, retorna 200 con los datos
                return {
                    message: `Registro encontrado`,
                    status: 200,
                    data: {
                        area,
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
     * Crea una nueva área.
     * @param {object} areaData - Datos del área a crear { name, warehouse_id }.
     */
    create: async (areaData) => {
        try {
            const newArea = await prisma.areas.create({
                data: {
                    name: areaData.name,
                    warehouse_id: areaData.warehouse_id,
                },
            });
            return {
                message: `Registro creado exitosamente`,
                status: 201,
                data: {
                    area: newArea,
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
     * Actualiza un área existente.
     * @param {number} id - ID del área a actualizar.
     * @param {object} areaData - Datos a actualizar { name, warehouse_id, status? }.
     */
    update: async (id, areaData) => {
        try {
            const area = await prisma.areas.update({
                where: { id: id },
                data: {
                    name: areaData.name,
                    warehouse_id: areaData.warehouse_id,
                    updated_at: new Date(),
                    status: areaData.status !== undefined ? areaData.status : true,
                },
            });
            return {
                message: `Registro actualizado exitosamente`,
                status: 200,
                data: {
                    area,
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
     * Elimina un área (soft delete).
     * @param {number} id - ID del área a eliminar.
     */
    delete: async (id) => {
        try {
            const area = await prisma.areas.update({
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
                    area,
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
     * Busca un área por su nombre (case-insensitive).
     * Se usa en las validaciones para verificar nombres únicos.
     * @param {string} name - Nombre del área a buscar.
     */
    getByName: async (name) => {
        try {
            const area = await prisma.areas.findFirst({
                where: {
                    name: {
                        equals: name,
                        mode: 'insensitive',
                    },
                },
            });

            // Si no existe, retorna 404
            if (!area) {
                return {
                    message: `Registro no encontrado`,
                    status: 404,
                    data: {
                        area,
                    },
                };
            } 
            else {
                // Si existe, retorna 200 con los datos
                return {
                    message: `Registro encontrado`,
                    status: 200,
                    data: {
                        area,
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
};

export { AreasServices };
