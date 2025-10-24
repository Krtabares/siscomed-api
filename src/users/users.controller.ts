import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    console.log(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', example: '60c72b2f9b1d8c001f8b4f83' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserDocument> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a actualizar', example: '60c72b2f9b1d8c001f8b4f83' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar', example: '60c72b2f9b1d8c001f8b4f83' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente.' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.delete(id);
  }

  @ApiOperation({ summary: 'Asignar un representante a un usuario de tipo Niño' })
  @ApiParam({ name: 'userId', description: 'ID del usuario (niño)', example: '60c72b2f9b1d8c001f8b4f83' })
  @ApiParam({ name: 'representativeId', description: 'ID del representante', example: '60c72b2f9b1d8c001f8b4f84' })
  @ApiResponse({ status: 200, description: 'Representante asignado exitosamente.' })
  @Post(':userId/representative/:representativeId')
  async assignRepresentative(
    @Param('userId') userId: string,
    @Param('representativeId') representativeId: string,
  ): Promise<UserDocument> {
    return this.usersService.assignRepresentative(userId, representativeId);    
  }

  @ApiOperation({ summary: 'Eliminar un representante de un usuario de tipo Niño' })
  @ApiParam({ name: 'userId', description: 'ID del usuario (niño)', example: '60c72b2f9b1d8c001f8b4f83' })
  @ApiResponse({ status: 200, description: 'Representante eliminado exitosamente.' })
  @Delete(':userId/representative')
  async removeRepresentative(@Param('userId') userId: string): Promise<UserDocument> {
    return this.usersService.removeRepresentative(userId);
  }
}
