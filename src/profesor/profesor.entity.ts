import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

}
