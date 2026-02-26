import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Exhibit } from "src/modules/exhibits/entities/exhibit.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Exhibit, (exhibit) => exhibit.user, { cascade: true })
  @ApiProperty({ type: () => [Exhibit], description: 'Список експонатів, доданих користувачем' })
  exhibits: Exhibit[];
}