import { ApiProperty } from '@nestjs/swagger';

export class DeleteExhibitDto {
  @ApiProperty({ 
    example: 1, 
    description: 'ID експонату' 
  })
  id: number;
}