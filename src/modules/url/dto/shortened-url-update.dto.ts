import { ApiProperty } from '@nestjs/swagger';

export class UpdateShortenedUrlDto {
  @ApiProperty()
  url?: string;

  @ApiProperty()
  shortened_url?: string;
}
