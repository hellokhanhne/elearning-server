import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { google } from 'googleapis';
import { Redis } from 'ioredis';
import { StudentEntity } from 'src/entity/Student.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './types/jwtPayload.type';
import { ResLoginSuccess, Tokens } from './types/tokens';

const { OAuth2 } = google.auth;

const client = new OAuth2(process.env.CLIENT_GOOOGLE_ID);

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(StudentEntity)
    private userRepository: Repository<StudentEntity>,
    @InjectRedis() private client: Redis,
  ) {}
  // authentication with google
  async loginWithGoogle(idToken: string): Promise<ResLoginSuccess> {
    try {
      const payload = await client.verifyIdToken({
        idToken,
      });

      const user = await this.userRepository.findOne(
        {
          student_email: payload.getPayload().email,
        },
        { relations: ['role_id'] },
      );

      if (!user) return null;

      const { access_token, refresh_token } = await this.getToken({
        email: payload.getPayload().email,
        id: user.student_id,
        role: user.role_id.role_id,
      });

      await this.client.set(user.student_email, refresh_token, 'EX', 2592000);
      return {
        access_token,
        refresh_token,
        user,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // logout
  async logout(email: string) {
    return await this.client.del(email);
  }
  // get access token from refresh_token
  async refreshToken(payload: JwtPayload): Promise<Object> {
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get<string>('ACCESS_TOKEN'),
    });
    return { access_token };
  }
  // get accesstoken and refresh_token
  async getToken(payload: JwtPayload): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('ACCESS_TOKEN'),
        expiresIn: '30s',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get('REFRESH_TOKEN'),
        expiresIn: '30d',
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
}
