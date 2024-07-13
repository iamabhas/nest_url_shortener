import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthServiceImpl } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthServiceImpl,
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const authToken = request.headers['authorization'];
      if (!authToken) {
        throw new UnauthorizedException('Authorization Token is Missing');
      }
      if (this.authService.isBlacklisted(authToken)) {
        throw new UnauthorizedException('Token has been logged out');
      }

      const payload = await this.jwtService.verify(authToken, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      if (typeof payload === undefined || !payload) {
        throw new BadRequestException('Payload is missing');
      }
      request.user = payload;
      return true;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
