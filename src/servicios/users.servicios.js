/**
 * CAPA DE SERVICIOS - USERS
 * 
 * Esta capa contiene toda la lógica de negocio y acceso a la base de datos para el módulo de Usuarios.
 * Los servicios se comunican con Prisma para realizar operaciones CRUD.
 * 
 * Responsabilidades:
 * - Realizar consultas a la base de datos usando Prisma.
 * - Aplicar lógica de negocio (validaciones, transformaciones).
 * - Retornar respuestas estructuradas: { message, status, data }.
 */

import { prisma } from '../config/prisma.config.js';

const UserServices = {
    /**
     * Obtiene todos los usuarios activos (status = true).
     */
    getAll: async () => {
        try {
            const users = await prisma.users.findMany({
                where: { status: true },
            });
            if (users.length === 0) {
                return {
                    message: `No se encontraron registros`,
                    status: 404,
                    data: {
                        users: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Registros encontrados`,
                status: 200,
                data: {
                    users,
                    total: users.length
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
     * Obtiene un usuario por su ID.
     * @param {number} id - ID del usuario a buscar.
     */
    getById: async (id) => {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!user) {
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
                        user,
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
     * Crea un nuevo usuario.
     * @param {object} userData - Datos del usuario a crear.
     */
    create: async (userData) => {
        try {
            const newUser = await prisma.users.create({
                data: {
                    name: userData.name,
                    username: userData.username,
                    email: userData.email,
                    password: userData.password,
                    role_id: userData.role_id,
                },
            });
            return {
                message: `Registro creado exitosamente`,
                status: 201,
                data: {
                    user: newUser,
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
     * Actualiza un usuario existente.
     * @param {number} id - ID del usuario a actualizar.
     * @param {object} userData - Datos a actualizar.
     */
    update: async (id, userData) => {
        try {
            const user = await prisma.users.update({
                where: { id: id },
                data: {
                    name: userData.name,
                    username: userData.username,
                    email: userData.email,
                    password: userData.password,
                    role_id: userData.role_id,
                    updated_at: new Date(),
                    status: userData.status !== undefined ? userData.status : true,
                },
            });
            return {
                message: `Registro actualizado exitosamente`,
                status: 200,
                data: {
                    user,
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
     * Elimina un usuario (soft delete).
     * @param {number} id - ID del usuario a eliminar.
     */
    delete: async (id) => {
        try {
            const user = await prisma.users.update({
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
                    user,
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
     * Busca un usuario por su email.
     * Se usa en las validaciones para verificar emails únicos.
     * @param {string} email - Email del usuario a buscar.
     */
    getByEmail: async (email) => {
        try {
            const user = await prisma.users.findUnique({
                where: { email },
            });

            if (!user) {
                return {
                    message: `Registro no encontrado`,
                    status: 404,
                    data: {
                        user,
                    },
                };
            } else {
                return {
                    message: `Registro encontrado`,
                    status: 200,
                    data: {
                        user,
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
     * Busca un usuario por su username (case-insensitive).
     * Se usa en las validaciones para verificar usernames únicos.
     * @param {string} username - Username del usuario a buscar.
     */
    getByUsername: async (username) => {
        try {
            const user = await prisma.users.findFirst({
                where: {
                    username: {
                        equals: username,
                        mode: 'insensitive',
                    },
                },
            });

            if (!user) {
                return {
                    message: `Registro no encontrado`,
                    status: 404,
                    data: { user },
                };
            } else {
                return {
                    message: `Registro encontrado`,
                    status: 200,
                    data: { user },
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

export { UserServices };
