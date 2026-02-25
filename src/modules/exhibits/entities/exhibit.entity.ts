import { Comment } from "src/modules/comments/entities/comment.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Exhibit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  image: string; 

  @ManyToOne(() => User, (user) => user.exhibits)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Comment, (comment) => comment.exhibit)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}