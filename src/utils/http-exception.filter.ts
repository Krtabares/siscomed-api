import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
  ConflictException,
  NotAcceptableException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // const response = host.switchToHttp().getResponse();
    // let status: number;
    // let message: any;

    // // Verificamos el tipo de la excepción y ajustamos el manejo
    // if (exception instanceof HttpException) {
    //   status = exception.getStatus();
    //   message = exception.getResponse();
    // } else if (exception instanceof BadRequestException) {
    //   status = HttpStatus.BAD_REQUEST;
    //   message = { message: 'Bad Request - La solicitud no es válida' };
    // } else if (exception instanceof NotFoundException) {
    //   status = HttpStatus.NOT_FOUND;
    //   message = { message: 'Not Found - Recurso no encontrado' };
    // } else if (exception instanceof UnauthorizedException) {
    //   status = HttpStatus.UNAUTHORIZED;
    //   message = { message: 'Unauthorized - No autorizado' };
    // } else if (exception instanceof ForbiddenException) {
    //   status = HttpStatus.FORBIDDEN;
    //   message = { message: 'Forbidden - Acceso prohibido' };
    // } else if (exception instanceof InternalServerErrorException) {
    //   status = HttpStatus.INTERNAL_SERVER_ERROR;
    //   message = {
    //     message: 'Internal Server Error - Error interno del servidor',
    //   };
    // } else if (exception instanceof ConflictException) {
    //   status = HttpStatus.CONFLICT;
    //   message = { message: 'Conflict - Conflicto con el recurso' };
    // } else if (exception instanceof NotAcceptableException) {
    //   status = HttpStatus.NOT_ACCEPTABLE;
    //   message = {
    //     message: 'Not Acceptable - El tipo de contenido no es aceptable',
    //   };
    // } else {
    //   // Si no es ninguno de los anteriores, lo tratamos como un error interno
    //   status = HttpStatus.INTERNAL_SERVER_ERROR;
    //   message = { message: 'Internal Server Error' };
    // }

    // // Mostrar el error en consola para su depuración
    // console.error('Error al manejar la excepción:123', typeof exception);

    // Enviar la respuesta con el código de estado y el mensaje correspondiente
    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.name || 'HttpException',
    });
  }
}
