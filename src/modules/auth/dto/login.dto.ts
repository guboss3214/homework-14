import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test', description: 'Нікнейм' })
  username: string;

  @ApiProperty({ example: 'qwerty', description: 'Пароль' })
  password: string;
}