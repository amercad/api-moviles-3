import { validationResult } from "express-validator"

export const validarCampos = (req, ress, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        
        return ress.status(400).json(errors);
    
    }

    next();

}