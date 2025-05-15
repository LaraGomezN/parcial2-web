import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ProyectoEntity {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    titulo:string;

    @Column()
    area:string;

    @Column({type:'int'})
    presupuesto:number;

    @Column({type:'int'})
    notaFinal:number;

    @Column({type:'int'})
    estado:number;
    
    @Column()
    fechaInicio:string;

    @Column()
    fechaFin:string;

    @ManyToOne(() => ProfesorEntity, profesor => profesor.proyectos)
    profesor: ProfesorEntity;

    @OneToMany(() => EvaluacionEntity, evauacion => evauacion.proyecto)
    evaluaciones: EvaluacionEntity[];

    @ManyToOne(() => EstudianteEntity, estudiante => estudiante.proyectos)
    estudiante: EstudianteEntity;

}
