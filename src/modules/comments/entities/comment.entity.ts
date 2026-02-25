import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Exhibit } from '../../exhibits/entities/exhibit.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Exhibit, (exhibit) => exhibit.comments, { onDelete: 'CASCADE' })
  exhibit: Exhibit;

  @Column()
  exhibitId: number;

  @Column()
  userId: number;
}