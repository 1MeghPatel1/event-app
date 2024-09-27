import bootstrap from './migration.config';
import { MigrationExecutor } from 'typeorm';

const downMigrations = async () => {
  const dataSource = await bootstrap();
  await dataSource.initialize();
  const migrationExecutor = new MigrationExecutor(dataSource);

  try {
    const executedMigrations = await migrationExecutor.getExecutedMigrations();

    for (const migration of executedMigrations.reverse()) {
      console.log(`Running down migration: ${migration.name}`);
      await migrationExecutor.undoLastMigration();
      console.log(`Down migration completed: ${migration.name}`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    await dataSource.destroy();
  }
};

downMigrations();
