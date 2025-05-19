import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { faker } from '@faker-js/faker';


describe('ProfesorService', () => {
 let service: ProfesorService;
 let repository: Repository<ProfesorEntity>;
  let profesoresList: ProfesorEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [ProfesorService],
   }).compile();

   service = module.get<ProfesorService>(ProfesorService);
   repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

  //Caso positivo crearProfesor
  it('crearProfesor should return a new profesor', async () => {
      const profesor: ProfesorEntity = {
        id: 0,
        cedula: faker.number.int({ min: 10000000, max: 99999999 }),
        nombre: faker.person.fullName(),
        departamento: faker.lorem.word(),
        extension: parseInt(faker.string.numeric(5)),
        esParEvaluador: faker.datatype.boolean(),
        evaluaciones: [],
        proyectos: []
      }
  
      const newProfesor = await service.crearProfesor(profesor);
      expect(newProfesor).not.toBeNull();
      
      const storedProfesor = await repository.findOne({ where: { id: newProfesor.id } });
      expect(storedProfesor).not.toBeNull();
      expect(storedProfesor!.cedula).toEqual(newProfesor.cedula);
      expect(storedProfesor!.nombre).toEqual(newProfesor.nombre);
      expect(storedProfesor!.departamento).toEqual(newProfesor.departamento);
      expect(storedProfesor!.extension).toEqual(newProfesor.extension);
      expect(storedProfesor!.esParEvaluador).toEqual(newProfesor.esParEvaluador);

    });

    //Caso negativo crearProfesor
    it('crearProfesor with an invalid extension should throw an exception', async () => {
      const profesor: ProfesorEntity = {
        id: 0,
        cedula: faker.number.int({ min: 10000000, max: 99999999 }),
        nombre: faker.person.fullName(),
        departamento: faker.lorem.word(),
        extension: parseInt(faker.string.numeric(4)),
        esParEvaluador: faker.datatype.boolean(),
        evaluaciones: [],
        proyectos: []
      }
  
      await expect(() => service.crearProfesor(profesor)).rejects.toHaveProperty("message", "La extension no es valida");
    });


});