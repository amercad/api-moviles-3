import mongoose from 'mongoose';

import Habitacion from "../models/habitacion.js";
import Reserva from "../models/reserva.js";
import Usuario from '../models/usuario.js';

export const validarPrecio = (precio = 0) => {

    if(precio < 100) {

        throw new Error(`El precio de la habitacion no puede ser inferior a 100`);

    }

    return precio;

}

export const validarNumeroPersona = (numeroPersona = 0) => {

    if(numeroPersona < 2) {
        
        throw new Error(`La cantidad minima de persona por habitacion es de 2`);
    
    }
    

    return numeroPersona;

}

export const existeId = async( id ) => {

    idValido( id );

    const habitacionById = await Habitacion.findById( id );

    if (!habitacionById || !habitacionById.estado) {
        throw new Error(`El ID: ${ id }, no existe.`);
    }

}

const idValido = ( id ) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`El ID: ${ id }, no es un ID válido de mongo`)
    }

}

export const validFields = ( fields ) => {

    const errors = [];

    for (const key in fields) {
        if (Object.hasOwnProperty.call(fields, key)) {
            const name = key;
            const value = fields[key];

            if (!value) {
                errors.push({
                    msg: `El campo ${ name } es obligatorio`
                })
            }
        }
    }

    return errors;
}
export const existeHabitacion = async( id ) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
            msg: `El ID: ${ id }, no es un ID válido de mongo`
        };
    }

    const habitacionById = await Habitacion.findById( id );

    if (!habitacionById || !habitacionById.estado) {
        return {
            msg: `La habitacion con ID: ${ id }, no existe.`
        };
    }
   
    return habitacionNoDisponible(habitacionById.disponibilidad);

}

export const existeReserva = async( id ) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
            msg: `El ID: ${ id }, no es un ID válido de mongo`
        };
    }

    const reservaById = await Reserva.findById( id );

    if (!reservaById || !reservaById.estado) {
        return {
            msg: `La reserva con ID: ${ id }, no existe.`
        };
    }

}

const habitacionNoDisponible = ( habitacion ) => {

    if (!habitacion) {
        return {
            msg: `La habitacion seleccionada, no esta disponoble.`
        };
    }

}

export const calcularDiasReservado = async( id, dias ) => {
    const habitacionById = await Habitacion.findById( id );

    dias = dias === 0 ? 1 : dias;

    if (habitacionById) {
        console.log(habitacionById.precio * dias);
        return habitacionById.precio * dias;
    }

    return 0;

}

export const calcularNumeroPersona = async( id, persona ) => {
    const habitacionById = await Habitacion.findById( id );

    if (habitacionById.numeroPersona < persona ) {
        return {msg: `Esta habitacón solo permite un máximo de ${ habitacionById.numeroPersona } persona`}
    }

}

export const usuarioUnico = async( usuario ) => {

    const existeUsuario = await Usuario.findOne({ usuario });

    if (existeUsuario) {
        throw new Error(`El usuario: ${ usuario }, ya está registrado`);
    }

}


export const existeUsuarioById = async( id ) => {

    await idValido( id );

    const usuarioById = await Usuario.findById( id );

    if (!usuarioById) {
        throw new Error(`El ID: ${ id }, no existe.`);
    }

}