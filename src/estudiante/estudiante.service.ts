import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class EstudianteService {

    constructor(
       @InjectRepository(EstudianteEntity)
       private readonly estudianteRepository: Repository<EstudianteEntity>
   ){}

   async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity>{
    if (estudiante.promedio <= 3.2 && estudiante.semestre < 4)
        throw new BusinessLogicException("El estudiante no puede ser creado porque su promedio es menor a 3.2 y su semestre es menor a 4", BusinessError.PRECONDITION_FAILED);
    return await this.estudianteRepository.save(estudiante)
   }

   async eliminarEstudiante(id: number){
    const estudiante = await this.estudianteRepository.findOne({where: {id}});
    if (!estudiante) throw new BusinessLogicException("El estudiante no existe", BusinessError.NOT_FOUND);
    return await this.estudianteRepository.delete(id);
   }
   
}

