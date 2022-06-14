import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  Res,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RequestDto } from 'src/auth/dto/request.dto';
import { AccessTokenGuard } from 'src/auth/guards/at-auth.guard';
import { ApiFileAll } from 'src/decorators/api-file.decorator';
import { CreatePartterRes, ServerError } from 'src/utils/ResponseParttern';
import { DeadlineDoneService } from './deadline_done.service';
import { CreateDeadlineDoneDto } from './dto/create-deadline_done.dto';
import { createDeadlineDoneSchema } from './schema/dealine_done.schema';

@ApiTags('/api/deadline-done')
@Controller('/api/deadline-done')
export class DeadlineDoneController {
  constructor(private readonly deadlineDoneService: DeadlineDoneService) {}

  @ApiBody({
    schema: createDeadlineDoneSchema,
  })
  @ApiFileAll('file')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Patch()
  async create(
    @Body() createDeadlineDoneDto: CreateDeadlineDoneDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Req() req: RequestDto,
  ) {
    console.log('req', req);
    console.log(createDeadlineDoneDto, file);
    const filename = file?.filename;
    createDeadlineDoneDto.attachment = filename;
    const data: any = await this.deadlineDoneService.create(
      createDeadlineDoneDto,
      req.user.id,
    );
    if (data.error) {
      return ServerError({ res, message: data.error, status: data.status });
    }

    return CreatePartterRes({ res, success: true, type: 'dealine_done', data });
  }

  @Get()
  async findAll() {
    return await this.deadlineDoneService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.deadlineDoneService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDeadlineDoneDto: UpdateDeadlineDoneDto,
  // ) {
  //   return this.deadlineDoneService.update(+id, updateDeadlineDoneDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.deadlineDoneService.remove(+id);
  // }
}
