import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserSchemaModule } from 'src/models/user.schema';
import { UserService } from './list.service';
import { UserController } from './list.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { MoviesModule } from 'src/movies/movies.module';
import { TvshowsModule } from 'src/tvshows/tvshows.module';

@Module({
  imports: [
    UserSchemaModule,
    MoviesModule, TvshowsModule
  ],
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(UserController);
    }
}
