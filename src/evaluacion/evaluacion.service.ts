import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvaluacionService {

    constructor(
        @InjectRepository(EvaluacionEntity)
        private readonly evaluacionRepository: Repository<EvaluacionEntity>
    ){}
    

    async crearEvaluacion(evaluacion: EvaluacionEntity): Promise<EvaluacionEntity>{
        if (evaluacion.profesor.nombre != 'mentor' && (evaluacion.proyecto.notaFinal < 0 || evaluacion.proyecto.notaFinal > 5))
            throw new Error('No se puede crear la evaluacion')
        return await this.evaluacionRepository.save(evaluacion)
    }
}
