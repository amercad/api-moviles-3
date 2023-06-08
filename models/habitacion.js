import { Schema, model } from 'mongoose';

const HabitacionSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la habitacion es obligatorio']
    },
    foto: {
        type: [String],
        required: [true, 'La foto es obligatoria']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    numeroPersona: {
        type: Number,
        required: [true, 'El numero de persona es obligatorio']
    },
    disponibilidad: {
        type: Boolean,
        default: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

HabitacionSchema.methods.toJSON = function() {

    const { __v, _id, ...rest } = this.toObject();
    rest.hid = _id;
    return rest;
}

export default model( 'Habitacion', HabitacionSchema );