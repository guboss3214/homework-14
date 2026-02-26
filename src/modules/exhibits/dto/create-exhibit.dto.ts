import { ApiProperty } from '@nestjs/swagger';

export class CreateExhibitDto {
  @ApiProperty({
    example: 'Опис експоната',
    description: 'Детальний опис'
  })
  description: string;
}