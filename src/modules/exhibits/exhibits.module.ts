import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExhibitsService } from './exhibits.service';
import { ExhibitsController } from './exhibits.controller';
import { Exhibit } from './entities/exhibit.entity';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Exhibit])], 
  providers: [ExhibitsService, NotificationsGateway],
  controllers: [ExhibitsController],
})
export class ExhibitsModule {}