import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import testRoutes from '../rutas/test.rutas.js';
import rolesRoutes from '../rutas/roles.rutas.js';
import userRoutes from '../rutas/users.rutas.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export class Servidor {
  app;
  port;
  constructor() {
    this.app = express();
    this.port = process.env.API_PORT || 3800;
    this.pre = '/api/v1';
    this.middlewares()
    //rutas
    this.rutas={
      test:`${this.pre}/test`,
      roles:`${this.pre}/roles`,
      users:`${this.pre}/users`
    };
    this.routes();
    
  }

  middlewares =()=>{
    this.app.use(cors())
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  routes = () => {
    this.app.use(this.rutas.test,testRoutes)
    this.app.use(this.rutas.roles,rolesRoutes)
    this.app.use(this.rutas.users,userRoutes)
  }

  listen = () => {
    this.app.listen(this.port, () => {
      console.log(`server running at http://localhost:${this.port}`);
    })
  }
}
