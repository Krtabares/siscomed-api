import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ReportsService } from './report.service';

@ApiTags('Reportes y Control de Créditos')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiOperation({ summary: 'Obtener reporte de ventas por período' })
  @ApiQuery({
    name: 'period',
    required: true,
    enum: ['day', 'week', 'month'],
    description: 'Periodo para agrupar las ventas',
  })
  @ApiResponse({ status: 200, description: 'Reporte de ventas generado exitosamente' })
  @Get('sales')
  async getSalesReport(@Query('period') period: 'day' | 'week' | 'month') {
    return this.reportsService.getSalesReport(period);
  }

  @ApiOperation({ summary: 'Obtener reporte de cuentas de crédito' })
  @ApiResponse({ status: 200, description: 'Reporte de cuentas de crédito generado exitosamente' })
  @Get('credits')
  async getCreditReport() {
    return this.reportsService.getCreditReport();
  }

  @ApiOperation({ summary: 'Obtener reporte de cuentas de crédito por representante' })
  @ApiParam({ name: 'representativeId', description: 'ID del representante', example: '60c72b2f9b1d8c001f8b4f83' })
  @ApiResponse({ status: 200, description: 'Reporte del representante generado exitosamente' })
  @Get('representative/:representativeId')
  async getRepresentativeReport(@Param('representativeId') representativeId: string) {
    return this.reportsService.getRepresentativeReport(representativeId);
  }
}
