import { model, Schema } from 'mongoose';

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    usuario: {
        type: String,
        required: [true, 'El usuario es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function() {

    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;

}

export default model('Usuario', UsuarioSchema);