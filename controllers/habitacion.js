import { request } from 'express';

import { HabitacionService } from '../services/habitacion.js';
const habitacionService = new HabitacionService();


export const habitacionGet = async(req, res) => {

    const query = { estado: true };
    res.status(200).json(await habitacionService.listarHabitaciones(query));

}

export const habitacionesDisponiblesGet = async(req, res) => {

    const query = { estado: true, disponibilidad: true };
    res.status(200).json(await habitacionService.listarHabitaciones(query));

}

export const habitacionGetById = async(req = request, res) => {

    const { id } = req.params;
    const query = { estado: true, _id: id};

    res.status(200).json(await habitacionService.buscarHabitacionPorId(query));

}

export const habitacionSave = async(req, res) => {

    const { nombre, foto, descripcion, precio, numeroPersona } = req.body;

    res.status(201).json(await habitacionService.guardarHabitacion({ nombre, foto, descripcion, precio, numeroPersona }));

}

export const habitacionUpdate = async(req, res) => {

    const { _id, estado, ...resto } = req.body;
    const { id } = req.params;

    res.status(201).json(await habitacionService.actualizarHabitacion( id, resto ));

}

export const habitacionDelete = async(req, res) => {
    const { id } = req.params;
    res.status(204).json(await habitacionService.eliminarHabitacion(id));

}