import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Iniciar sesión y obtener un token JWT' })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso, devuelve el token JWT.',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'jwt-token-example',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales incorrectas.',
  })
  @ApiBody({
    description: 'Credenciales de inicio de sesión',
    type: Object, // Se cambió `properties` por `type`
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          example: 'juan@example.com',
        },
        password: {
          type: 'string',
          example: 'secreta123',
        },
      },
    },
  })
  @Post('login')
  async login(@Body() req: { email: string; password: string }) {
    return this.authService.validateUser(req.email, req.password).then(user => {
      return this.authService.login(user);
    });
  }
}
