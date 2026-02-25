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

  async remove(commentId: number, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId }
    });

    if (!comment) {
      throw new Error('Коментар не знайдено');
    }

    if (comment.userId !== userId) {
      throw new Error('Ви можете видаляти лише свої коментарі');
    }

    const exhibitId = comment.exhibitId;

    await this.commentRepository.remove(comment);
    
    return { 
      success: true, 
      commentId: commentId, 
      exhibitId: exhibitId 
    };
  }
}