ALTER TABLE trades
    DROP COLUMN IF EXISTS user_id;

DROP TYPE IF EXISTS users;