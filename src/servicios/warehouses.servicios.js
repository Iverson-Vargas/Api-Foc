/**
 * CAPA DE SERVICIOS - WAREHOUSES
 * 
 * Esta capa contiene toda la lógica de negocio y acceso a la base de datos para el módulo de Almacenes.
 * Los servicios se comunican con Prisma para realizar operaciones CRUD.
 * 
 * Responsabilidades:
 * - Realizar consultas a la base de datos usando Prisma.
 * - Aplicar lógica de negocio (validaciones, transformaciones).
 * - Retornar respuestas estructuradas: { message, status, data }.
 */

import { prisma } from '../config/prisma.config.js';

const WarehouseServices = {
    /**
     * Obtiene todos los almacenes activos (status = true).
     */
    getAll: async () => {
        try {
            const warehouses = await prisma.warehouses.findMany({
                where: { status: true },
            });
            if (warehouses.length === 0) {
                return {
                    message: `No se encontraron registros`,
                    status: 404,
                    data: {
                        warehouses: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Registros encontrados`,
                status: 200,
                data: {
                    warehouses,
                    total: warehouses.length
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
     * Obtiene un almacén por su ID.
     * @param {number} id - ID del almacén a buscar.
     */
    getById: async (id) => {
        try {
            const warehouse = await prisma.warehouses.findUnique({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!warehouse) {
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
                        warehouse,
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
     * Crea un nuevo almacén.
     * @param {object} warehouseData - Datos del almacén a crear { name }.
     */
    create: async (warehouseData) => {
        try {
            const newWarehouse = await prisma.warehouses.create({
                data: {
                    name: warehouseData.name,
                },
            });
            return {
                message: `Registro creado exitosamente`,
                status: 201,
                data: {
                    warehouse: newWarehouse,
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
     * Actualiza un almacén existente.
     * @param {number} id - ID del almacén a actualizar.
     * @param {object} warehouseData - Datos a actualizar { name, status? }.
     */
    update: async (id, warehouseData) => {
        try {
            const warehouse = await prisma.warehouses.update({
                where: { id: id },
                data: {
                    name: warehouseData.name,
                    updated_at: new Date(),
                    status: warehouseData.status !== undefined ? warehouseData.status : true,
                },
            });
            return {
                message: `Registro actualizado exitosamente`,
                status: 200,
                data: {
                    warehouse,
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
     * Elimina un almacén (soft delete).
     * @param {number} id - ID del almacén a eliminar.
     */
    delete: async (id) => {
        try {
            const warehouse = await prisma.warehouses.update({
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
                    warehouse,
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
     * Busca un almacén por su nombre (case-insensitive).
     * Se usa en las validaciones para verificar nombres únicos.
     * @param {string} name - Nombre del almacén a buscar.
     */
    getByName: async (name) => {
        try {
            const warehouse = await prisma.warehouses.findFirst({
                where: {
                    name: {
                        equals: name,
                        mode: 'insensitive',
                    },
                },
            });

            if (!warehouse) {
                return {
                    message: `Registro no encontrado`,
                    status: 404,
                    data: { warehouse },
                };
            } 
            else {
                return {
                    message: `Registro encontrado`,
                    status: 200,
                    data: { warehouse },
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

export { WarehouseServices };
