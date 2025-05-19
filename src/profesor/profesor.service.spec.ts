import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';


describe('ProfesorService', () => {
 let service: ProfesorService;
 let repository: Repository<ProfesorEntity>;

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

});