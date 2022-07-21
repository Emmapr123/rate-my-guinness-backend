import { Pub } from '../../pubs/entities/pub.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  reviewId: string;

  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user?: User;

  @ManyToOne((type) => Pub, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pubId', referencedColumnName: 'pubId' })
  pub?: Pub;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: true })
  reviewTitle: string;

  @Column({ nullable: false })
  reviewBody: string;
}
