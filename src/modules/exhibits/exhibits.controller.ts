import { Controller, Post, Body, UseGuards, Request, Get, Delete, Param, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ExhibitsService } from './exhibits.service';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

@ApiTags('exhibits')
@Controller('api/exhibits')
export class ExhibitsController {
  constructor(private readonly exhibitsService: ExhibitsService) {}

  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (_, file, callback) => {
        const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
        callback(null, uniqueFileName);
      },
    }),
  }))
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Створення нового експоната' })
  @ApiResponse({ status: 201, description: 'Експонат успішно створено' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
        description: { type: 'string' },
      },
    },
  })
  async create(
    @Body() createExhibitDto: CreateExhibitDto,
    @Request() req,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.exhibitsService.create(createExhibitDto, req.user.id, file);
  }

  @Get()
  @ApiOperation({ summary: 'Перегляд всіх експонатів' })
  async findAll() {
    return this.exhibitsService.findAll();
  }

  @Get('static/:filename')
  @ApiOperation({ summary: 'Отримання зображення' })
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './uploads' });
  }

  @Get('post/:id')
  @ApiOperation({ summary: 'Перегляд експоната за ID' })
  async findOne(@Param('id') id: string) {
    return this.exhibitsService.findById(Number(id));
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('my-posts')
  @ApiOperation({ summary: 'Перегляд експонатів поточного користувача' })
  async findMyPosts(@Request() req) {
    return this.exhibitsService.findMyPosts(req.user.id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Видалення експоната поточного користувача за ID' })
  async deletePost(@Param('id') id: string, @Request() req) {
    return this.exhibitsService.deletePost(Number(id), req.user.id);
  }
}