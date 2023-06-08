import Habitacion from '../models/habitacion.js';

export class HabitacionService {

    constructor() {}

    async listarHabitaciones(query) {
    
        const [habitaciones, total] = await Promise.all([
            Habitacion.find( query ),
            Habitacion.find( query ).countDocuments()
        ]);

        return {total, habitaciones}
    
    }

    async buscarHabitacionPorId(query) {
        return await Habitacion.find(query);
    }

    async guardarHabitacion(habitacion) {
        const guardar = new Habitacion(habitacion);
        return await guardar.save();
    }

    async actualizarHabitacion(id, habitacion) {
        return await Habitacion.findByIdAndUpdate( id, habitacion, { new: true });
    }

    async eliminarHabitacion(id) {
        return await Habitacion.findByIdAndUpdate( id, { estado: false }, { new: true });
    }
}