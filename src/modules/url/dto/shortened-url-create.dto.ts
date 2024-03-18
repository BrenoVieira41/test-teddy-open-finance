import { ApiProperty } from '@nestjs/swagger';

export class CreateShortenedUrlDto {
  @ApiProperty()
  url: string;

  @ApiProperty()
  shortened_url?: string;

  @ApiProperty()
  user_id?: string;
}
