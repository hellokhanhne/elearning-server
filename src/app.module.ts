import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LecturersEntity } from './entity/Lecturers.entity';
import { LevelEntity } from './entity/Level.entity';
import { PermissionEntity } from './entity/Permission.entity';
import { RoleEntity } from './entity/Role.entity';
import { StudentEntity } from './entity/Student.entity';
import { SubjectEntity } from './entity/Subject.entity';
import { SubjectTypeEntity } from './entity/SubjectType.entity';
import { LecturersModule } from './lecturers/lecturers.module';
import { LevelModule } from './level/level.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { StudentModule } from './student/student.module';
import { SubjectTypeModule } from './subject/subject-type/subject-type.module';
import { SubjectModule } from './subject/subject_list/subject.module';
import { FacultyModule } from './faculty/faculty.module';
import { ClassModule } from './class/class.module';
import { ClassEntity } from './entity/Class.entity';
import { FacultyEntity } from './entity/Faculty.entity';
import { SubjectClassModule } from './subject/subject-class/subject-class.module';
import { SubjectClassEntity } from './entity/SubjectClass.entity';
import { TimetableModule } from './timetable/timetable.module';
import { TimeTableEntity } from './entity/Timetable.entity';
import { MarkTypeModule } from './mark/mark-type/mark-type.module';
import { MarkWeightModule } from './mark/mark-weight/mark-weight.module';
import { MarkDetailsModule } from './mark/mark-details/mark-details.module';
import { MarkTypeEntity } from './entity/Mark_type.entity';
import { MarkDetailsEntity } from './entity/Mark_Details.entity';
import { MarkWeightEntity } from './entity/Mark_weight.entity';

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
      entities: [
        StudentEntity,
        RoleEntity,
        PermissionEntity,
        LecturersEntity,
        LevelEntity,
        SubjectEntity,
        SubjectTypeEntity,
        ClassEntity,
        FacultyEntity,
        SubjectClassEntity,
        TimeTableEntity,
        MarkTypeEntity,
        MarkDetailsEntity,
        MarkWeightEntity,
      ],
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
    LecturersModule,
    LevelModule,
    SubjectTypeModule,
    SubjectModule,
    FacultyModule,
    ClassModule,
    SubjectClassModule,
    TimetableModule,
    MarkTypeModule,
    MarkWeightModule,
    MarkDetailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
