import { TypeORMError } from 'typeorm';

export interface CustomTypeOrmError extends TypeORMError {
  code: string;
}
