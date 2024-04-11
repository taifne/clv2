import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Post } from '@/modules/post/post.entity';
import { User } from '@/modules/user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => Post) 
  @JoinColumn({ name: 'postId' })
  post: Post['id'];

  @ManyToOne(() => User) 
  @JoinColumn({ name: 'userId' })
  user: User['id'];
  
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}
