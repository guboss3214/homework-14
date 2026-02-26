import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibit } from './entities/exhibit.entity';
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
      image: file ? file.filename : '',
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

  async findById(id: number) {
    const exhibit = await this.exhibitsRepository.findOne({
      where: { id },
      relations: ['user', 'comments'],
      select: {
        id: true,
        description: true,
        image: true,
        createdAt: true,
        userId: true,
        user: {
          id: true,
          username: true,
        },
      },
    });

    if (!exhibit) {
      throw new NotFoundException(`Експонат з ID ${id} не знайдено`);
    }

    return exhibit;
  }

  async deletePost(id: number, userId: number) {
    const exhibit = await this.exhibitsRepository.findOne({ where: { id } });

    if (!exhibit) {
      throw new NotFoundException(`Експонат з ID ${id} не знайдено`);
    }

    if (exhibit.userId !== userId) {
      throw new ForbiddenException('Ви можете видаляти лише свої експонати');
    }

    await this.exhibitsRepository.remove(exhibit);
    return { success: true, id };
  }

  async findMyPosts(userId: number) {
    return await this.exhibitsRepository.find({
      where: { userId: userId },
      order: { createdAt: 'DESC' },
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
}