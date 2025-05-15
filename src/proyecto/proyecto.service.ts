import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { Repository } from 'typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';

@Injectable()
export class ProyectoService {

    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>
    ){}

    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity>{
        if (proyecto.presupuesto <= 0 && proyecto.titulo.length <= 15)
            throw new Error('No se puede crear el proyecto')
        return await this.proyectoRepository.save(proyecto)
    }

    async findAllEstudiantes(id: number): Promise<EstudianteEntity>{
        const proyecto = await this.proyectoRepository.findOne({where: {id}, relations: ['estudiantes']});
        if (!proyecto) throw new Error('No se encuentra el proyecto')
        return proyecto.estudiante;
    }

    async avanzarProyecto(id: number): Promise<ProyectoEntity> {
        const proyecto = await this.proyectoRepository.findOne({ where: { id } });
        if (!proyecto) throw new Error('No se encuentra el proyecto');
        if (proyecto.estado >= 4) throw new Error('El proyecto ya está en su estado máximo');
        proyecto.estado += 1;
        return await this.proyectoRepository.save(proyecto);
    }





}
