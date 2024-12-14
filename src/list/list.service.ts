import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { ContentType } from 'src/enum/content-type.enum';
import { User, UserDocument } from 'src/models/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MoviesService } from 'src/movies/movies.service';
import { TVShowsService } from 'src/tvshows/tvshows.service';
import { Movie } from 'src/models/movie.schema';
import { TVShow } from 'src/models/tvshow.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,private readonly moviesService: MoviesService, private readonly tvShowsService: TVShowsService) {}

  async addToList(userId: string, createListItemDto: CreateListItemDto) {
    const content = await this.findContent(createListItemDto)
    if (!content) {
      throw new NotFoundException('Content does not exist')
    }

    this.userModel.updateOne({_id: userId, "myList.contentId": {$ne: createListItemDto.contentId}}, {$push: {myList: createListItemDto}}).exec();
  }

  async removeFromList(userId: string, itemId: string) {
    const res = await this.userModel.updateOne({_id: userId}, {$pull: {myList: {_id: itemId}}}).exec();
    console.log(res)
    if (!res.matchedCount) throw new NotFoundException('Item not found in List')
  }

  async listMyItems(userId: string){
    return this.userModel.findById(userId).populate('myList.contentId').exec();
  }

  async listUser(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  private async findContent(createListItemDto: CreateListItemDto): Promise<Movie | TVShow> {
    if (createListItemDto.contentType === ContentType.Movie) {
      return this.moviesService.findById(createListItemDto.contentId);
    } else {
      return this.tvShowsService.findById(createListItemDto.contentId);
    }
  }
}
