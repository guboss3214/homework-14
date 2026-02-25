import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(dto: CreateCommentDto, userId: number) {
    const newComment = this.commentRepository.create({
      text: dto.text,
      exhibitId: Number(dto.exhibitId),
      userId: userId,
    });

    const savedComment = await this.commentRepository.save(newComment);

    return await this.commentRepository.findOne({
      where: { id: savedComment.id },
      relations: ['user'],
      select: {
        id: true,
        text: true,
        createdAt: true,
        exhibitId: true,
        userId: true,
        user: {
          id: true,
          username: true,
        },
      },
    });
  }

  async findAllByExhibit(exhibitId: number) {
    return await this.commentRepository.find({
      where: { exhibitId: Number(exhibitId) },
      relations: ['user'],
      order: { createdAt: 'ASC' },
      select: {
        id: true,
        text: true,
        createdAt: true,
        exhibitId: true,
        userId: true,
        user: {
          id: true,
          username: true,
        },
      },
    });
  }
}