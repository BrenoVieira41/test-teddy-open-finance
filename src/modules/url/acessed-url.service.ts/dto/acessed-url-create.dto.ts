import { ApiProperty } from '@nestjs/swagger';

export class CreateAcessedUrlDto {
  @ApiProperty()
  shortened_url_id: string

  @ApiProperty()
  user_id?: string;
}
