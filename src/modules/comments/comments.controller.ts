import { Controller, Post, Body, Get, Param, UseGuards, Request, Delete, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Додати коментар' })
  async create(@Body() dto: CreateCommentDto, @Request() req) {
    return this.commentsService.create(dto, req.user.id);
  }

  @Get('exhibit/:id')
  @ApiOperation({ summary: 'Отримати всі коментарі до поста' })
  async findByExhibit(@Param('id') id: number) {
    return this.commentsService.findAllByExhibit(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Видалити коментар' })
  async delete(@Param('id') id: string, @Req() req: any) {
    return await this.commentsService.remove(Number(id), req.user.id);
  }
}