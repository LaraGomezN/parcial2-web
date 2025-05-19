import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteService } from './estudiante.service';
import { faker } from '@faker-js/faker';


describe('EstudianteService', () => {
 let service: EstudianteService;
 let repository: Repository<EstudianteEntity>;
 let estudiantesList: EstudianteEntity[]; 


 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [EstudianteService],
   }).compile();

   service = module.get<EstudianteService>(EstudianteService);
   repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
   await seedDatabase();
 });

  const seedDatabase = async () => {
    repository.clear();
    estudiantesList = [];
    for(let i = 0; i < 5; i++){
        const estudiante: EstudianteEntity = await repository.save({
        cedula: faker.number.int({ min: 10000000, max: 99999999 }),
        nombre: faker.person.fullName(),
        semestre: faker.number.int({ min: 1, max: 10 }), 
        programa: faker.lorem.word(),
        promedio: faker.number.int({ min: 1, max: 5 })});
        estudiantesList.push(estudiante);
    }
  }

 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 //Caso positivo crearEstudiante
 it('crearEstudiante should return a new estudiante', async () => {
    const estudiante: EstudianteEntity = {
      id: 0,
      cedula: faker.number.int({ min: 10000000, max: 99999999 }),
      nombre: faker.person.fullName(),
      semestre: faker.number.int({ min: 4, max: 10 }), 
      programa: faker.lorem.word(),
      promedio: faker.number.int({ min: 1, max: 3 }),
      proyectos: []
    }
  
    const newEstudiante = await service.crearEstudiante(estudiante);
    expect(newEstudiante).not.toBeNull();
    expect(newEstudiante.id).toBeDefined();
    expect(newEstudiante.cedula).toEqual(estudiante.cedula);
    expect(newEstudiante.nombre).toEqual(estudiante.nombre);
    expect(newEstudiante.semestre).toEqual(estudiante.semestre);
    expect(newEstudiante.programa).toEqual(estudiante.programa);
    expect(newEstudiante.promedio).toEqual(estudiante.promedio);
  });

  //Caso negativo crearEstudiante
  it('crearEstudiante should throw an error if promedio <= 3.2 and semestre < 4', async () => {
  const estudiante: EstudianteEntity = {
    id: 0,
    cedula: faker.number.int({ min: 10000000, max: 99999999 }),
    nombre: faker.person.fullName(),
    semestre: 2, // menor a 4
    programa: faker.lorem.word(),
    promedio: 3, // menor o igual a 3.2
    proyectos: []
  };

  await expect(service.crearEstudiante(estudiante)).rejects.toHaveProperty('message', 'El estudiante no puede ser creado porque su promedio es menor a 3.2 y su semestre es menor a 4');
});

  //Caso positivo eliminarEstudiante
  it('eliminarEstudiante should delete a estudiante', async () => {
    const estudiante: EstudianteEntity = estudiantesList[0];
    await service.eliminarEstudiante(estudiante.id);
    const deletedEstudiante = await repository.findOneBy({ id: estudiante.id });
    expect(deletedEstudiante).toBeNull();
  });

  //Caso negativo eliminarEstudiante
  it('eliminarEstudiante should throw an exception for an invalid estudiante', async () => {
    const estudiante: EstudianteEntity = estudiantesList[0];
    await service.eliminarEstudiante(estudiante.id);
    await expect(() => service.eliminarEstudiante(estudiante.id)).rejects.toHaveProperty('message', 'El estudiante no existe');
  });

});
