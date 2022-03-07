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
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRolePermission } from './dto/update-role-permission.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

@ApiTags('/api/role')
@Controller('/api/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @ApiBody({
    description: 'Create new role',
    schema: {
      example: {
        role_title: 'name_of_role',
        role_desc: 'desc_of_role',
      },
    },
  })
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.roleService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.roleService.update(+id, updateRoleDto);
  }

  @Patch(':id')
  async updateRolePermission(
    @Param('id') id: string,
    @Body() updateRolePermission: UpdateRolePermission,
  ) {
    return await this.roleService.updateRolePermission(
      id,
      updateRolePermission,
    );
  }

  @ApiOkResponse()
  @ApiNotImplementedResponse({ status: HttpStatus.NOT_IMPLEMENTED })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.roleService.remove(+id);
    if (isDeleted) {
      return res
        .status(HttpStatus.OK)
        .json(new ResponseEntity(true, 'Delete successfully !'));
    } else {
      return res
        .status(HttpStatus.NOT_IMPLEMENTED)
        .json(new ResponseEntity(false, 'Delete failed !'));
    }
  }
}
