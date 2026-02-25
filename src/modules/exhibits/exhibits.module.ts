import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExhibitsService } from './exhibits.service';
import { ExhibitsController } from './exhibits.controller';
import { Exhibit } from './entities/exhibit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exhibit])], 
  providers: [ExhibitsService],
  controllers: [ExhibitsController],
})
export class ExhibitsModule {}