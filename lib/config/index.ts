import path from 'path';
import nconf from 'nconf';
const env = process.env.NODE_ENV || 'development'

//  1. `process.argv`
//  2. `process.env`
nconf.argv().env()

// 3. Pick up the base configuration
nconf.file(path.join(__dirname, './base_config.json'));

// 4. Override arguments based on environment
nconf.file(path.join(__dirname, `./${env}_env_config.json`));

export default nconf
