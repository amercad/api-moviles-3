import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos.js';
import {
    existeUsuarioById, usuarioUnico,
} from '../helpers/db-validaciones.js';
import { 
    usuarioDelete,
    usuarioGET,
    usuarioPost, 
    usuarioPut
} from '../controllers/usuario.js';

export const routes = Router();

routes.get('/', usuarioGET );

routes.post('/', [
    check('nombre', 'El nombre es obrigatorio').not().isEmpty(),
    check('password', 'El password es obrigatorio').not().isEmpty(),
    check('password', 'El password debe de tener un minimo de 6 letras').isLength({ min: 6 }),
    check('usuario', 'El usuario es obrigatorio').not().isEmpty(),
    check('usuario').custom( usuarioUnico ),
    validarCampos
], usuarioPost );

routes.put('/:id', [
    check('id').custom( existeUsuarioById ),
    validarCampos
], usuarioPut )

routes.delete('/:id', [
    check('id').custom( existeUsuarioById ),
    validarCampos
], usuarioDelete );