import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { RequestDto } from 'src/auth/dto/request.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { StudentService } from './student.service';

@ApiTags('/api/student')
@Controller('/api/student')
@UseGuards(RoleGuard())
@UseGuards(AuthGuard('at_jwt'))
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiBearerAuth('access_token')
  @Get('/me')
  async profile(@Req() req: RequestDto) {
    return await this.studentService.profile(req.user.email);
  }
}
