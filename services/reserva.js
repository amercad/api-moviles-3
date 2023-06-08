import Reserva from "../models/reserva.js";
import Habitacion from '../models/habitacion.js';

export class ReservaService {

    constructor() {}

    async guardarReserva(reserva) {
        await Habitacion.findByIdAndUpdate( reserva.idHabitacion, { disponibilidad: false }, { new: true });
        const guardar = new Reserva(reserva);
        return await guardar.save();
    }

    async listarReservas(query) {
    
        const [reservas, total] = await Promise.all([
            Reserva.find( query ),
            Reserva.find( query ).countDocuments()
        ]);

        return {total, reservas }
    
    }

    async buscarReservaPorId(query) {
        return await Reserva.find(query);
    }

    async actualizarReserva(id, habitacion) {
        return await Reserva.findByIdAndUpdate( id, habitacion, { new: true });
    }

    async eliminarreserva(id) {
        const reserva = await Reserva.findById(id);
        console.log(reserva);
        await Habitacion.findByIdAndUpdate( reserva.idHabitacion, { disponibilidad: true }, { new: true });
        return await Reserva.findByIdAndUpdate( id, { estado: false }, { new: true });
    }

}