import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ClassModule } from './class/class.module';
import { AttendanceEntity } from './entity/Attendance';
import { ClassEntity } from './entity/Class.entity';
import { FacultyEntity } from './entity/Faculty.entity';
import { LecturersEntity } from './entity/Lecturers.entity';
import { LevelEntity } from './entity/Level.entity';
import { MarkDetailsEntity } from './entity/Mark_details.entity';
import { MarkTypeEntity } from './entity/Mark_type.entity';
import { MarkWeightEntity } from './entity/Mark_weight.entity';
import { NewsEntity } from './entity/News';
import { NewsCategoryEntity } from './entity/News_category';
import { PermissionEntity } from './entity/Permission.entity';
import { RoleEntity } from './entity/Role.entity';
import { StudentEntity } from './entity/Student.entity';
import { SubjectEntity } from './entity/Subject.entity';
import { SubjectClassEntity } from './entity/SubjectClass.entity';
import { SubjectTypeEntity } from './entity/SubjectType.entity';
import { TimeTableEntity } from './entity/Timetable.entity';
import { FacultyModule } from './faculty/faculty.module';
import { LecturersModule } from './lecturers/lecturers.module';
import { LevelModule } from './level/level.module';
import { MarkDetailsModule } from './mark/mark-details/mark-details.module';
import { MarkTypeModule } from './mark/mark-type/mark-type.module';
import { MarkWeightModule } from './mark/mark-weight/mark-weight.module';
import { NewsCategoryModule } from './news/news_category/news_category.module';
import { NewsMainModule } from './news/news_main/news_main.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { StudentModule } from './student/student.module';
import { SubjectClassModule } from './subject/subject-class/subject-class.module';
import { SubjectTypeModule } from './subject/subject-type/subject-type.module';
import { SubjectModule } from './subject/subject_list/subject.module';
import { TimetableModule } from './timetable/timetable.module';
import { AttendanceModule } from './attendance/attendance.module';
import { UploadModule } from './upload/upload.module';
import { ChatModule } from './chat/chat.module';
import { AssignmentModule } from './assignment/assignment.module';
import { AssignmentEntity } from './entity/Assignment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
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
        NewsEntity,
        NewsCategoryEntity,
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
        AttendanceEntity,
        AssignmentEntity,
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

    NewsCategoryModule,
    NewsMainModule,
    AttendanceModule, //
    UploadModule,
    ChatModule,
    // AssignmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
