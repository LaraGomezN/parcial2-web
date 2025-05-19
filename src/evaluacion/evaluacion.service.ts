import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class EvaluacionService {

    constructor(
        @InjectRepository(EvaluacionEntity)
        private readonly evaluacionRepository: Repository<EvaluacionEntity>
    ){}
    

    async crearEvaluacion(evaluacion: EvaluacionEntity): Promise<EvaluacionEntity>{
        if (!evaluacion.proyecto)
            return await this.evaluacionRepository.save(evaluacion)
        if (!evaluacion.proyecto.estudiante)
            return await this.evaluacionRepository.save(evaluacion)
        if (evaluacion.profesor.nombre != 'mentor' && (evaluacion.proyecto.notaFinal < 0 || evaluacion.proyecto.notaFinal > 5))
            throw new BusinessLogicException("La nota final no es valida", BusinessError.PRECONDITION_FAILED);
        return await this.evaluacionRepository.save(evaluacion)
    }
}
