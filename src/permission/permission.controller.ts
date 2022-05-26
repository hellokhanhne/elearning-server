import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request as ExpressReq, Response, Router } from 'express';
import { ResponseEntity } from 'src/utils/ResponseEntity';
import { DeletePartternRes, ServerError } from 'src/utils/ResponseParttern';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionService } from './permission.service';

@ApiTags('/api/permission')
@Controller('/api/permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
    @Res() res: Response,
  ) {
    try {
      const permission = await this.permissionService.create(
        createPermissionDto,
      );
      return res
        .status(HttpStatus.OK)
        .json(
          new ResponseEntity(
            true,
            'Create permission successfully !',
            permission,
          ),
        );
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Get()
  async findAll(@Request() req: ExpressReq, @Res() res: Response) {
    const permissions = await this.permissionService.findAll();
    return res
      .status(HttpStatus.OK)
      .json(
        new ResponseEntity(true, 'Get permissions successfully !', permissions),
      );
  }

  async findByArray(permissionsArr: number[]) {
    return await this.permissionService.findByArray(permissionsArr);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const permission = await this.permissionService.findOne(+id);
    return res
      .status(HttpStatus.OK)
      .json(
        new ResponseEntity(true, 'Get permission successfully !', permission),
      );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @Res() res: Response,
  ) {
    try {
      const permission = await this.permissionService.update(
        +id,
        updatePermissionDto,
      );
      return res
        .status(HttpStatus.OK)
        .json(
          new ResponseEntity(
            true,
            'Update permission successfully !',
            permission,
          ),
        );
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.permissionService.remove(+id);
    if (isDeleted) {
      return DeletePartternRes({ res, success: true, type: 'permission' });
    }
    return DeletePartternRes({ res, success: false, type: 'permission' });
  }
}
