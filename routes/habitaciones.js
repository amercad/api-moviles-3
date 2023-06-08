import { Router } from 'express';
import { check } from 'express-validator';

import { habitacionDelete, habitacionGet, habitacionGetById, habitacionSave, habitacionUpdate, habitacionesDisponiblesGet } from '../controllers/habitacion.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeId, validarNumeroPersona, validarPrecio } from '../helpers/db-validaciones.js';

export const routes = Router();

routes.get('', habitacionGet);
routes.get('/lista', habitacionesDisponiblesGet);

routes.get('/:id', [
    check('id').custom( existeId ),
    validarCampos
], habitacionGetById);

routes.post('', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('foto', 'las foto son obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').isNumeric(),
    check('precio').custom( validarPrecio ),
    check('numeroPersona', 'El numero de persona es obligatorio').isNumeric(),
    check('numeroPersona').custom( validarNumeroPersona ),
    validarCampos
], habitacionSave);

routes.put('/:id', [
    check('id').custom( existeId ),
    validarCampos
], habitacionUpdate);

routes.delete('/:id', [
    check('id').custom( existeId ),
    validarCampos
], habitacionDelete);