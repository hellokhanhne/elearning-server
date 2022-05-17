import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { google } from 'googleapis';
import { Redis } from 'ioredis';
import { LecturersEntity } from 'src/entity/Lecturers.entity';
import { StudentEntity } from 'src/entity/Student.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './types/jwtPayload.type';
import { IUser, ResLoginSuccess, Tokens } from './types/tokens';

const { OAuth2 } = google.auth;

const client = new OAuth2(process.env.CLIENT_GOOOGLE_ID);

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(StudentEntity)
    private sdtRepository: Repository<StudentEntity>,
    @InjectRepository(LecturersEntity)
    private lecRepository: Repository<LecturersEntity>,
    @InjectRedis() private client: Redis,
  ) {}
  // authentication with google
  async loginWithGoogle(idToken: string): Promise<ResLoginSuccess> {
    try {
      const payload = await client.verifyIdToken({
        idToken,
      });

      const student = await this.sdtRepository.findOne(
        {
          student_email: payload.getPayload().email,
        },
        { relations: ['role_id'] },
      );

      let lecturer: LecturersEntity;

      if (!student) {
        lecturer = await this.lecRepository.findOne(
          {
            leturer_email: payload.getPayload().email,
          },
          { relations: ['role_id'] },
        );

        if (!lecturer) {
          return null;
        }
      }

      const user = getUserInfo(student, lecturer);

      const { access_token, refresh_token } = await this.getToken({
        email: payload.getPayload().email,
        id: user.id,
        role: user.role.role_id,
      });

      await this.client.set(user.email, refresh_token, 'EX', 2592000);
      return {
        access_token,
        refresh_token,
        user: user,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async loadUser(email: string) {
    const student = await this.sdtRepository.findOne(
      {
        student_email: email,
      },
      { relations: ['role_id'] },
    );
    let lecturer: LecturersEntity;
    if (!student) {
      lecturer = await this.lecRepository.findOne(
        {
          leturer_email: email,
        },
        { relations: ['role_id'] },
      );
    }
    const user = getUserInfo(student, lecturer);
    return user;
  }

  // logout
  async logout(email: string) {
    return await this.client.del(email);
  }
  // get access token from refresh_token
  async refreshToken(payload: JwtPayload): Promise<Object> {
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get<string>('ACCESS_TOKEN'),
    });
    return { access_token };
  }
  // get accesstoken and refresh_token
  async getToken(payload: JwtPayload): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('ACCESS_TOKEN'),
        expiresIn: '1d',
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

const getUserInfo = (
  student: StudentEntity,
  lecturer: LecturersEntity,
): IUser => {
  const email = student ? student.student_email : lecturer.leturer_email;
  const id = student ? student.student_id : lecturer.leturer_id;
  const avatar = student ? student.student_avatar : lecturer.leturer_avatar;
  const firstName = student
    ? student.student_fisrtName
    : lecturer.leturer_firstName;
  const lastName = student
    ? student.student_lastName
    : lecturer.leturer_lastName;
  const phone = student ? student.student_mobile : lecturer.leturer_phone;
  const role = student ? student.role_id : lecturer.role_id;
  return {
    id,
    email,
    avatar,
    firstName,
    lastName,
    phone,
    role,
  };
};
