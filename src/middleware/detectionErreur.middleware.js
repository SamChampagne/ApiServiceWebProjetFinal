const file = require('fs');
const path = require('path');
const morgan = require('morgan');

const errorFile = file.createWriteStream(path.join(__dirname,'../', 'error.log'), { flags: 'a' });
const logger = morgan('combined', { stream: errorFile, skip: (req, res) => res.statusCode < 500 });
module.exports = {logger};