import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Req,
  Query,
  Delete,
  Patch
} from '@nestjs/common';
import { CreateShortenedUrlDto } from './dto/shortened-url-create.dto';
import { ShortenedUrlService } from './shortened-url.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IUserRequest } from '../../shared/interfaces/user';
import { GetShortenedUrlDto } from './dto/shortened-url-get.dto';
import { ShortenedUrl } from './shortened-url.entity';
import { UpdateShortenedUrlDto } from './dto/shortened-url-update.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ShortenedUrl')
@Controller('url')
export class ShortenedUrlController {
  constructor(private readonly shotenedService: ShortenedUrlService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  async compresseUrl(
    @Body(ValidationPipe) CreateShortenedUrl: CreateShortenedUrlDto,
    @Req() request?: IUserRequest,
  ): Promise<ShortenedUrl> {
    return this.shotenedService.createUrl(CreateShortenedUrl, request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/:id')
  @UsePipes(new ValidationPipe())
  async getShortenedUrl(
    @Query() params?: GetShortenedUrlDto,
    @Req() request?: IUserRequest,
  ): Promise<ShortenedUrl> {
    return this.shotenedService.getShortenedUrl(params.id, request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  @UsePipes(new ValidationPipe())
  async findShortenedUrl(@Req() request?: IUserRequest): Promise<ShortenedUrl[]> {
    return this.shotenedService.findShortenedUrl(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @UsePipes(new ValidationPipe())
  async deleteShortenedUrl(
    @Query() params?: GetShortenedUrlDto,
    @Req() request?: IUserRequest
  ): Promise<string> {
    return this.shotenedService.deleteShortenedUrl(params.id, request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @UsePipes(new ValidationPipe())
  async udpateShortenedUrl(
    @Query() params: GetShortenedUrlDto,
    @Req() request: IUserRequest,
    @Body() data: UpdateShortenedUrlDto
  ): Promise<string> {
    return this.shotenedService.udpateShortenedUrl(params.id, data, request.user);
  }
}
