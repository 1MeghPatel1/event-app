import bootstrap from './migration.config';
import { MigrationExecutor } from 'typeorm';
const upMigrations = async () => {
  const dataSource = await bootstrap();
  await dataSource.initialize();

  const migrationExecutor = new MigrationExecutor(dataSource);

  try {
    console.log('Starting execution of pending migrations...');
    await migrationExecutor.executePendingMigrations();
    console.log('All pending migrations executed successfully.');
  } catch (error) {
    console.log('Error executing migrations:', error);
  } finally {
    await dataSource.destroy();
  }
};

upMigrations();
