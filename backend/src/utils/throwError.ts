import { Logger } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

export const throwError = (error: Error | TypeORMError, message?: string) => {
  Logger.error(error);
  error.message = message || error.message;
  throw error;
};
