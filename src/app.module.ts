import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { Exhibit } from './modules/exhibits/entities/exhibit.entity';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExhibitsModule } from './modules/exhibits/exhibits.module';
import { CommentsModule } from './modules/comments/comments.module';
import { Comment } from './modules/comments/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'db123',
      database: 'museum_db',
      entities: [User, Exhibit, Comment],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CommentsModule,
    ExhibitsModule,
  ],
})
export class AppModule {}