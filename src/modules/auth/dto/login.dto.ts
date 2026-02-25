import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'John', description: 'Нікнейм' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'Пароль' })
  password: string;
}