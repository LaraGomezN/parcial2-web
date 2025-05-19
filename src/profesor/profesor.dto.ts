import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class ProfesorDto {
    @IsNotEmpty()
    @IsNumber()
    cedula: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    departamento: string;

    @IsNotEmpty()
    @IsString()
    extension: string;

    @IsNotEmpty()
    @IsBoolean()
    esParEvaluado: boolean;
}
