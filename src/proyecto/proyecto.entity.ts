import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

}
