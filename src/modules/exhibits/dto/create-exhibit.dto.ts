import { ApiProperty } from '@nestjs/swagger';

export class CreateExhibitDto {
  @ApiProperty({ 
    example: 'Експонат 1', 
    description: 'Назва експонату' 
  })
  title: string;

  @ApiProperty({ 
    example: 'Пост 1', 
    description: 'Детальний опис' 
  })
  description: string;

  @ApiProperty({ 
    type: 'string', 
    format: 'binary', 
    description: 'Оберіть файл зображення для завантаження' 
  })
  imageUrl: any;
}