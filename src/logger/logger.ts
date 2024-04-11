// custom-typeorm-logger.ts

import { Logger } from '@nestjs/common';
import { Connection } from 'typeorm';

export class CustomTypeOrmLogger extends Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: import("typeorm").QueryRunner) {
    super.log(`Executing query: ${query}`);
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: import("typeorm").QueryRunner) {
    super.error(`Error executing query: ${error}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: import("typeorm").QueryRunner) {
    super.warn(`Query is slow: ${query}`);
  }

  logSchemaBuild(message: string, queryRunner?: import("typeorm").QueryRunner) {
    super.debug(message);
  }

  logMigration(message: string, queryRunner?: import("typeorm").QueryRunner) {
    super.log(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: import("typeorm").QueryRunner) {
    super.log(message);
  }

  logMigrationError(error: string, queryRunner?: import("typeorm").QueryRunner) {
    super.error(`Error executing migration: ${error}`);
  }

  logMigrationUndo(message: string, queryRunner?: import("typeorm").QueryRunner) {
    super.log(`Undoing migration: ${message}`);
  }

  logMigrationUndoError(error: string, queryRunner?: import("typeorm").QueryRunner) {
    super.error(`Error undoing migration: ${error}`);
  }

  logTransactionStart(queryRunner?: import("typeorm").QueryRunner) {
    super.log('Transaction started');
  }

  logTransactionCommit(queryRunner?: import("typeorm").QueryRunner) {
    super.log('Transaction committed');
  }

  logTransactionRollback(queryRunner?: import("typeorm").QueryRunner) {
    super.warn('Transaction rolled back');
  }

  logSchemaSync(queryRunner?: import("typeorm").QueryRunner) {
    super.log('Database schema synchronized');
  }

  logMigrationRun(queryRunner?: import("typeorm").QueryRunner) {
    super.log('Migrations executed');
  }

  logSchemaSyncError(error: string, queryRunner?: import("typeorm").QueryRunner) {
    super.error(`Error synchronizing schema: ${error}`);
  }
}

