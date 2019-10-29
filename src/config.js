module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin@localhost/thingstotrade',
    JWT_SECRET: process.env.JWT_SECRET || 'trade_token',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '1h',
}