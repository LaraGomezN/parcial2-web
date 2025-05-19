import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity';
import { ProfesorEntity } from './profesor/profesor.entity';
import { EvaluacionEntity } from './evaluacion/evaluacion.entity';

@Module({
  imports: [EstudianteModule, ProyectoModule, ProfesorModule, EvaluacionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'parcialweb',
      entities: [EstudianteEntity, ProyectoEntity, ProfesorEntity, EvaluacionEntity],
      synchronize: true,
      dropSchema: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
