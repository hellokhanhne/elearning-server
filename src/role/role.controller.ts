import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNotImplementedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseEntity } from 'src/utils/ResponseEntity';
import { DeletePartternRes, ServerError } from 'src/utils/ResponseParttern';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRolePermission } from './dto/update-role-permission.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

@ApiTags('/api/role')
@Controller('/api/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto, @Res() res: Response) {
    try {
      const role = await this.roleService.create(createRoleDto);
      return res
        .status(HttpStatus.OK)
        .json(new ResponseEntity(true, 'Create role successfully !', role));
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const roles = await this.roleService.findAll();
    return res
      .status(HttpStatus.OK)
      .json(new ResponseEntity(true, 'Get role successfully', roles));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const role = await this.roleService.findOne(+id);
    return res
      .status(HttpStatus.OK)
      .json(new ResponseEntity(true, 'Get role successfully', role));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @Res() res: Response,
  ) {
    try {
      const role = await this.roleService.update(+id, updateRoleDto);
      return res
        .status(HttpStatus.OK)
        .json(new ResponseEntity(true, 'Update role successfully !', role));
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Patch(':id')
  async updateRolePermission(
    @Param('id') id: string,
    @Body() updateRolePermission: UpdateRolePermission,
    @Res() res: Response,
  ) {
    try {
      const permission = await this.roleService.updateRolePermission(
        id,
        updateRolePermission,
      );
      return res
        .status(HttpStatus.OK)
        .json(
          new ResponseEntity(
            true,
            "Update role's permission successfully !",
            permission,
          ),
        );
    } catch (error) {
      return ServerError({ res });
    }
  }

  @ApiOkResponse()
  @ApiNotImplementedResponse({ status: HttpStatus.NOT_IMPLEMENTED })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.roleService.remove(+id);
    if (isDeleted) {
      return DeletePartternRes({ res, success: true, type: 'role' });
    } else {
      return DeletePartternRes({ res, success: false, type: 'role' });
    }
  }
}
