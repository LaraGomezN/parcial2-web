import { Body, Controller, Delete, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { EvaluacionEntity } from './evaluacion.entity';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionDto } from './evaluacion.dto';
import { plainToInstance } from 'class-transformer';

@Controller('evaluaciones')
@UseInterceptors(BusinessErrorsInterceptor)
export class EvaluacionController {
    constructor(private readonly evaluacionService: EvaluacionService) {}

    @Post()
    async crearEvaluacion(@Body() evaluacionDto: EvaluacionDto): Promise<EvaluacionEntity> {
        const evaluacion: EvaluacionEntity = plainToInstance(EvaluacionEntity, evaluacionDto);
        return await this.evaluacionService.crearEvaluacion(evaluacion);
    }
}
