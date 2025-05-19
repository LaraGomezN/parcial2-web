import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorService } from './profesor.service';
import { ProfesorDto } from './profesor.dto';
import { plainToInstance } from 'class-transformer';

@Controller('profesores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
    constructor(private readonly profesorService: ProfesorService) {}

    @Post()
    async crearProfesor(@Body() profesorDto: ProfesorDto): Promise<ProfesorEntity> {
        const profesor: ProfesorEntity = plainToInstance(ProfesorEntity, profesorDto);
        return await this.profesorService.crearProfesor(profesor);
    }

    @Post(':id/asignar-evaluador')
    async asignarEvaluador(@Param('id') id: number): Promise<void> {
        return await this.profesorService.asignarEvaluador(id);
    }
}
