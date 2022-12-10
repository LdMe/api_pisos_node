import { Console } from 'console';

import fs, { fdatasync } from 'fs';

const logger = new Console({
    'stdout': fs.createWriteStream('./logs.txt'),
    'stderr': fs.createWriteStream('./errors.txt')
    });


export default logger;