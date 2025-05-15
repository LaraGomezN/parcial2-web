import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


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

}
