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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'elearning',
      entities: [StudentEntity, RoleEntity, PermissionEntity],
      synchronize: true,
    }),
    StudentModule,
    PermissionModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
