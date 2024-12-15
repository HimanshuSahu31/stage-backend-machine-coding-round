import { IsNotEmpty, IsEnum, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContentType } from 'src/enum/content-type.enum';
export class CreateListItemDto {
  @ApiProperty()
  @IsMongoId()
  contentId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ContentType)
  contentType: string;
}
