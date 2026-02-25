import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibit } from './entities/exhibit.entity';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class ExhibitsService {
  constructor(
    @InjectRepository(Exhibit)
    private exhibitsRepository: Repository<Exhibit>,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async create(dto: any, userId: number, file?: any) {
    const newExhibit = {
      description: dto.description,
      image: file ? file.filename : dto.imageUrl,
      userId: userId,
    };

    const savedExhibit = await this.exhibitsRepository.save(newExhibit);

    this.notificationsGateway.sendNewPostNotification(savedExhibit.description);

    return savedExhibit;
  }

  async findAll() {
    return await this.exhibitsRepository.find({
      relations: ['user'],
      select: {
      id: true,
      description: true,
      image: true,
      createdAt: true,
      userId: true,
      user: {
        id: true,
        username: true,
      }
    }
    });
  }

  async deletePost(id: number) {
    return await this.exhibitsRepository.delete(id);
  }

  async findMyPosts(userId: number) {
    return await this.exhibitsRepository.find({
      where: { userId: userId },
      order: { createdAt: 'DESC' }, 
      relations: ['user'],
    });
  }
}