import { Router } from 'express';
import { reservaDelete, reservaGet, reservaGetPorId, reservaPost, reservaUpdate } from '../controllers/reserva.js';
import { existeId } from '../helpers/db-validaciones.js';

export const routes = Router();

routes.get('', reservaGet);
routes.get('/:id', reservaGetPorId);
routes.post('', reservaPost);
routes.put('/:id', reservaUpdate);
routes.delete('/:id', reservaDelete);