import { Controller, Post, Body, UseGuards, Request, Get, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ExhibitsService } from './exhibits.service';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DeleteExhibitDto } from './dto/delete-exhibit.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('exhibits')
@ApiBearerAuth() 
@Controller('exhibits')
export class ExhibitsController {
  constructor(private readonly exhibitsService: ExhibitsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  @ApiOperation({ summary: 'Створити пост' })
  async create(@Body() createExhibitDto: CreateExhibitDto, @Request() req, @UploadedFile() file: Express.Multer.File) {
    return this.exhibitsService.create(createExhibitDto, req.user.id, file);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати всі пости' })
  async findAll() {
    return this.exhibitsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-posts')
  @ApiOperation({ summary: 'Отримати пости поточного користувача' })
  async findMyPosts(@Request() req) {
    return this.exhibitsService.findMyPosts(req.user.userId);
  }

  @Delete()
  async deletePost(@Body() deleteExibitDto: DeleteExhibitDto) {
    return this.exhibitsService.deletePost(deleteExibitDto.id);
  }
}