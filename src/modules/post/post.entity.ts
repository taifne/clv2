import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Comment } from '@/modules/comment/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({
  //   type: 'varchar',
  //   length: 100,
  //   nullable: false,
  //   unique: true,
  //   comment: 'The name of the user',
  // })
  // name: string;
  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
