import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class EvaluacionEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;


    @ManyToOne(() => ProfesorEntity, profesor => profesor.evaluaciones)
    profesor: ProfesorEntity;

    @ManyToOne(() => ProyectoEntity, proyecto => proyecto.evaluaciones)
    proyecto: ProyectoEntity;

}
