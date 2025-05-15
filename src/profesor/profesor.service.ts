import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesorService {

    constructor(
           @InjectRepository(ProfesorEntity)
           private readonly profesorRepository: Repository<ProfesorEntity>
    ){}

    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity>{
        if (profesor.extension.toString.length != 5)
            throw new Error('No se puede crear el profesor')
        return await this.profesorRepository.save(profesor)
    }

    async asignarEvaluador(id: number, idEvaluador: number){
        const profesor = await this.profesorRepository.findOne({where: {id}});
        if (!profesor) throw new Error('No se encuentra el profesor')

        const evaluador = await this.profesorRepository.findOne({where: {id: idEvaluador}});
        if (!evaluador) throw new Error('No se encuentra el evaluador')

        if (profesor.evaluaciones.length >= 3)
            throw new Error('No se puede asignar la evaluacion al profesor')

        profesor.evaluaciones = profesor.evaluaciones || [];
        return await this.profesorRepository.save(profesor);
    }

    




}
