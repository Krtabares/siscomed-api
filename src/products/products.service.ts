import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';
import { InventoryDocument } from './schemas/inventory.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
    @InjectModel('Inventory') private inventoryModel: Model<InventoryDocument>,
  ) {}

  // Productos

  async createProduct(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const createdProduct = new this.productModel(createProductDto);
    const product = await createdProduct.save();

    // Inicializar inventario para el producto con cantidad 0 (por defecto)
    const inventory = new this.inventoryModel({
      product: product._id,
      cantidadDisponible: 0,
    });
    await inventory.save();

    return product;
  }

  async findAllProducts(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async findProductById(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<ProductDocument> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    if (!updatedProduct) {
      throw new NotFoundException('Producto no encontrado');
    }
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<ProductDocument> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException('Producto no encontrado');
    }
    // Opcional: eliminar o actualizar el inventario asociado
    await this.inventoryModel.findOneAndDelete({ product: id }).exec();
    return deletedProduct;
  }

  // Inventario

  async updateInventory(productId: string, updateInventoryDto: UpdateInventoryDto): Promise<InventoryDocument> {
    // Verificar que el producto existe
    await this.findProductById(productId);
    const inventory = await this.inventoryModel.findOneAndUpdate(
      { product: productId },
      { cantidadDisponible: updateInventoryDto.cantidadDisponible },
      { new: true, upsert: true },
    ).exec();
    return inventory;
  }

  async getInventory(productId: string): Promise<InventoryDocument> {
    // Verificar que el producto existe
    await this.findProductById(productId);
    const inventory = await this.inventoryModel.findOne({ product: productId }).exec();
    if (!inventory) {
      throw new NotFoundException('Inventario no encontrado para el producto');
    }
    return inventory;
  }
}
