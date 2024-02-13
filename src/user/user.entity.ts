import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Note } from '../note/note.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { unique: true })
  phone: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column({
    select: false,
    type: 'varchar',
    length: 255,
  })
  password: string;

  @OneToMany(() => Note, (note) => note.user)
  notes?: Note[];
}
