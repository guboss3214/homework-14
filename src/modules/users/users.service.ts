import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ 
        where: { username },
        select: ['id', 'username', 'password'] 
    });
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username'], 
      relations: ['exhibits'],
    });
    
    if (!user) {
        throw new NotFoundException(`Користувача з ID ${id} не знайдено`);
    }
    
    return user;
  }

  async create(userData: any): Promise<User> {
    const existing = await this.findOne(userData.username);
    if (existing) {
      throw new BadRequestException('Користувач з таким ім’ям вже існує');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = this.usersRepository.create({
        username: userData.username,
        password: hashedPassword,
    } as Partial<User>); 

    return await this.usersRepository.save(newUser);
  }
}