import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';
import { ValidationError } from 'class-validator';

export class UsersModule {}
@Catch()
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof MongoError && exception.code === 11000) {
      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: 'Duplicate key error',
        description: exception.message,
      });
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (
        status === HttpStatus.BAD_REQUEST &&
        exceptionResponse['message'] instanceof Array
      ) {
        const validationErrors: ValidationError[] =
          exceptionResponse['message'];

        response.status(status).json({
          statusCode: status,
          message: 'Validation failed',
          errors: validationErrors,
        });
        return;
      }

      response.status(status).json(exceptionResponse);
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
