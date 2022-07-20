import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: string;

  @Column({ unique: true, nullable: false })
  userName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  dateOfBirth: Date;

  @Column({ nullable: false })
  createdAt: Date;
}
