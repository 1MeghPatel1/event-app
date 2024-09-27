import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MigrationModule } from './migration.module';
import { DataSource } from 'typeorm';
import { join } from 'path';

async function bootstrap() {
  const appContext =
    await NestFactory.createApplicationContext(MigrationModule);
  const configService = appContext.get(ConfigService);

  const dataSource = new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: +configService.get<number>('DB_PORT', 5432),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    synchronize: configService.get<boolean>('DB_SYNCHRONIZE', true),
    migrations: [
      join(__dirname, '..', 'migrations', 'migration-files', '*.{ts,js}'),
    ],
  });

  await appContext.close();

  return dataSource;
}

export default bootstrap;
