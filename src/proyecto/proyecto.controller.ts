import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ProyectoEntity } from './proyecto.entity';
import { ProyectoService } from './proyecto.service';
import { ProyectoDto } from './proyecto.dto';
import { plainToInstance } from 'class-transformer';
import { EstudianteEntity } from '../estudiante/estudiante.entity';

@Controller('proyectos')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {}

    @Post()
    async crearProyecto(@Body() proyectoDto: ProyectoDto): Promise<ProyectoEntity> {
        const proyecto: ProyectoEntity = plainToInstance(ProyectoEntity, proyectoDto);
        return await this.proyectoService.crearProyecto(proyecto);
    }

    @Put(':id')
    async avanzarProyecto(@Param('id') id: number): Promise<ProyectoEntity> {
        return await this.proyectoService.avanzarProyecto(id);
    }

    @Get(':id/estudiantes')
    async findAllEstudiantes(@Param('id') id: number): Promise<EstudianteEntity> {
        return await this.proyectoService.findAllEstudiantes(id);
    }
}
