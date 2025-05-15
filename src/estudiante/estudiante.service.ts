import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { Repository } from 'typeorm';


@Injectable()
export class EstudianteService {

    constructor(
       @InjectRepository(EstudianteEntity)
       private readonly estudianteRepository: Repository<EstudianteEntity>
   ){}

   async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity>{
    if (estudiante.promedio <= 3.2 && estudiante.semestre < 4)
        throw new Error('No se puede crear el estudiante')
    return await this.estudianteRepository.save(estudiante)
   }

   async eliminarEstudiante(id: number){
    const estudiante = await this.estudianteRepository.findOne({where: {id}});
    if (!estudiante) throw new Error('No se encuentra el estudiante')
    return await this.estudianteRepository.delete(id);
   }
   
}

