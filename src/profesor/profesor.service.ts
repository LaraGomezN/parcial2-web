import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';

@Injectable()
export class ProfesorService {

    constructor(
           @InjectRepository(ProfesorEntity)
           private readonly profesorRepository: Repository<ProfesorEntity>,

           @InjectRepository(EvaluacionEntity)
            private readonly evaluacionRepository: Repository<EvaluacionEntity>
           
    ){}

    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity>{
        if (profesor.extension.toString().length != 5)
            throw new BusinessLogicException("La extension no es valida", BusinessError.PRECONDITION_FAILED);
        return await this.profesorRepository.save(profesor)
    }

    async asignarEvaluador(profesorId: number): Promise<void> {
        const evaluaciones = await this.evaluacionRepository.find({ where: { profesor: { id: profesorId } } });
        if (evaluaciones.length >= 3) {
        throw new Error('El profesor ya tiene 3 o más evaluaciones activas');
        }

        const profesor = await this.profesorRepository.findOne({ where: { id: profesorId } });
        if (!profesor) throw new Error('Profesor no encontrado');

        profesor.esParEvaluador = true;
        await this.evaluacionRepository.save(profesor);
    }
}
