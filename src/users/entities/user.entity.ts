import { Review } from '../../reviews/entities/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Review, (review) => review.user, {
    cascade: ['insert', 'remove', 'update'],
    onDelete: 'CASCADE',
  })
  review?: Review[];
}
