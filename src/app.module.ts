import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PermissionEntity } from './entity/Permission.entity';
import { RoleEntity } from './entity/Role.entity';
import { StudentEntity } from './entity/Student.entity';
import { StudentModule } from './student/student.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [StudentEntity, RoleEntity, PermissionEntity],
      synchronize: true,
    }),
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: 'containers-us-west-20.railway.app',
        port: 7442,
        password: 'GtBsL9q0ffhOyY16BHwT',
        username: 'default',
      },
    }),

    StudentModule,
    PermissionModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
