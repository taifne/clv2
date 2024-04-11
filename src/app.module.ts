import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './Config/typeorm.config';
import { CustomTypeOrmLogger } from './logger/logger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module'; // Import the PostModule
import { CommentsModule } from './comments/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      autoLoadEntities: true,
       logger: new CustomTypeOrmLogger()
    }),
    UserModule, 
    CommentsModule,
    PostModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
