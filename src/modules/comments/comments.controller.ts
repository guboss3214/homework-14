import { Controller, Post, Body, Get, Param, UseGuards, Request, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('api/exhibits')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post(':exhibitId/comments')
  @ApiOperation({ summary: 'Додати коментар до експонату' })
  async create(
    @Param('exhibitId') exhibitId: string,
    @Body() dto: CreateCommentDto,
    @Request() req,
  ) {
    return this.commentsService.create(dto, Number(exhibitId), req.user.id);
  }

  @Get(':exhibitId/comments')
  @ApiOperation({ summary: 'Отримати всі коментарі до експонату' })
  async findByExhibit(@Param('exhibitId') exhibitId: string) {
    return this.commentsService.findAllByExhibit(Number(exhibitId));
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':exhibitId/comments/:commentId')
  @ApiOperation({ summary: 'Видалити коментар' })
  async delete(
    @Param('exhibitId') exhibitId: string,
    @Param('commentId') commentId: string,
    @Request() req,
  ) {
    return await this.commentsService.remove(Number(commentId), req.user.id);
  }
}