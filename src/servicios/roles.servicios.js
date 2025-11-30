/**
 * CAPA DE SERVICIOS - ROLES
 * 
 * Esta capa contiene toda la lógica de negocio y acceso a la base de datos para el módulo de Roles.
 * Los servicios se comunican con Prisma para realizar operaciones CRUD.
 * 
 * Responsabilidades:
 * - Realizar consultas a la base de datos usando Prisma.
 * - Aplicar lógica de negocio (validaciones, transformaciones).
 * - Retornar respuestas estructuradas: { message, status, data }.
 */

import { prisma } from '../config/prisma.config.js';

const RoleServices = {
    /**
     * Obtiene todos los roles activos (status = true).
     */
    getAll: async () => {
        try {
            const roles = await prisma.roles.findMany({
                where: { status: true },
            });
            if (roles.length === 0) {
                return {
                    message: `No se encontraron registros`,
                    status: 404,
                    data: {
                        roles: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Registros encontrados`,
                status: 200,
                data: {
                    roles,
                    total: roles.length
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
     * Obtiene un rol por su ID.
     * @param {number} id - ID del rol a buscar.
     */
    getById: async (id) => {
        try {
            const role = await prisma.roles.findUnique({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!role) {
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
                        role,
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
     * Crea un nuevo rol.
     * @param {object} roleData - Datos del rol a crear { name }.
     */
    create: async (roleData) => {
        try {
            const newRole = await prisma.roles.create({
                data: {
                    name: roleData.name,
                },
            });
            return {
                message: `Registro creado exitosamente`,
                status: 201,
                data: {
                    role: newRole,
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
     * Actualiza un rol existente.
     * @param {number} id - ID del rol a actualizar.
     * @param {object} roleData - Datos a actualizar { name, status? }.
     */
    update: async (id, roleData) => {
        try {
            const role = await prisma.roles.update({
                where: { id: id },
                data: {
                    name: roleData.name,
                    updated_at: new Date(),
                    status: roleData.status !== undefined ? roleData.status : true,
                },
            });
            return {
                message: `Registro actualizado exitosamente`,
                status: 200,
                data: {
                    role,
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
     * Elimina un rol (soft delete).
     * @param {number} id - ID del rol a eliminar.
     */
    delete: async (id) => {
        try {
            const role = await prisma.roles.update({
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
                    role,
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
     * Busca un rol por su nombre (case-insensitive).
     * Se usa en las validaciones para verificar nombres únicos.
     * @param {string} name - Nombre del rol a buscar.
     */
    getByName: async (name) => {
        try {
            const role = await prisma.roles.findFirst({
                where: {
                    name: {
                        equals: name,
                        mode: 'insensitive',
                    },
                },
            });

            if (!role) {
                return {
                    message: `Registro no encontrado`,
                    status: 404,
                    data: { role },
                };
            } 
            else {
                return {
                    message: `Registro encontrado`,
                    status: 200,
                    data: { role },
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

export { RoleServices };
