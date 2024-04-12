import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn, OneToMany, CreateDateColumn } from 'typeorm';
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

  @ManyToOne(() => Post, post => post.comments) 
  @JoinColumn({ name: 'postId' })
  post: Post['id'];

  @ManyToOne(() => User, user => user.comments) 
  @JoinColumn({ name: 'userId' })
  user: User['id'];

  @OneToMany(() => Comment, comment => comment.parentId)
  replies: Comment[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}
