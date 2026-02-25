import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Якийсь текст...' })
  text: string;

  @ApiProperty({ example: 1 })
  exhibitId: number;
}