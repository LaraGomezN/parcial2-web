import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class ProfesorEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type:'int'})
    cedula: number;
    
    @Column()
    nombre:string;

    @Column()
    departamento:string;

    @Column({type:'int'})
    extension: number;

    @Column()
    esParEvaluado:boolean;

    @OneToMany(() => EvaluacionEntity, evaluacion => evaluacion.profesor)
    evaluaciones: EvaluacionEntity[];

    @OneToMany(() => ProyectoEntity, proyecto => proyecto.profesor)
    proyectos: ProfesorEntity[];

    

}
