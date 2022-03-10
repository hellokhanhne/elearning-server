import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Redis } from 'ioredis';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwtPayload.type';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'rt_jwt') {
  constructor(config: ConfigService, @InjectRedis() private client: Redis) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('REFRESH_TOKEN'),
    });
  }
  async validate(payload: JwtPayload) {
    const existToken = await this.client.get(payload.email);
    if (!existToken) return false;
    return payload;
  }
}
