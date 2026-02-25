import { Exhibit } from "src/modules/exhibits/entities/exhibit.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column() 
  password: string;

  @OneToMany(() => Exhibit, (exhibit) => exhibit.user)
  exhibits: Exhibit[];
}