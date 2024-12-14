import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { MovieSchemaModule } from "src/models/movie.schema";
import { TVShowSchemaModule } from "src/models/tvshow.schema";
import { UserSchemaModule } from "src/models/user.schema";

@Module({
    imports: [MovieSchemaModule, TVShowSchemaModule, UserSchemaModule],
    providers: [SeedService],
  })
  export class SeedModule {}