const rateLimit = require('express-rate-limit');

const rateLimitHandler = (req, res, next, options) => {
    res.setHeader('X-RateLimit-Limit', options.max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, options.max - (req.rateLimit.current + 1)));
    res.setHeader('Retry-After', options.windowMs / 1000);
    res.status(options.statusCode).json({
        error: 'Too many requests',
        message: options.message
    });
};

const fiveSecondLimiter = rateLimit({
    windowMs: 5 * 1000,
    max: 1,
    standardHeaders: true,
    message: 'Too many requests from this IP, please try again after 5 seconds',
    statusCode: 429,
    handler: rateLimitHandler
});

const minuteLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    message: 'Too many requests from this IP, please try again after a minute',
    statusCode: 429,
    handler: rateLimitHandler
});

const hourLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 40,
    standardHeaders: true,
    message: 'Too many requests from this IP, please try again after an hour',
    statusCode: 429,
    handler: rateLimitHandler
});

const dayLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, 
    max: 100,
    standardHeaders: true,
    message: 'Too many requests from this IP, please try again after 24 hours',
    statusCode: 429,
    handler: rateLimitHandler
});


module.exports = {
    fiveSecondLimiter,
    minuteLimiter,
    hourLimiter,
    dayLimiter
}