import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => Post) // Many comments can belong to one post
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => User) // Many comments can belong to one user
  @JoinColumn({ name: 'userId' })
  user: User;

  // You can add more columns or relationships as needed
}
