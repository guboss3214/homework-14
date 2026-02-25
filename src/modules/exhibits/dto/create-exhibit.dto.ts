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
    example: 'https://example.com/post.jpg', 
    description: 'Посилання на зображення' 
  })
  imageUrl: string;
}