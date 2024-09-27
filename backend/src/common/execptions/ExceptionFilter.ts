import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorCode } from 'src/common/constants/errorCodes';
import { TypeORMError } from 'typeorm';
import { CustomTypeOrmError } from '../constants/types';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    console.log(exception);

    const ctx = host.switchToHttp();

    let httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
    } else if (exception instanceof TypeORMError) {
      const { code } = exception as CustomTypeOrmError;
      switch (code) {
        case ErrorCode.DUPLICATE_KEY:
          httpStatus = HttpStatus.CONFLICT;
          break;
      }
    }

    let errorMessage = 'Something went wrong!';
    if (exception instanceof HttpException) {
      errorMessage = exception.message;
    } else if (exception instanceof TypeORMError) {
      const { code } = exception as CustomTypeOrmError;
      switch (code) {
        case ErrorCode.DUPLICATE_KEY:
          errorMessage = 'Record already exists';
          break;
        default:
          errorMessage = exception.message;
          break;
      }
    }

    const responseBody = {
      statusCode: httpStatus,
      success: false,
      message: errorMessage,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
