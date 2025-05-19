import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionEntity } from './evaluacion.entity';



describe('EvaluacionService', () => {
 let service: EvaluacionService;
 let repository: Repository<EvaluacionEntity>;
 let evaluacionesList: EvaluacionEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [EvaluacionService],
   }).compile();

   service = module.get<EvaluacionService>(EvaluacionService);
   repository = module.get<Repository<EvaluacionEntity>>(getRepositoryToken(EvaluacionEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 

});