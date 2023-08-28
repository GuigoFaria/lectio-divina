import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lectiones')
export class Lectione {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'total_time', type: 'int' })
  totalTime: number;

  @Column({ name: 'text', type: 'varchar' })
  text: string;

  @Column({ name: 'practical_resolution', type: 'varchar' })
  practicalResolution: string;

  @Column({ name: 'prayer_time', type: 'int' })
  prayerTime: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
