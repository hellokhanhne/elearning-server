import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RequestDto } from 'src/auth/dto/request.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ResponseEntity } from 'src/utils/ResponseEntity';
import { StudentService } from './student.service';

@ApiTags('/api/student')
@Controller('/api/student')
@UseGuards(RoleGuard())
@UseGuards(AuthGuard('at_jwt'))
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiBearerAuth()
  @Get('/me')
  async profile(@Req() req: RequestDto, @Res() res: Response) {
    const student = await this.studentService.profile(req.user.email);
    if (!student) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ResponseEntity(false, 'No student found !'));
    }
    return res.status(HttpStatus.OK).json(
      new ResponseEntity(true, 'Get profile successfully', {
        data: { student },
      }),
    );
  }
}
