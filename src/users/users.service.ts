import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  // Crear usuario
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    console.log('createUserDto',createUserDto);
    const createdUser = new this.userModel(createUserDto);  // Instancia el modelo aquí
    return createdUser.save();  // Luego puedes llamar a save() en la instancia
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Método auxiliar para encontrar un usuario por su ID
  async findById(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId).exec();  // Asegurarse de llamar 'exec' para devolver un documento Mongoose
  }

  // Buscar usuario por email (para autenticación)
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

    // Actualizar un usuario
    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
        if (!updatedUser) throw new NotFoundException('Usuario no encontrado');
        return updatedUser;
      }

    // Eliminar un usuario
    async delete(id: string): Promise<UserDocument> {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedUser) throw new NotFoundException('Usuario no encontrado');
        return deletedUser;
    }

  // Asignar un representante
  async assignRepresentative(userId: string, representativeId: string): Promise<UserDocument > {
    const user = await this.findById(userId);
    if (user && user.tipoUsuario !== 'Niño') {
      throw new Error('Solo los niños pueden tener un representante');
    }

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    user.representante = representativeId;
    return user.save();  // Aquí ahora 'save()' debería funcionar correctamente
  }

  // Eliminar un representante
  async removeRepresentative(userId: string): Promise<UserDocument> {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    user.representante = null;
    return user.save();
  }
}
