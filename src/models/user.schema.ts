import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type UserDocument = User & Document;
import { genre } from '../constants/constants';
import { ContentType } from 'src/enum/content-type.enum';

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({
    type: [
      {
        type: String,
        enum: genre,
      },
    ],
  })
  favoriteGenres: string[];

  @Prop({
    type: [
      {
        type: String,
        enum: genre,
      },
    ],
  })
  dislikedGenres: string[];

  @Prop([
    {
      contentId: { type: String, required: true },
      watchedOn: { type: Date, required: true },
      rating: { type: Number, min: 1, max: 5 },
    },
  ])
  watchHistory: {
    contentId: string;
    watchedOn: Date;
    rating: number;
  }[];

  @Prop([
    {
      contentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'myList.contentType',
        index: true,
      },
      contentType: { type: String, enum: ContentType, required: true },
    },
  ])
  myList: {
    contentId: string;
    contentType: string;
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaModule = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);
