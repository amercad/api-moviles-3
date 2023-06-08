import express from 'express';
import cors from 'cors';

import { routes as habitaciones } from '../routes/habitaciones.js';
import { routes as reservas } from '../routes/reserva.js';
import { connectionDB } from '../database/config.js';
import { routes as usuarioRoutes } from '../routes/usuario.js';

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.api = '/api';
        this.habitacionPath = 'habitaciones/';
        this.reservaPath = 'reservas/';
        this.usuarioPath = 'usuarios'

        this.conection();

        this.middlewares();

        this.routes();
    }

    conection() {
        connectionDB();
    }

    middlewares() {
        
        this.app.use( cors() );
        this.app.use( express.static('public') );
        this.app.use( express.json() );

    }

    routes() {
        
        this.app.use( `${this.api}/${this.habitacionPath}`, habitaciones );
        this.app.use( `${this.api}/${this.reservaPath}`, reservas );
        this.app.use( `${ this.api }/${ this.usuarioPath }`, usuarioRoutes );

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening in http://localhost:${ this.port }`);
        });
    }
}