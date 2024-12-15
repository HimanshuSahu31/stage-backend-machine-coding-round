import { Module } from '@nestjs/common';
import { TVShowsService } from './tvshows.service';
import { TVShowsController } from './tvshows.controller';
import { TVShowSchemaModule } from '../models/tvshow.schema';
@Module({
  imports: [TVShowSchemaModule],
  controllers: [TVShowsController],
  providers: [TVShowsService],
  exports: [TVShowsService],
})
export class TvshowsModule {}
