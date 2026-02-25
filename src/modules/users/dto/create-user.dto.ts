import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe', description: 'Нікнейм користувача' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'Пароль' })
  password: string;
}