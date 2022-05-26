import { Module } from '@nestjs/common';
import { NewsMainService } from './news_main.service';
import { NewsMainController } from './news_main.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from 'src/entity/News';
import { NewsCategoryEntity } from 'src/entity/News_category';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionModule } from 'src/permission/permission.module';
import { RoleEntity } from 'src/entity/Role.entity';
import { PermissionEntity } from 'src/entity/Permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewsEntity,
      NewsCategoryEntity,
      RoleEntity,
      PermissionEntity,
    ]),
    AuthModule,
    PermissionModule,
  ],
  controllers: [NewsMainController],
  providers: [NewsMainService],
})
export class NewsMainModule {}
