import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';
import { faker } from '@faker-js/faker';

describe('ProyectoService', () => {
 let service: ProyectoService;
 let repository: Repository<ProyectoEntity>;
  let proyectosList: ProyectoEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [ProyectoService],
   }).compile();

   service = module.get<ProyectoService>(ProyectoService);
   repository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 it('crearProyecto should return a new proyecto', async () => {
      const proyecto: ProyectoEntity = {
        id: 0,
        titulo: faker.lorem.sentence(),
        presupuesto: faker.number.int({ min: 1000, max: 10000 }),
        area: faker.lorem.sentence(),
        estado: faker.number.int({ min: 0, max: 5 }),
        notaFinal: faker.number.int({ min: 0, max: 5 }),
        fechaInicio: faker.lorem.sentence(),
        fechaFin: faker.lorem.sentence(),
        profesor: undefined,
        estudiante: undefined,
        evaluaciones: []
      }
  
      const newProyecto = await service.crearProyecto(proyecto);
      expect(newProyecto).not.toBeNull();
      
      const storedProyecto = await repository.findOne({ where: { id: newProyecto.id } });
      expect(storedProyecto).not.toBeNull();
      expect(storedProyecto!.titulo).toEqual(newProyecto.titulo);
      expect(storedProyecto!.presupuesto).toEqual(newProyecto.presupuesto);
      expect(storedProyecto!.estado).toEqual(newProyecto.estado);
  
    });

});