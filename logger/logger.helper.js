const bunyan = require('bunyan');
const url = require('url');

const streams = [];
if (process.env.NODE_ENV !== 'production') {
    streams.push({

        level: 'info',
        stream: process.stdout,
    });
} else {
    streams.push({

        level: 'error',
        path: `${__dirname}/../logs/error.log`,
        type: 'rotating-file',
        period: `${1000 * 60 * 60 * 10}ms`,
        count: 3,
    });
    streams.push({
        level: 'info',
        path: `${__dirname}/../logs/combined.log`,
        type: 'rotating-file',
        period: `${1000 * 60 * 60 * 10}ms`,
        count: 3,
    });
}

const logger = bunyan.createLogger({
    name: 'mareDelDios',
    streams,
});

logger.log = logger.info;
module.exports = logger;
