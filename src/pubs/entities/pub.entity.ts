import { Review } from '../../reviews/entities/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Pub {
  @PrimaryGeneratedColumn()
  pubId: string;

  @Column({ unique: false })
  name: string;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @Column({ type: 'int', nullable: true })
  reviewCount: number;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  coordinates: string;

  @OneToMany((type) => Review, (review) => review.pub)
  // cascade: ['insert', 'remove', 'update'],
  // onDelete: 'CASCADE',
  review?: Review[];
}
