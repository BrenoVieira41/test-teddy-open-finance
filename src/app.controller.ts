import { ShortenedUrlService } from './modules/url/shortened-url.service'
import { Controller, Get, Param, Redirect, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { IUserRequest } from './shared/interfaces/user';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Base')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly commpressedService: ShortenedUrlService
    ) { }

  @Get()
  @ApiOperation({ summary: 'Valida o codigo.' })
  serverRunning(): string {
    return this.appService.serverRunning();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/redirection/:shortHash')
  @ApiOperation({ summary: 'Redireciona.' })
  @Redirect('/')
  shortHash(
    @Param('shortHash') shortHash: string,
    @Req() request: IUserRequest
  ): any {
    return this.commpressedService.redirect(shortHash, request.user);
  }

}
