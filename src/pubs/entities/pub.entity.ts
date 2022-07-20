import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
    url: string

    @Column("int", { nullable: true, array: true })
    coordinates: string[];
}