import { calcularDiasReservado, calcularNumeroPersona, existeHabitacion, existeReserva, validFields } from "../helpers/db-validaciones.js";

import { ReservaService } from "../services/reserva.js";

const reservaService = new ReservaService();

export const reservaPost = async(req, res) => {

    const { 
        nombreCliente,
        apellidoCliente,
        telefono,
        fechaIngreso,
        fechaSalida,
        idHabitacion,
        numeroNinio,
        numeroAadulto
    } = req.body;

    const reservaBody = { 
        nombreCliente,
        apellidoCliente,
        telefono,
        fechaIngreso,
        fechaSalida,
        idHabitacion,
        numeroNinio,
        numeroAadulto
    };

    const errors = validFields(reservaBody);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    const existeHab = await existeHabitacion(idHabitacion);
    if (existeHab){
        return res.status(400).json(existeHab);
    }

    const fechaInicio = new Date( fechaIngreso );
    const fechaFin = new Date( fechaSalida );
    
    if (fechaInicio > fechaFin) {
        return res.status(400).json({
            msg: 'La fecha ingreso no puede ser superio a la de salida'
        });
    }

    const diasReservados = Math.round((fechaFin - fechaInicio) / (1000*60*60*24));
    reservaBody.costoReserva = await calcularDiasReservado( idHabitacion, diasReservados );

    const numPersona = await calcularNumeroPersona(idHabitacion, (Number(numeroAadulto) + Number(numeroNinio)));

    if (numPersona) {
        return res.status(400).json(numPersona);
    }

    console.log(reservaBody);

    res.json(await reservaService.guardarReserva(reservaBody));

}

export const reservaGet = async( req, res ) => {

    const query = { estado: true };
    res.status(200).json(await reservaService.listarReservas(query));

}

export const reservaGetPorId = async( req, res ) => {

    const { id } = req.params;
    const query = { estado: true, _id: id};

    const existeRes = await existeReserva(id);
    if (existeRes){
        return res.status(400).json(existeRes);
    }

    res.status(200).json(await reservaService.buscarReservaPorId(query));

}

export const reservaUpdate = async(req, res) => {

    const { _id, estado, ...resto } = req.body;
    const { id } = req.params;

    const existeRes = await existeReserva(id);
    if (existeRes){
        return res.status(400).json(existeRes);
    }

    const fechaInicio = new Date( resto.fechaIngreso );
    const fechaFin = new Date( resto.fechaSalida );
    
    if (fechaInicio > fechaFin) {
        return res.status(400).json({
            msg: 'La fecha ingreso no puede ser superio a la de salida'
        });
    }

    const diasReservados = Math.round((fechaFin - fechaInicio) / (1000*60*60*24));
    resto.costoReserva = await calcularDiasReservado( resto.idHabitacion, diasReservados );

    const numPersona = await calcularNumeroPersona(resto.idHabitacion, (Number(resto.numeroAadulto) + Number(resto.numeroNinio)));

    if (numPersona) {
        return res.status(400).json(numPersona);
    }

    res.status(201).json(await reservaService.actualizarReserva( id, resto ));

}

export const reservaDelete = async(req, res) => {
    const { id } = req.params;
    const existeRes = await existeReserva(id);
    if (existeRes){
        return res.status(400).json(existeRes);
    }
    
    res.status(204).json(await reservaService.eliminarreserva(id));

}