import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiFileAll } from 'src/decorators/api-file.decorator';
import {
  CreatePartterRes,
  DeletePartternRes,
  ServerError,
} from 'src/utils/ResponseParttern';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { createAssignmentSchema } from './schema/assignment.schema';

@Controller('assignment')
@ApiTags('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @ApiFileAll('file')
  @ApiBody({
    schema: createAssignmentSchema,
  })
  @Post('')
  async create(
    @Body() createAssignmentDto: CreateAssignmentDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const fileName = file?.filename;

    if (fileName) {
      createAssignmentDto.attachment = file.filename;
    } else {
      createAssignmentDto.attachment = null;
    }

    const data: any = await this.assignmentService.create(createAssignmentDto);
    if (data.error) {
      return ServerError({ res, message: data.error, status: data.status });
    }

    return CreatePartterRes({ res, success: true, type: 'assignment', data });
  }

  @Get()
  async findAll() {
    return await this.assignmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.assignmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentService.update(+id, updateAssignmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.assignmentService.remove(+id);
    if (isDeleted) {
      return DeletePartternRes({
        res,
        success: true,
        type: 'assignment',
      });
    }
    return DeletePartternRes({
      res,
      success: false,
      type: 'assignment',
    });
  }
}
