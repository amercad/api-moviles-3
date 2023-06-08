import bcryptjs from 'bcryptjs';
import Usuario from '../models/usuario.js';

export const usuarioGET = async(req, res) => {

    const { limit = 5, page = 0 } = req.query;
    
    const query = { estado: true };
    
    const [ usuarios, total ] = await Promise.all([
        Usuario.find(query).limit(Number(limit)).skip(Number(page)),
        Usuario.find(query).countDocuments()
    ]);


    res.status(200).json({
        total,
        usuarios
    })
}

export const usuarioPost = async(req, res) => {

    const { nombre, usuario, password } = req.body;

    const usuarioSave = new Usuario({ nombre, usuario, password });

    const salt = bcryptjs.genSaltSync();
    usuarioSave.password = bcryptjs.hashSync( password, salt );

    await usuarioSave.save();

    res.status(201).json(usuarioSave);

}

export const usuarioPut = async(req, res) => {
    const { _id, usuario, password, estado, ...resto } = req.body;

    const { id } = req.params;

    if (rol) {
        await rolValido(rol).then( err => res.status(400).json(err) )
        return
    }

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuarioSave = await Usuario.findByIdAndUpdate( id, resto, { new: true });

    res.status(201).json(usuarioSave);

}

export const usuarioDelete = async(req, res) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false}, { new: true });

    res.status(204).json(usuario);

}