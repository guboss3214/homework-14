import { Controller, Post, Body, UseGuards, Request, Get, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ExhibitsService } from './exhibits.service';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DeleteExhibitDto } from './dto/delete-exhibit.dto';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('exhibits')
@ApiBearerAuth() 
@Controller('exhibits')
export class ExhibitsController {
  constructor(private readonly exhibitsService: ExhibitsService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Створити пост' })
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (_, file, callback) => {
        const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
        callback(null, uniqueFileName);
      },
    }),
  }))
  async create(
    @Body() createExhibitDto: CreateExhibitDto, 
    @Request() req, 
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.exhibitsService.create(createExhibitDto, req.user.id, file);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати всі пости' })
  async findAll() {
    return this.exhibitsService.findAll();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('my-posts')
  @ApiOperation({ summary: 'Отримати пости поточного користувача' })
  async findMyPosts(@Request() req) {
    return this.exhibitsService.findMyPosts(req.user.userId);
  }

  @ApiBearerAuth('access-token')
  @Delete()
  @ApiOperation({ summary: 'Видалити пост' })
  async deletePost(@Body() deleteExibitDto: DeleteExhibitDto) {
    return this.exhibitsService.deletePost(deleteExibitDto.id);
  }
}