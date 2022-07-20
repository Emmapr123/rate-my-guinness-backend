import { configService } from '../config/config.service';
import fs = require('fs');
import * as dotenv from 'dotenv';

dotenv.config();

configService.setEnv(process.env);
fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2),
);
