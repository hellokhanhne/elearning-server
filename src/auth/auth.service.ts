import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { google } from 'googleapis';
import { Redis } from 'ioredis';
import { PermissionEntity } from 'src/entity/Permission.entity';
import { RoleEntity } from 'src/entity/Role.entity';
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
    @InjectRepository(RoleEntity)
    private roleRep: Repository<RoleEntity>,
    @InjectRedis() private client: Redis,
    @InjectRepository(PermissionEntity)
    private perRep: Repository<PermissionEntity>,
  ) {}
  // authentication with google
  async loginWithGoogle(idToken: string): Promise<ResLoginSuccess> {
    try {
      const payload = await client.verifyIdToken({
        idToken,
      });

      // const role = await this.roleRep.findOne(2);
      // const permission = await this.perRep.findOne(1);
      // role.role_permissions = [permission];
      // await role.save();
      // const newUser = new StudentEntity();
      // newUser.student_address = '';
      // newUser.student_avatar = '';
      // newUser.student_email = 'nnkhanh.20it12@vku.udn.vn';
      // newUser.student_fisrtName = 'nguyen';
      // newUser.student_lastName = 'khanh';
      // newUser.student_mobile = '10202';
      // newUser.role_id = role;

      // await this.userRepository.save(newUser);

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
        expiresIn: '15m',
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
