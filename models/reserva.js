import { Schema, model } from 'mongoose';

const ReservaSchema = Schema({
    nombreCliente: {
        type: String,
        required: [true, 'El nombre del cliente es obligatorio']
    },
    apellidoCliente: {
        type: String,
        required: [true, 'El apellido del cliente es obligatorio']
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio']
    },
    fechaIngreso: {
        type: Date,
        required: [true, 'La fecha de ingreso es obligatorio']
    },
    fechaSalida: {
        type: Date,
        required: [true, 'La fecha de salida es obligatorio']
    },
    idHabitacion: {
        type: String,
        required: [true, 'El id de la habitacion es obligatorio']
    },
    numeroNinio: {
        type: Number,
        required: [true, 'El numero de niño es obligatorio']
    },
    numeroAadulto: {
        type: Number,
        required: [true, 'El numero de adulto es obligatorio']
    },
    costoReserva: {
        type: Number,
        // required: [true, 'El costo de la reserva es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

ReservaSchema.methods.toJSON = function() {

    const { __v, _id, ...reservas } = this.toObject();
    reservas.rid = _id;
    return reservas;

}

export default model('Reserva', ReservaSchema);