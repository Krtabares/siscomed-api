import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ProductDocument } from './schemas/product.schema';
import { InventoryDocument } from './schemas/inventory.schema';

@ApiTags('Productos e Inventario')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Productos

  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente.' })
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductDocument> {
    return this.productService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos.' })
  @Get()
  async findAllProducts(): Promise<ProductDocument[]> {
    return this.productService.findAllProducts();
  }

  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto', example: '60c72b2f9b1d8c001f8b4f83' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @Get(':id')
  async findProductById(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.findProductById(id);
  }

  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiParam({ name: 'id', description: 'ID del producto a actualizar', example: '60c72b2f9b1d8c001f8b4f83' })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente.' })
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductDocument> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiParam({ name: 'id', description: 'ID del producto a eliminar', example: '60c72b2f9b1d8c001f8b4f83' })
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente.' })
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.deleteProduct(id);
  }

  // Inventario

  @ApiOperation({ summary: 'Actualizar el inventario de un producto' })
  @ApiParam({ name: 'productId', description: 'ID del producto', example: '60c72b2f9b1d8c001f8b4f83' })
  @ApiResponse({ status: 200, description: 'Inventario actualizado correctamente.' })
  @Put(':productId/inventory')
  async updateInventory(
    @Param('productId') productId: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ): Promise<InventoryDocument> {
    return this.productService.updateInventory(productId, updateInventoryDto);
  }

  @ApiOperation({ summary: 'Obtener el inventario de un producto' })
  @ApiParam({ name: 'productId', description: 'ID del producto', example: '60c72b2f9b1d8c001f8b4f83' })
  @ApiResponse({ status: 200, description: 'Inventario obtenido correctamente.' })
  @Get(':productId/inventory')
  async getInventory(@Param('productId') productId: string): Promise<InventoryDocument> {
    return this.productService.getInventory(productId);
  }
}
