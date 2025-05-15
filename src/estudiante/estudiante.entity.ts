import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity()   
export class EstudianteEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nombre: string;

    @Column({type: 'int'})
    semestre: number;

    @Column()
    programa: string;

    @Column({type: 'int'})
    promedio: number;

    @OneToMany(() => ProyectoEntity, proyecto => proyecto.estudiante)
    proyectos: ProyectoEntity[];

}
