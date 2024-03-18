import { UserRepository } from './../user/repository/user.repository'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { TOKEN_MESSAGE_ERROR } from './auth.constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtFromRequest(request);
    try {
      if (!token) {
        request.user = {};
        return request.user;
      }
      const decoded = this.jwtService.verify(token);
      const { id, name, email } = decoded;

      const user = await this.userRepository.findUserById(id);

      if (!user) throw new UnauthorizedException(TOKEN_MESSAGE_ERROR);

      request.user = { id: user.id, name: user.name, email: user.email };
      return request.user;
    } catch (error) {
      throw new UnauthorizedException(TOKEN_MESSAGE_ERROR);
    }
  }

  private validateJwt(url: string, authHeader: string, method: string) {
    const isCrypted = RegExp(/^[A-Za-z0-9]{6}$/);
    if (method === 'POST' && (url === '/url' && !authHeader)) {
      return true;
    }

    const urlSplited = url.split('/');

    if (urlSplited.length === 3 && isCrypted.test(urlSplited[2])) {
      if (urlSplited[1] === 'redirection' && !authHeader) {
        return true;
      }
    }
  }

  private extractJwtFromRequest(request: Request): string {
    const authHeader = request.headers['authorization'];
    const { url, method } = request;

    const validation = this.validateJwt(url, authHeader, method);

    if (validation) return;

    if (!authHeader) {
      throw new UnauthorizedException(TOKEN_MESSAGE_ERROR);
    }

    const token = authHeader.replace('Bearer ', '');
    return token;
  }
}
