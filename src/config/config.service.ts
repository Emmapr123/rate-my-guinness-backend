import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  constructor() {
    this.setEnv(process.env);
    this.ensureValues(['ENVIRONMENT', 'DATABASE_CONNECTION_URI']);
  }
  private env: { [k: string]: string | undefined } | undefined;

  public setEnv(env: { [k: string]: string | undefined } | undefined): void {
    this.env = env;
  }

  private getValue(key: string, default_value: any = undefined): string {
    const value = this.env[key];
    console.log('key = ', key);
    console.log('value = ', value);
    console.log('default_value = ', default_value);
    if (value != undefined) {
      return value;
    } else if (default_value != undefined) {
      return String(default_value);
    } else {
      throw new Error(`config error - missing env.${key}`);
    }
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k));
    return this;
  }

  public getPort() {
    return this.getValue('PORT');
  }

  public isProduction() {
    const mode = this.getValue('MODE', 'DEV');
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      url: this.getValue('DATABASE_CONNECTION_URI'),
      synchronize:
        this.getValue(
          'AUTO_SYNCRHONIZE_DATABASE',
          'false',
        ).toLocaleLowerCase() == 'true',

      entities: ['dist/**/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',

      migrations: ['dist/migration/*.js'],

      cli: {
        migrationsDir: 'src/migration',
      },
    };
  }
}
const configService = new ConfigService();
configService.setEnv(process.env);

export { configService };
