import { Body, Controller, Delete, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteDto } from './estudiante.dto';
import { plainToInstance } from 'class-transformer';


@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}

    @Post()
    async crearEstudiante(@Body() estudianteDto: EstudianteDto): Promise<EstudianteEntity> {
        const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDto);
        return await this.estudianteService.crearEstudiante(estudiante);
    }

    @Delete(':id')
    @HttpCode(204)
    async eliminarEstudiante(@Param('id') id: number) {
        return await this.estudianteService.eliminarEstudiante(id);
    }
}
