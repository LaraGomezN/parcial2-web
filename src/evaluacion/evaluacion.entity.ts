import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EvaluacionEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

}
